<!-- ───────────────────────────────
  Template:     RULES
  Template-ID:  rules
  Generates:    ai-docs/RULES.md
  Description:  Enforceable do/don't beyond AGENTS — coverage, autonomy, naming, logging, errors, testing, security, drift, secrets.
  Library ver:  0.2.1
  Last updated: 2026-07-27
─────────────────────────────── -->

# Rules — webex/components

> Start here → root [`AGENTS.md`](../AGENTS.md) · critical rules live in AGENTS.md.

## Coverage Map (which docs/specs to trust)

| Module | Manifest coverage state | What it means here |
|---|---|---|
| `src/components/` | Specced | Spec is authoritative for exports and patterns |
| `src/adapters/` | Specced | Spec is authoritative for JSON adapter behavior |
| `src/styles/` | Specced | Spec is authoritative for SCSS/build outputs |

## Autonomy & Ask-First

- **May proceed:** Internal component refactors that do not change exported props or public exports; test fixes; Storybook-only changes.
- **Ask first:** New exported component; adapter interface behavior change; dependency or peer dependency bump; Rollup config change.
- **Never without explicit human approval:** Publish/release; disable CI checks; overwrite canonical specs.

## Naming

- Components: `Webex*` prefix for product components; PascalCase folders matching component name.
- Adapters: `*JSONAdapter` suffix for JSON implementations.
- CSS classes: `wxc-` prefix via `WEBEX_COMPONENTS_CLASS_PREFIX`.
- Tests: co-located `*.test.js` / `*.test.jsx` beside source.

Evidence: `src/components/`, `src/adapters/`, `src/constants.js`.

## Logging

- No centralized server logging in this client library.
- Avoid logging access tokens or PII in host integrations.

## Error Handling

- Adapter methods return Promises; `withAdapter` awaits `connect()` before providing context.
- Components guard missing adapter state via hooks and conditional render paths.
- URL inputs validated with `isValidUrl` where used.

Evidence: `src/components/hoc/withAdapter.jsx`, `src/util.js`.

## Imports / Dependencies

- ESLint enforces import rules; run `npm run linter`.
- Do not import server-only or Node builtins in browser components (Rollup `browser: true`).
- New runtime dependencies require maintainer review per CONTRIBUTING.

## Testing

- All code changes require tests per CONTRIBUTING (unit at minimum).
- Use Jest snapshots where established; update snapshots deliberately with `-u` in CI context.
- Positive and negative cases for observable adapter behavior.

Evidence: `CONTRIBUTING.md`, `src/**/*.test.js`.

## Security

- Never commit tokens; hosts manage Webex credentials.
- Validate URLs and user-provided strings at component boundaries where applicable.

## Spec-Currency & Drift Thresholds

- Update module spec in the same PR as behavior or export changes.
- Partial modules: treat >15% undocumented public surface as drift to backfill.

## Secrets Policy

- No secrets in source; `.env*` gitignored except `.env.default` if present.
