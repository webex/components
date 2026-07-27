<!-- ───────────────────────────────
  Template:     Spec Index
  Template-ID:  spec-index
  Generates:    ai-docs/SPEC_INDEX.md
  Description:  Router — which docs to load for which task and the canonical module registry.
  Library ver:  0.2.1
  Last updated: 2026-07-27
─────────────────────────────── -->

# Spec Index — webex/components

> Start here → root [`AGENTS.md`](../AGENTS.md). **Source of truth:** `.sdd/manifest.json` (this file mirrors it).

## Module Registry

| Module | Responsibility | Manifest coverage state | Start here |
|---|---|---|---|
| `src/components/` | React UI, hooks, HOCs, generic widgets | Specced | `src/components/ai-docs/components-spec.md` |
| `src/adapters/` | JSON adapter implementations | Specced | `src/adapters/ai-docs/adapters-spec.md` |
| `src/styles/` | SCSS, themes, fonts | Specced | `src/styles/ai-docs/styles-themes-spec.md` |

## Task Routing

| If the task is… | Load |
|---|---|
| Understanding the system | `ARCHITECTURE.md` |
| Working in components | `src/components/ai-docs/components-spec.md` |
| Working in adapters | `src/adapters/ai-docs/adapters-spec.md` |
| Styling / themes | `src/styles/ai-docs/styles-themes-spec.md` |
| Public export change | `CONTRACTS.md` + affected module spec |
| Updating docs after code change | affected module spec + `SPEC_INDEX.md` |

## Incident History

| INC id | Date | Module | One-line | Link |
|---|---|---|---|---|
| — | — | — | No incident rows recorded at bootstrap | — |

## Spec Registry

| Doc | Location | Purpose |
|---|---|---|
| Architecture | `ARCHITECTURE.md` | System components and interaction |
| Contracts | `CONTRACTS.md` | Public npm export catalog |
| Getting started | `GETTING_STARTED.md` | Clone, build, test, Storybook |
| Rules | `RULES.md` | Enforceable conventions beyond AGENTS |
| Glossary | `GLOSSARY.md` | Domain terms and code locations |
| Security | `SECURITY.md` | Client-side trust boundaries and secret handling |
| Review catalog | `REVIEW_CHECKLIST.md` | SDD review checks |
| Patterns | `patterns/` | Co-located tests, wxc prefix, withAdapter injection |
