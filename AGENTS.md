<!-- ───────────────────────────────
  Template:     AGENTS.md
  Template-ID:  agents
  Generates:    AGENTS.md
  Description:  Agent entry contract — first file every AI agent reads (commands, rules, boundaries, routing).
  Library ver:  0.2.1
  Last updated: 2026-07-27
─────────────────────────────── -->

# AGENTS.md — webex/components

> You are the agent entry point — read first. Next: router [`SPEC_INDEX.md`](ai-docs/SPEC_INDEX.md) · system [`ARCHITECTURE.md`](ai-docs/ARCHITECTURE.md). Load this + `SPEC_INDEX.md` first; pull module/standing docs on demand.

**@webex/components** is a published React component library that embeds Webex-styled meeting, messaging, and people UI into host applications. Data flows through adapter interfaces from `@webex/component-adapter-interfaces`; this repo ships JSON mock adapters for Storybook and local development.

**What it is:**
- React 18 UI components (meetings, messaging, roster, settings, auth flows)
- JSON adapters implementing Webex adapter interfaces for offline/demo use
- Rollup-built npm package with SCSS themes and bundled CSS

**What it is NOT:**
- ❌ A full Webex client or SDK — it does not call Webex cloud APIs directly
- ❌ Webex Widgets — widgets bundle the SDK adapter; this library expects hosts to supply adapters
- ❌ A backend service — no server, datastore, or deployment target in this repo

## Tech Stack

- JavaScript (ES modules), React 18.3.1, PropTypes, RxJS 6
- Build: Rollup, Babel, SCSS (`rollup-plugin-scss`)
- Test: Jest, React Testing Library, Storybook 6, Chromatic
- Peer deps: `react`, `react-dom`, `prop-types`, `rxjs`, `@babel/runtime`

## Architecture

```
Host App
  └─ withAdapter(Component, adapterFactory)  or  WebexDataProvider
       └─ AdapterContext (meetings, people, rooms, …)
            └─ Webex* React components (hooks read adapter observables)
```

→ Full repo architecture: **[ARCHITECTURE.md](./ai-docs/ARCHITECTURE.md)**

## Module / Package Structure

```
src/
├── components/     # Exported + internal React components, hooks, HOCs
├── adapters/       # WebexJSONAdapter + domain JSON adapters
├── styles/         # Global SCSS variables, mixins, defaults
├── themes/         # dark/light theme tokens + assets
├── assets/         # Fonts copied to dist on build
├── constants.js    # Class prefix and shared string constants
└── util.js         # Shared helpers (deepMerge, rxjs chainWith, …)
```

→ Per-module docs: **[ai-docs/SPEC_INDEX.md](./ai-docs/SPEC_INDEX.md)**

## Critical Rules

1. **Code is the source of truth.** Never invent an API, prop, adapter method, or export — read `src/index.js` and barrel files.
2. **Ask before coding.** Present a plan / Spec Summary; wait for confirmation.
3. **Adapter boundary.** Components consume data only via `@webex/component-adapter-interfaces` adapters injected through `WebexDataProvider` or `withAdapter`.
4. **Class prefix.** Use `WEBEX_COMPONENTS_CLASS_PREFIX` (`wxc`) from `src/constants.js` — must stay aligned with `src/styles/_variables.scss`.
5. **Peer dependencies.** Do not bundle `react`, `react-dom`, `prop-types`, or `rxjs` — they are Rollup externals.
6. **Tests required.** Changes must include Jest tests; follow existing snapshot and hook test patterns.
7. **Lint clean.** `npm run linter` must pass; avoid disabling ESLint rules without maintainer approval.

## Essential Commands

| Task | Command |
|---|---|
| Install (with peers) | `npx install-peerdeps @webex/components` (consumers) / `npx npm-install-peers` (dev) |
| Build | `npm run build` |
| Test | `npm run test` |
| Coverage | `npm run test:coverage` |
| Lint | `npm run linter` |
| Dev / Storybook | `npm run storybook` |

## Common Gotchas

- **Styles side effect:** `src/index.js` imports `./styles/index.scss` — consumers must load compiled CSS from `dist/css/webex-components.css` or equivalent.
- **Adapter connect lifecycle:** `withAdapter` renders the wrapped component immediately; while `adapter.connect()` is pending, it returns the component **without** `WebexDataProvider` and passes `adapterConnected={false}`. After connect resolves, it re-renders with `WebexDataProvider` and `adapterConnected={true}`. Do not assume `AdapterContext` is available on first paint.
- **JSON adapter datasource shape:** `WebexJSONAdapter` expects top-level keys `activities`, `meetings`, `memberships`, `organizations`, `people`, `rooms`.
- **Semantic release:** Version bumps are automated — do not manually edit version in `package.json` for releases.

## Boundaries

### Always
- Read this file + `ai-docs/SPEC_INDEX.md` before touching code.
- Match existing component folder layout (`ComponentName/ComponentName.jsx`, co-located tests/stories).
- Update the manifest-routed module spec when changing public surface or behavior.

### Ask first
- New npm dependency or peer dependency change.
- New exported component or breaking prop/adapter contract change.
- Changes to Rollup externals or published `files` list.

### Never
- Commit secrets, tokens, or credentials.
- Disable tests or lint to force green CI.
- Overwrite canonical specs without `spec-reconcile` approval.

## Doc Routing

| Need | Load |
|---|---|
| System shape | `ai-docs/ARCHITECTURE.md` |
| Public exports | `ai-docs/CONTRACTS.md` |
| Module work | `<module-path>/ai-docs/<module-name>-spec.md` |
| Setup | `ai-docs/GETTING_STARTED.md` |
| Enforceable rules | `ai-docs/RULES.md` |
| Conventions | `ai-docs/patterns/` |

Machine contract: `.sdd/manifest.json`
