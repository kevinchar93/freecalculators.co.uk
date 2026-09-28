# Guide: Repo structure

The repo has four areas: the AdonisJS app in `webapp/`, deployment config in `infrastructure/`, docs in `docs/`, and repo tooling (CI and the `/trello` command).

## Top level

```
freecalculators.co.uk/
├── webapp/           ← the AdonisJS application (everything that runs)
├── infrastructure/   ← how it's built and deployed
├── docs/             ← specs, research, plans
├── .github/workflows/tests.yml   ← CI: lint, format, typecheck, tests, build for webapp/
├── .claude/commands/trello.md    ← the /trello command
└── .gitignore        ← ignores generated DO specs (they contain secrets)
```

## `webapp/`: the AdonisJS project

The project lives in `webapp/`. Inside it, Adonis uses a folder called `app/` for backend code (`webapp/app/`); the project folder is named `webapp` so the two don't clash.

In short, the backend is only in `app`, `config`, `start`, `commands` and `resources/views`. Most day-to-day work happens in `webapp/inertia/`.

### Backend

| Path | What it does |
|---|---|
| `start/routes.ts` | **All the URLs.** Each page is `router.on('/path').renderInertia('page-name')`. The pages are grouped behind the basic-auth middleware; `/up` sits outside the group so health checks work. |
| `start/kernel.ts` | The middleware setup. Global middleware covers static files, Vite and Inertia; route middleware covers the body parser, session and shield (CSRF and security headers). It also registers `stagingBasicAuth` as named middleware. |
| `start/env.ts` | Checks the env vars at boot, including `STAGING_BASIC_AUTH_*` and `APP_NAME`. The app refuses to start if a required one is missing or invalid. |
| `app/middleware/staging_basic_auth_middleware.ts` | The staging password gate. It returns 401 without valid credentials and adds `X-Robots-Tag: noindex`. |
| `app/middleware/inertia_middleware.ts` | Shares props with every page (`name`, `sidebarOpen`, `errors`). |
| `app/middleware/container_bindings_middleware.ts` | Adonis boilerplate; rarely needs touching. |
| `app/services/bcryptjs_hash_driver.ts` | The hash driver that accepts standard `$2y$`/`$2b$` bcrypt hashes. Adonis's built-in bcrypt driver only accepts its own format. |
| `app/exceptions/handler.ts` | Error handling: pretty stack traces in dev, plain responses in production. |
| `config/*.ts` | One file per feature: `app`, `hash`, `session`, `shield`, `static`, `vite`, `inertia`, `logger`, `bodyparser`, `encryption`. `config/staging.ts` holds the basic-auth settings. |
| `commands/` | Ace commands. `hash_password.ts` is `node ace hash:password`; `build_deploy_spec.ts` is `node ace deploy:build-spec staging`. |
| `resources/views/inertia_layout.edge` | The HTML shell for the first page load: dark-mode script, favicons, and the Vite and Inertia tags. |
| `bin/` | Entry points: `server.ts` runs the web server, `console.ts` runs Ace, `test.ts` runs the tests. |
| `ace.js`, `adonisrc.ts` | `ace.js` is Adonis's CLI. `adonisrc.ts` lists the providers, preloads, test suites and codegen hooks. |

### Frontend: `webapp/inertia/`

Imports use the `@/` alias, which points at `webapp/inertia/`.

```
inertia/
├── app.tsx          ← browser entry: finds pages, applies the default layout, sets up dark mode
├── client.ts        ← Tuyau client; exports urlFor('route-name') for typed links
├── css/app.css      ← Tailwind 4 theme, colours and @font-face rules; fonts in css/fonts/
├── pages/           ← one file per route (the names used in routes.ts)
│   ├── home.tsx, calculators-page.tsx, blog-page.tsx, about-us-page.tsx,
│   │   privacy-policy-page.tsx, terms-of-service-page.tsx
│   └── mortgage-calculator-page/
│       ├── index.tsx         ← the /calculators/mortgage page
│       ├── assumptions.tsx   ← the /calculators/mortgage/assumptions page
│       ├── copy.json         ← all user-facing text
│       ├── defaults.json     ← starting form values (e.g. the £275k price)
│       ├── calculations.ts   ← the mortgage maths
│       ├── view-model.ts     ← turns calculation results into display values
│       ├── formatters.ts     ← £ and % formatting
│       ├── store.ts          ← Zustand store holding the form state
│       ├── types.ts, styles.ts
│       └── components/       ← result cards, schedule, form, and form-fields/ for each input
├── components/      ← shared pieces: nav-bar, nav-footer, full-bleed-section, app-content…
│   └── ui/          ← shadcn/Radix building blocks (button, card, input, toggle…)
├── layouts/         ← app-layout.tsx wraps every page (except home) in the navbar and footer
├── hooks/           ← use-appearance (dark mode), use-current-url, use-debounced-value…
├── lib/utils.ts     ← cn() for merging class names
├── types/           ← shared TS types; global.d.ts types the shared Inertia props
└── test/            ← Vitest setup and an Inertia mock
```

