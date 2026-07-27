<!-- ───────────────────────────────
  Template:     Getting Started
  Template-ID:  getting-started
  Generates:    ai-docs/GETTING_STARTED.md
  Description:  Clone/build/run loop, config/secrets, and multi-repo workspace layout.
  Library ver:  0.2.1
  Last updated: 2026-07-27
─────────────────────────────── -->

# Getting Started — webex/components

> Start here → root [`AGENTS.md`](../AGENTS.md) · router [`SPEC_INDEX.md`](SPEC_INDEX.md).

## Prerequisites

- Node.js LTS (`lts/iron` per `.nvmrc`; CI uses Node 20.x)
- npm
- For development: peer deps installed via `npx npm-install-peers`

## Clone & Install

```bash
git clone git@github.com:webex/components.git
cd components
npx npm-install-peers
```

Evidence: `CONTRIBUTING.md`, `.nvmrc`.

## Build / Run / Test

| Task | Command |
|---|---|
| Build | `npm run build` |
| Run (local) | `npm run storybook` |
| Test | `npm run test` |
| Coverage | `npm run test:coverage` |
| Lint | `npm run linter` |

Evidence: `package.json` scripts.

## First-Run Verification

- `npm run linter` exits 0
- `npm run test` passes
- `npm run storybook` serves Storybook on port 6006
- `npm run build` produces `dist/es/`, `dist/umd/`, `dist/css/`

## Configuration & Secrets

- No `.env` required for local component development with JSON adapters.
- Host applications using live Webex data supply their own tokens outside this repo.

## Where to Go Next

- Agent entry: `../AGENTS.md`
- System shape: `ARCHITECTURE.md`
- Routing: `SPEC_INDEX.md`
- Module specs: `src/components/ai-docs/components-spec.md`, `src/adapters/ai-docs/adapters-spec.md`
