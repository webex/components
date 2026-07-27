<!-- ───────────────────────────────
  Template:     Security Baseline
  Template-ID:  security
  Generates:    ai-docs/SECURITY.md
  Description:  Standing security posture — trust boundaries, authn/authz, secret handling, data classification.
  Library ver:  0.2.1
  Last updated: 2026-07-27
─────────────────────────────── -->

# Security Baseline — webex/components

> Client-side React library — hosts own authentication and token storage.

## Trust Boundaries

| Boundary | Untrusted side | Trusted side | What is enforced at the crossing |
|---|---|---|---|
| Host application → components | Host props, URLs, user input | Component render tree | PropTypes validation; `isValidUrl` for URL props |
| Components → adapter | User actions (join, mute, …) | Adapter control methods | Adapter interface contract; no direct API calls in this repo |
| npm consumer → package | Imported JS/CSS bundles | Host build pipeline | Peer dependency versions; no secrets in published package |

## Authentication & Authorization Model

- **Authentication:** Not implemented in this library. Host applications authenticate to Webex and pass tokens to SDK adapters (external). JSON adapters use static demo data only.
- **Authorization:** Not applicable at library level; meeting join/auth UI components delegate to adapter state.
- **Default posture:** Components render UI only; no privilege decisions without adapter data.

Evidence: `README.md`, `src/adapters/WebexJSONAdapter.js`.

## Secret & Credential Handling

- Secrets source: Host application / SDK adapter (outside this repo).
- Injection: Host passes credentials to adapter factory in `withAdapter` — never commit tokens in this repository.
- Rotation: Host responsibility.
- **Hard rule:** never commit secrets, tokens, keys, or connection strings; never log them in component code.

Evidence: `.gitignore` (`.env*`), `CONTRIBUTING.md`.

## Data Classification & Handling

| Data class | Examples | Storage rule | Logging rule | In transit |
|---|---|---|---|---|
| Host credentials | Webex access tokens | Not stored by library | Never log | HTTPS (host responsibility) |
| Demo JSON | People emails, display names in fixtures | Static JSON in repo for tests/demo | Avoid logging in production hosts | N/A for JSON adapter |
| Media streams | Camera/mic via browser APIs | Browser memory only | No persistence in library | Browser WebRTC (host/adapter) |

## Input Validation & Output Encoding Posture

- Validate URLs with `isValidUrl` and explicit protocol allow-lists where used.
- Markdown rendering in messaging uses `markdown-it` — hosts should sanitize untrusted content before display if sourcing external messages.
- Adaptive cards render templated JSON — validate card payload at adapter/host layer.

Evidence: `src/util.js`, `package.json` dependencies.

## Known Sensitive Areas & Accepted Risks

| Area | Risk | Mitigation / why accepted | Owner |
|---|---|---|---|
| Beta API surface | Breaking changes | Documented in README; semver via semantic-release | Maintainers |
| Host token handling | Token exposure in host app | Out of scope; documented in SECURITY | Host integrators |

## Reporting & Review

- Report security issues via Webex open-source support channels listed in `README.md`.
- Security-sensitive changes require maintainer review per `CONTRIBUTING.md`.