**Adding a page:**

1. Create `inertia/pages/foo.tsx`.
2. Add `router.on('/foo').renderInertia('foo', {}).as('foo')` inside the group in `start/routes.ts`.
3. Link to it with `urlFor('foo')`.

The dev server regenerates the route types automatically.

### Generated files and tooling

| Path | What it is |
|---|---|
| `.adonisjs/` | **Generated; don't edit.** Page and route types plus the Tuyau route registry that `urlFor` reads. It's rebuilt on `npm run dev`, `npm run build` and `npm test`. It's committed because the frontend imports from it. |
| `tests/functional/` | HTTP tests: `pages.spec.ts` checks each route renders the right page; `staging_basic_auth.spec.ts` covers the password gate. |
| `tests/unit/` | Tests for the hash driver and both Ace commands. |
| `tests/bootstrap.ts` | Japa test runner setup. |
| `public/` | Served as-is: favicons, `robots.txt`. Built assets land in `public/assets/`, which is gitignored. |
| `vite.config.ts` | The Adonis Vite plugin, React, Tailwind and the `@/` alias. |
| `vitest.config.ts` | Frontend tests: jsdom, and only picks up `inertia/**/*.test.tsx`. |
| `tsconfig.json`, `inertia/tsconfig.json`, `tsconfig.inertia.json` | Separate TypeScript configs for the backend (Node) and the frontend (browser); the third links the two. |
| `eslint.config.js`, `.prettierrc` | Lint and format rules. |
| `components.json` | shadcn config, so `npx shadcn add` writes to the right place. |
| `.env.example`, `.env.test` | Env templates. `.env` itself is gitignored. |
| `tmp/` | Adonis scratch space, gitignored apart from `.gitkeep`. |

**npm scripts:**

- `dev`: the dev server with hot reload, on port 3333
- `build`: produces `build/`
- `test`: backend tests, then frontend tests
- `lint`, `format`, `typecheck`: the individual checks
- `ci:check`: all of the checks together

## `infrastructure/`

| Path | What it does |
|---|---|
| `Dockerfile` | Two stages. The first runs `npm ci` and `node ace build`; the second copies only the compiled `build/` onto `node:24-slim` and runs `node bin/server.js` on port 8080. It is always built with `webapp/` as its build context. |
| `Taskfile.yml` | Run these with `task` from inside `infrastructure/`: `spec:build:staging` and `spec:build:production` fill in the secrets, `infra:create:staging-app` creates the app, and `build:image` and `start:container` build and run the image locally with podman. |
| `digitalocean/app-platform-template-*.yaml` | The committed DO specs, with `REPLACE_ME_LOCALLY` placeholders for secrets. They point DO at `source_dir: webapp` and `dockerfile_path: infrastructure/Dockerfile`. |
| `digitalocean/*.generated.yaml` | The filled-in copies, with real secrets. **Gitignored**; hand them to `doctl` only. |

## How a request flows

1. `bin/server.ts` boots the app.
2. The global middleware in `start/kernel.ts` runs: static files, Vite, Inertia.
3. The matching route in `start/routes.ts` runs its route middleware: session, shield and basic auth.
4. `renderInertia('mortgage-calculator-page/index')` sends one of two responses:
   - **First load:** the full HTML shell from `inertia_layout.edge`, with the page name and props embedded.
   - **Later link clicks:** just JSON.
5. In the browser, `inertia/app.tsx` loads `pages/mortgage-calculator-page/index.tsx` and wraps it in `layouts/app-layout.tsx`.
