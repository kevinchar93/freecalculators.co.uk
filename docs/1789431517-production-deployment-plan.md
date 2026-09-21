# Deployment Plan: Staging & Production on DigitalOcean App Platform

Trello: [#58 — Create a doc with a plan on how to deploy into production for testing](https://trello.com/c/ukDQWHt7)

## Summary

We are going to get this app running in a production-like environment on DigitalOcean (DO) App Platform, in two copies: **staging** and **production**. Staging exists so we can test real deploys before they go live, and it should be as close to production as possible — the *only* deliberate difference is that staging is locked down so only the site owner can view it, while production is open to the public.

Four things need to be worked out to get there, and each is its own section below:

1. **Laravel settings** — this app's spec is a "database-free architecture" (see `docs/spec.md`), but the default Laravel install still wires session/cache/queue through a database by default. We need to point those at drivers that don't require a real database service, so we're not paying for or maintaining infrastructure the app doesn't use.
2. **Running in "production mode" locally** — so we can catch production-only bugs (asset build issues, cached config drift, `APP_DEBUG=false` error pages) on a laptop before they show up on a real deploy, without needing to push and wait every time.
3. **Restricting access to staging** — with basic auth or a client certificate, so staging can be a real preview environment without being indexed or stumbled into by the public.
4. **Domain configuration** — pointing `freecalculators.co.uk` at production and a subdomain at staging, building on the DNS delegation to DigitalOcean that's already in place at Namecheap.

The theme running through all four: **prefer configuration over infrastructure**. Every decision below is chosen to avoid standing up a database, a queue worker, or a reverse proxy that this app doesn't otherwise need — because every extra moving part is something that can fail, cost money, or need patching.

---

## 1. Laravel settings: disabling the database and queue

### Why

Laravel ships with three subsystems that default to needing a real, persistent backing store:

| Subsystem | `.env` key | Default driver | Needs a DB? |
|---|---|---|---|
| Sessions | `SESSION_DRIVER` | `database` | Yes |
| Cache | `CACHE_STORE` | `database` | Yes |
| Queue | `QUEUE_CONNECTION` | `database` | Yes |

That default exists because most Laravel apps *do* have a database. This one doesn't need one: per `docs/spec.md`, the calculators read from JSON manifests and Markdown files, not a database. Checking the app confirms this — there's exactly one Eloquent model (`App\Models\User`), no jobs, no `Queue::` calls anywhere in `app/`, and no auth routes registered in `routes/web.php` (Laravel Fortify is installed but unused). The `users`/`cache`/`jobs` tables that ship in `database/migrations/` are Laravel's default scaffolding, not something this app relies on.

You can't literally tell Laravel "there is no database" — `config/database.php` always needs a `default` connection configured, and some framework internals (like `DB::prohibitDestructiveCommands()` in `AppServiceProvider`) assume one exists. So "disable the database" in practice means: **stop anything from actually touching it at request time**, by moving session, cache, and queue off the `database` driver, and leaving the DB connection itself as the cheapest possible no-op (SQLite) so nothing errors if something touches it unexpectedly.

### What to change

In the staging and production `.env` (set as App Platform environment variables, not committed):

```
DB_CONNECTION=sqlite
# no DB_HOST / DB_DATABASE / credentials needed — SQLite is a local file, not a service

SESSION_DRIVER=cookie   # session data lives in the encrypted cookie itself
CACHE_STORE=file        # cached values go to local disk instead of a table

QUEUE_CONNECTION=sync   # queued jobs (there are none today) run inline instead of being dispatched
```

Notes on each:

- **`SESSION_DRIVER=cookie`**: fine for this app because sessions only need to survive one request-response cycle at most (there's no login flow exposed, no per-user state to persist). If a stateful feature ever needs server-side sessions, switch to `file` rather than `database` — still no DB required.
- **`CACHE_STORE=file`**: App Platform's filesystem is ephemeral per-instance/per-deploy, which is fine for a cache (worst case, a cold cache after a restart — not data loss).
- **`QUEUE_CONNECTION=sync`**: since there are no queued jobs today, `sync` (run immediately, in-request) is equivalent to not having a queue at all, without needing a `database` or `redis` backend or a separate worker process.
- **`DB_CONNECTION=sqlite`**: this is the "mark it as not used" state — SQLite is just a file, no separate database service to provision, back up, or pay for. Run `php artisan migrate --force` once at build/deploy time so the file and its (unused) tables exist and nothing errors if a framework internal expects the connection to be queryable.

### How to apply

- Update `.env.example` to reflect these as the recommended defaults (local dev can keep `sqlite`/`database` drivers if that's more convenient day-to-day — this only strictly matters for staging/production).
- Set the three keys above as environment variables on both the staging and production DO App Platform components.
- Confirm after deploy: `php artisan about` (via `doctl apps console` or a one-off command) shows `Session Driver: cookie`, `Cache Driver: file`, `Queue Driver: sync`.

---

## 2. Running the app in "production mode" locally

### Why

Several production behaviours only show up when `APP_ENV=production` and `APP_DEBUG=false`, and when assets are built rather than served by Vite's dev server:

- Error pages become generic (no stack traces) — you want to see what a real visitor sees on a 500, and confirm nothing leaks debug info.
- Vite serves a compiled, hashed, minified bundle from `public/build` instead of hot-reloading from source — this is a common place for production-only bugs to hide (missing assets, wrong base paths).
- Laravel's config/route/view caches (`artisan config:cache` etc.) freeze `.env` values into a compiled file — if code reads `env()` directly outside of `config/*.php` (a common Laravel footgun), it'll silently stop picking up changes once cached, and you want to catch that locally, not on a live deploy.

Testing this on a laptop first means a production-mode bug is a five-minute local loop, not a "push, wait for the build, check the deployed site, revert, repeat" loop.

### How

From the project root, with a **separate `.env`** (don't overwrite your dev `.env` — copy it, e.g. to `.env.production.local`, and point `artisan`/`vite` at it per-command, or just temporarily swap `.env`):

```bash
# 1. Set production-like flags
APP_ENV=production
APP_DEBUG=false
# plus the SESSION_DRIVER / CACHE_STORE / QUEUE_CONNECTION values from section 1

# 2. Install dependencies the way a production build would (no dev tooling, optimized autoloader)
composer install --no-dev --optimize-autoloader

# 3. Build the frontend for production (this is what `npm run dev` skips — it serves from source instead)
npm run build

# 4. Bake config/routes/views/events into cached files, the way `php artisan optimize` does on deploy
php artisan optimize
# (equivalent to running config:cache, route:cache, view:cache, event:cache individually)

# 5. Serve it
php artisan serve
```

Visit the app at `http://127.0.0.1:8000` and click through the calculators as if you were a first-time visitor.

**Before going back to normal development**, undo the caching or `artisan` will keep serving stale config/routes from step 4:

```bash
php artisan optimize:clear
composer install   # restore dev dependencies
```

Steps 2–4 are wrapped in `composer run prod-check`, and the undo step is `composer run prod-check:clean`.

---

## 3. Restricting access to staging (basic auth or a client cert)

### Why

Staging needs to be reachable over the open internet (so it can be checked from anywhere, including a phone), but it shouldn't be publicly discoverable or indexable — it's a preview environment, not a second public site. Two standard ways to gate an entire site: **HTTP Basic Auth** (a username/password prompt at the browser level) or a **client TLS certificate** (the browser presents a cert issued only to you; no password to leak or forget).

DigitalOcean App Platform doesn't have a built-in "password-protect this app" toggle for dynamic (non-static) apps — that feature only exists for their Static Sites product, which doesn't apply here since this is a Laravel app. So the gate has to live in the application itself, as Laravel middleware, which also has the advantage of being portable — it'll keep working even if the hosting provider changes later.

Between the two options, **Basic Auth is the pragmatic choice to start with**: a client certificate is more secure (nothing to phish, no password) but requires generating and installing a certificate on every device you'll use to check staging (laptop, phone, etc.), which is more setup for a single-user use case. Basic Auth needs nothing installed — just remembering a username/password, ideally saved in a password manager.

### How

Implemented as `App\Http\Middleware\RequireBasicAuthForStaging`, a middleware that only runs when a flag is set (so it's inert in production and local dev), registered in `bootstrap/app.php`'s `web` middleware group alongside `HandleAppearance` etc.

The password is never stored as plaintext — only its hash is. `php artisan staging:hash-password` prompts for a password (input hidden, nothing echoed or logged) and prints its bcrypt hash, which is what gets pasted into the env var below; the plaintext itself only ever needs to live in a password manager. The middleware checks the submitted password with `Hash::check()` against that stored hash, and compares the username with `hash_equals()`.

Driven entirely from environment variables:

```
STAGING_BASIC_AUTH_ENABLED=true
STAGING_BASIC_AUTH_USER=<choose one>
STAGING_BASIC_AUTH_PASSWORD_HASH=<output of `php artisan staging:hash-password`>
```

Corresponding `config('app.staging_basic_auth_*')` entries live in `config/app.php`, pulling from those env vars. Set `STAGING_BASIC_AUTH_ENABLED=true` only on the staging component in DO App Platform; leave it unset (defaults to `false`) on production and in local `.env`/`.env.example`, so the gate can never accidentally end up live for real visitors.

The same middleware also sets `X-Robots-Tag: noindex` on every response it touches (both the 401 challenge and the pass-through once authenticated), so staging can never end up in search results even if a link leaks — no second middleware needed.

If a client certificate is wanted later (e.g. if Basic Auth's shared-password model stops being enough — say, once more than one person needs staging access and per-person revocation matters), that would be configured at the DO App Platform / load-balancer level via mutual TLS, which is a separate piece of research — not needed for the "just me" case this starts with.

---

## 4. Domain configuration

### Why

The domain is already partly set up: `freecalculators.co.uk` is registered with Namecheap, and its nameservers already point at DigitalOcean (`ns1.digitalocean.com` etc.), which means DNS for this domain is *delegated* to DO — DO is authoritative for it, but the actual DNS records (A/CNAME entries) still need to be created there. Namecheap's job is now done; everything else happens in the DO control panel.

We want two hostnames pointing at two different App Platform apps (or two components of the same app — see note below):

- `freecalculators.co.uk` (+ `www.freecalculators.co.uk`) → production
- `staging.freecalculators.co.uk` → staging

Using a subdomain for staging (rather than a separate registered domain) is the standard approach — it's free, keeps everything under DO's management of the one domain, and makes it obvious at a glance which environment you're looking at.

### How

1. **Add the domain to DO's DNS**: in the DO control panel, go to **Networking → Domains**, add `freecalculators.co.uk`. Because the nameservers already point at DO, this makes DO the live DNS host for the domain (no further Namecheap changes needed).
2. **Attach production**: in the production App Platform app, go to **Settings → Domains**, add `freecalculators.co.uk` and `www.freecalculators.co.uk`. App Platform automatically creates the needed DNS records in the zone from step 1 and provisions a free Let's Encrypt TLS certificate.
3. **Attach staging**: in the staging App Platform app, go to **Settings → Domains**, add `staging.freecalculators.co.uk`. Same automatic DNS + TLS provisioning, scoped to that subdomain.
4. **Verify**: after DNS propagates (usually minutes, since DO is authoritative and doesn't need to wait on registrar-level changes), confirm both hostnames resolve and serve valid HTTPS, and that staging prompts for Basic Auth (section 3) while production does not.

Open question to settle when actually provisioning: whether staging runs as a fully separate App Platform **app** (simplest to reason about, fully isolated env vars and deploys) or as a second **component** within the same app (marginally cheaper, shares some settings). Given how few settings actually differ (section 1's values are shared; only the Basic Auth flag and the domain differ), a separate app is recommended for clarity — it means staging can never accidentally inherit a production-only setting, and it can be torn down independently if it's ever not needed.

---

## Open items / things to confirm once we start provisioning

- Confirm DO App Platform's PHP buildpack picks up `npm run build` automatically, or whether a custom build command needs to be set explicitly in the app spec.
- Confirm whether `php artisan migrate --force` should run automatically on every deploy (DO supports pre-deploy "run commands") — needed once, technically re-runnable safely since migrations are idempotent, but worth deciding deliberately rather than leaving to default behaviour.
- Decide where `STAGING_BASIC_AUTH_PASS` and any other secrets get stored long-term (DO App Platform's encrypted env vars are fine for this; just don't let them leak into `.env.example` or git history).
