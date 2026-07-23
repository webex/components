# Review-Check Catalog — webex/components

> Draft checklist for SDD changes. Validator runs independently (Session B).

## Core checks (always run)

| # | Check | What it verifies | Severity if it fails |
|---|---|---|---|
| C1 | Spec-currency + WHAT/WHY | Spec/docs updated in same PR as code; requirements have WHAT and WHY | Blocking |
| C2 | Contract correctness | Export/prop changes reflected in `CONTRACTS.md` and module specs | Blocking |
| C3 | Code-vs-spec match | Exports in `src/components/index.js` / `src/adapters/index.js` match specs | Blocking |
| C4 | Test adequacy | Jest tests for changed behavior; snapshots updated deliberately | Important |
| C5 | Error handling + input validation | Adapter connect lifecycle; URL validation where applicable | Important |
| C6 | Security baseline | No secrets; no credential logging per `SECURITY.md` | Blocking |

## Coverage-conditional checks

| # | Check | When it applies | What it verifies | Severity |
|---|---|---|---|---|
| K1 | Regression guard | Changing adapter observables or public props | Existing tests still pass; snapshots reviewed | Important |
| K2 | Grounding | Any module | Claims cite file paths from real source | Important |
| K3 | Drift threshold | Tracked modules | Spec matches current exports | Important |
| K4 | Coverage-state accuracy | Manifest promotion | Coverage score evidence matches spec completeness | Medium |

## Cross-cutting checks

| # | Check | What it verifies | Severity |
|---|---|---|---|
| X1 | Cross-model review | spec-validator uses different runtime than generator | Blocking when required |
| X2 | Observability | No PII/token logging added | Medium |
| X3 | Rollout safety | Beta breaking changes documented in CHANGELOG/README | Important |

## How the set is selected

1. Always run core checks C1–C6.
2. Add K1–K4 when touching Partial/Specced modules.
3. Add X1 for SDD bootstrap validation handoff.

## Output

- Compliance matrix + severity-sorted findings + verdict (Pass / Pass-with-warnings / Blocked). Draft only.
