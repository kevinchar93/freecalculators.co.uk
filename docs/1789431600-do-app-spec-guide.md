# Guide: Configuring DO App Platform as code (App Spec)

Trello: [#58](https://trello.com/c/ukDQWHt7) · companion to [production-deployment-plan.md](1789431517-production-deployment-plan.md)

## Why use a spec file instead of the console UI

Everything shown in the App Platform console (build strategy, run command, network, env vars, domains) is just a rendering of one underlying document: the **App Spec**, a YAML file describing the whole app. Clicking through the UI edits that document one field at a time; writing the YAML directly lets you:

- see the entire configuration in one file, reviewable in a PR like any other code change
- keep staging and production in sync on purpose (diff the two files instead of remembering which console toggles you set on which app)
- recreate the app from scratch if it's ever deleted, without reconstructing settings from memory

This repo now has two spec files, one per environment:

- [`.do/app-platform-template-production.yaml`](../.do/app-platform-template-production.yaml)
- [`.do/app-platform-template-staging.yaml`](../.do/app-platform-template-staging.yaml)

They're deliberately two separate files (and become two separate App Platform **apps**) rather than one shared spec — App Platform doesn't have a built-in "environment" concept, so the standard pattern for staging + production is two independent apps, each with its own spec. Diff the two files to see exactly what differs: `APP_URL`, the domain, and the `STAGING_BASIC_AUTH_*` vars. Everything else — the Dockerfile build, `LOG_LEVEL` — is identical on purpose.

## What's in each file

Both specs declare, per the decisions in `production-deployment-plan.md`:

- **`services`**: one web service, sourced from `github: kevinchar93/freecalculators.co.uk` on `main`, with `deploy_on_push: true` so pushes to `main` redeploy both environments automatically. (Once you want independent staging/production release timing, point staging at a different branch — not needed yet.)
- **`dockerfile_path: Dockerfile`**: builds the app from the repo's own `Dockerfile` (a multi-stage build: Composer + npm/Vite in a builder stage, [FrankenPHP](https://frankenphp.dev/) as the runtime) instead of DO's PHP buildpack. See the Dockerfile itself for the reasoning on that switch.
- **`http_port: 8080`**: must match the `SERVER_NAME=:8080` set in the Dockerfile — this is no longer automatic the way it was under the buildpack, because we're the ones choosing the port FrankenPHP binds to.
- **`health_check.http_path: /up`**: DO polls this path to decide if the container is healthy. This is safe to leave ungated: Laravel registers `/up` (via the `health: '/up'` argument in `bootstrap/app.php`) outside the `web` middleware group entirely, so `RequireBasicAuthForStaging` — appended to that group — never runs on it. No special-casing needed.
- **`envs`**: mostly identity/secrets (`APP_NAME`, `APP_ENV`, `APP_KEY` as a `type: SECRET` value, `APP_DEBUG`, `APP_URL`). `SESSION_DRIVER`/`CACHE_STORE`/`QUEUE_CONNECTION`/`LOG_CHANNEL`/`DB_CONNECTION` are **not** set here anymore — they're now the framework's own defaults directly in `config/*.php` (see `production-deployment-plan.md` section 1), so there's nothing to restate as an env var. `LOG_LEVEL=info` is the one exception: its framework default (`debug`) wasn't changed, so it's still set explicitly here to avoid noisy debug-level logs in production/staging.
- **No `jobs` block / no migration step**: App Platform gives every container — including a `PRE_DEPLOY` job — its own separate, ephemeral filesystem (no persistent volumes at all: see `production-deployment-plan.md`'s note on this). A migration job would create `database.sqlite` inside its own throwaway container, which is then discarded; that file would never reach the actual web service's container, which starts with its own empty disk. Running `artisan migrate` here would accomplish nothing, so there's no `PRE_DEPLOY` job at all. If a real, persistent database is ever added (a DO Managed Database, not SQLite), a migrate job would need to come back — see the open items in `production-deployment-plan.md`.
- **`domains`**: production claims `freecalculators.co.uk` + `www.freecalculators.co.uk`; staging claims `staging.freecalculators.co.uk`.
- Staging additionally sets `STAGING_BASIC_AUTH_ENABLED=true`, `STAGING_BASIC_AUTH_USER`, and `STAGING_BASIC_AUTH_PASSWORD_HASH` (a bcrypt hash, generated with `php artisan staging:hash-password` — never the plaintext password), wiring up `App\Http\Middleware\RequireBasicAuthForStaging` as implemented in `production-deployment-plan.md` section 3.

## Testing the exact production image locally

Since this is now a real Dockerfile rather than a buildpack, you can build and run the precise image App Platform will run, on your laptop, without installing PHP or Node locally at all:

```bash
docker build -t freecalculators:local .
docker run --rm -p 8080:8080 \
  -e APP_KEY="$(php artisan key:generate --show)" \
  freecalculators:local
```

Visit `http://localhost:8080`. This supersedes the manual `composer install --no-dev` / `npm run build` / `php artisan optimize` steps in `production-deployment-plan.md` section 2 as the more accurate way to test "production mode" locally — those steps are still useful for understanding *what* production mode changes, but this is what actually ships.

## Handling secrets in a committed YAML file

`APP_KEY` and the staging Basic Auth credentials are marked `type: SECRET` with a placeholder value (`REPLACE_ME_LOCALLY`) in the committed files — **never commit the real value in plaintext**, and never even type it into these tracked files directly. The workflow:

1. Run `php artisan deploy:build-spec staging` (or `production`). It reads the matching `.do/app-platform-template-*.yaml` template, prompts (masked) for every `type: SECRET` value still set to `REPLACE_ME_LOCALLY`, and writes `.do/app-platform-staging.generated.yaml` (or `-production`) with those values filled in. That generated file is gitignored — it's never a candidate for a commit, even by accident. Point `doctl apps create`/`update` at the generated file, not the template.
2. Once the app exists, run `doctl apps spec get <app-id> > .do/app-platform-template-production.yaml` (same for staging). DigitalOcean returns secret values pre-encrypted as `EV[1:...]` ciphertext.
3. Commit that ciphertext version. It's safe to commit — it can only be decrypted by that specific DO account/app — and future `doctl apps update` runs using this file will preserve it correctly.

This is the standard round-trip for App Spec secrets: plaintext only ever touches your terminal, via the `deploy:build-spec` prompts, and the file it produces stays local.

## Applying the spec

Install `doctl` (DigitalOcean's CLI) and authenticate once (`doctl auth init`), then:

```bash
# First time — generate the real spec (fills secret prompts, see above),
# then create the app from it
php artisan deploy:build-spec production
doctl apps create --spec .do/app-platform-production.generated.yaml

php artisan deploy:build-spec staging
doctl apps create --spec .do/app-platform-staging.generated.yaml

# After editing a spec file — pushes the change to an existing app. Once
# step 2 below has replaced the placeholder with real ciphertext, the
# committed template itself is safe to use directly here.
doctl apps update <app-id> --spec .do/app-platform-template-production.yaml

# Pull the current live config back down (e.g. after a console edit,
# or to get encrypted secret ciphertext post-creation — see above)
doctl apps spec get <app-id>
```

The console's raw-YAML editor only exists for an app that already exists — **Settings → App Spec → Edit** — not for the initial create wizard, which is click-through fields only. So without `doctl`, the practical path is: create a minimal app through the wizard (just connect the repo), then immediately overwrite it via that Settings → App Spec editor with the real spec from this repo. `doctl` skips that two-step dance entirely.

## References

- [App Spec reference (all fields)](https://docs.digitalocean.com/products/app-platform/reference/app-spec/) — the authoritative field list; consult this if you need something not covered above (alerts, VPC, scheduled jobs, ingress rules, etc.)
- [`doctl` apps command reference](https://docs.digitalocean.com/reference/doctl/reference/apps/) — `create`, `update`, `spec get`, and related subcommands
