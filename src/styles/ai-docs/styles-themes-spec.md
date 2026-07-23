# styles-themes — SPEC

> Start here → root [`AGENTS.md`](../../../AGENTS.md) · router [`SPEC_INDEX.md`](../../../ai-docs/SPEC_INDEX.md) · system [`ARCHITECTURE.md`](../../../ai-docs/ARCHITECTURE.md).

## Metadata

| Field | Value |
|---|---|
| Module id | styles-themes |
| Source path(s) | `src/styles/`, `src/themes/`, `src/assets/` |
| Doc kind | Module spec |
| Coverage score | 95% assessed 2026-07-23 — SCSS graph, themes, fonts, and build outputs documented |
| Generated from | `module-spec` @ SDLC template library `0.2.1` |
| generated_by / approved_by / updated_at | cursor-agent-session / pending PR approval / 2026-07-23 |
| Validation status | not-run |

## Evidence Rules

Style requirements cite SCSS entry files and Rollup copy targets. Class prefix cross-checks `src/constants.js`.

## Source Material Register

| Source material | Scope | Decision | Detail location |
|---|---|---|---|
| Component `_components.scss` | per-component styles | verified | Imported via `src/styles/index.scss` |
| Storybook | visual verification | reference-only | `.storybook/` |

## Overview

The **styles-themes** module defines global SCSS (variables, mixins, colors, fonts, defaults), dark/light theme token files, and font assets copied into `dist/` during build. Package entry `src/index.js` side-imports `src/styles/index.scss` so bundlers emit consolidated CSS.

## Purpose / Responsibility

Own visual consistency for Webex Components (`wxc-` class prefix) and deliver compiled CSS + theme assets to npm consumers. Does **not** implement component logic.

## Stack

- SCSS (sass)
- Rollup `rollup-plugin-scss` → `dist/css/webex-components.css`
- Rollup `rollup-plugin-copy` for themes and fonts

## Folder / Package Structure

```
src/styles/
├── index.scss          # Entry: imports mixins, variables, themes, components
├── _variables.scss     # SCSS variables (incl. class prefix)
├── _colors.scss
├── _mixins.scss
├── _fonts.scss
└── _defaults.scss

src/themes/
├── dark.scss
├── light.scss
├── dark/webex-logo.svg
└── light/webex-logo.svg

src/assets/fonts/       # Copied to dist/assets on build
```

## Key Files (source of truth)

| File | Holds |
|---|---|
| `src/styles/index.scss` | SCSS import graph root |
| `src/styles/_variables.scss` | Design tokens; class prefix must match `src/constants.js` |
| `src/themes/dark.scss` | Dark theme variables |
| `src/themes/light.scss` | Light theme variables |
| `rollup.config.js` | SCSS output path and copy targets |
| `src/constants.js` | `WEBEX_COMPONENTS_CLASS_PREFIX = 'wxc'` |

## Public Surface

| Contract ID | Type | Surface | Purpose | Compatibility | Detail link |
|---|---|---|---|---|---|
| styles.css.bundle | npm asset | `dist/css/webex-components.css` | Compiled styles for hosts | Additive class changes preferred | `rollup.config.js` |
| styles.themes.dark | npm asset | `dist/themes/dark/` | Dark theme static assets | Semver | `rollup.config.js` |
| styles.themes.light | npm asset | `dist/themes/light/` | Light theme assets | Semver | `rollup.config.js` |
| styles.fonts | npm asset | `dist/assets/fonts/` | Font files | Semver | `rollup.config.js` |

Internal Surface — SCSS partials are build-time, not direct public API.

## Requires (dependencies)

- `node-sass` / sass toolchain (devDependency via build)
- Component SCSS partials under `src/components/_components.scss` and per-component styles

## Requirements

| ID | WHAT | WHY | Source Evidence | Test Evidence | Gaps | Confidence |
|---|---|---|---|---|---|---|
| STY-R-001 | Package entry MUST import global SCSS | Ensures CSS emitted in library build | `src/index.js` | build output | none | PRESENT |
| STY-R-002 | Class prefix in SCSS MUST match JS constant `wxc` | Prevents broken selectors | `src/styles/_variables.scss`, `src/constants.js` | component tests | none | PRESENT |
| STY-R-003 | Rollup MUST emit compressed CSS to `dist/css/webex-components.css` | Consumer import path | `rollup.config.js` | CI build | none | PRESENT |
| STY-R-004 | Build MUST copy theme folders to `dist/themes/` | Host theme switching | `rollup.config.js` copy plugin | build artifact | none | PRESENT |
| STY-R-006 | Theme SCSS files MUST be imported from `src/styles/index.scss` | Single CSS bundle | `src/styles/index.scss` | build | none | PRESENT |
| STY-R-007 | Component styles aggregated via `src/components/_components.scss` | Component-level SCSS inclusion | `src/components/_components.scss` | build | none | PRESENT |

## SCSS File Registry

| File | Role |
|---|---|
| `src/styles/index.scss` | Entry import graph |
| `src/styles/_variables.scss` | Prefix, fonts, meeting min dimensions |
| `src/styles/_colors.scss` | Color tokens |
| `src/styles/_mixins.scss` | Shared mixins |
| `src/styles/_fonts.scss` | Font face declarations |
| `src/styles/_defaults.scss` | Base element defaults |
| `src/themes/dark.scss` | Dark theme tokens |
| `src/themes/light.scss` | Light theme tokens |
| `src/components/_components.scss` | Imports all component SCSS partials |

## Theme & Asset Assets

| Path | Role |
|---|---|
| `src/themes/dark/webex-logo.svg` | Dark theme logo |
| `src/themes/light/webex-logo.svg` | Light theme logo |
| `src/assets/fonts/` | CiscoSansTT font files copied to `dist/assets/fonts/` |

## Module Conventions

- SCSS partials prefixed with `_` under `src/styles/`.
- Class prefix variable `$WEBEX_COMPONENTS_CLASS_PREFIX` must match `src/constants.js`.
- Component SCSS lives beside component JSX; registered through `_components.scss`.

## Design Trade-offs

- **Single compressed CSS bundle:** Simple host integration vs inability to tree-shake unused component styles.
- **Copy vs inline theme assets:** Theme folders copied verbatim for host static serving flexibility.

## Design Overview

SCSS is organized in layers: variables/mixins → color/font tokens → theme overrides → component aggregation. Themes (`dark.scss`, `light.scss`) set CSS custom properties or SCSS variables consumed by component rules. Rollup compiles a single CSS bundle for simplicity; theme folders ship as static assets for logos and theme-specific resources.

## Data Flow

```mermaid
flowchart LR
  Index[src/index.js import scss]
  Styles[src/styles/index.scss]
  Components[src/components/_components.scss]
  Rollup[rollup-plugin-scss]
  CSS[dist/css/webex-components.css]
  Copy[rollup-plugin-copy]
  DistThemes[dist/themes]
  DistFonts[dist/assets/fonts]

  Index --> Styles
  Styles --> Components
  Styles --> Rollup
  Rollup --> CSS
  Copy --> DistThemes
  Copy --> DistFonts
```

## Sequence Diagram(s)

```mermaid
sequenceDiagram
  participant Dev as Developer
  participant Rollup
  participant SCSS as rollup-plugin-scss
  participant Copy as rollup-plugin-copy

  Dev->>Rollup: npm run build
  Rollup->>SCSS: compile src/index.js graph
  SCSS-->>Rollup: dist/css/webex-components.css
  Rollup->>Copy: copy themes + fonts
  Copy-->>Rollup: dist/themes, dist/assets
```

## Class / Component Relationships

- SCSS `_variables.scss` defines `$wxc-*` tokens consumed by component SCSS files.
- `helpers.js` `webexComponentClasses()` generates BEM-style class strings aligned with SCSS blocks.
- No OOP classes in this module — relationship is **token → component stylesheet → rendered DOM class**.

Evidence: `src/components/helpers.js`, `src/styles/_variables.scss`.

## Use Cases

| UC | Description | Evidence |
|---|---|---|
| UC-1 Consumer styling | Host imports `dist/css/webex-components.css` | `README.md` |
| UC-2 Theme assets | Host serves `dist/themes/dark` logos | `rollup.config.js` |
| UC-3 Component author | Add SCSS beside new component; register in `_components.scss` | `src/components/` patterns |

## Host Integration

Hosts load compiled CSS once globally. Theme selection may swap CSS variables or load theme-specific assets from `dist/themes/`. Class prefix `wxc` must not be overridden without updating both JS and SCSS.

## Error Handling & Failure Modes

- SCSS compilation failure aborts build (`failOnError: true` in Rollup scss plugin).
- Missing theme/font copy targets fail at build time via Rollup copy plugin.
- Host omitting CSS import results in unstyled components — see components spec pitfalls.

Evidence: `rollup.config.js`.

## Export Stability

Published npm assets (`dist/css/`, `dist/themes/`, `dist/assets/`) follow semver via semantic-release. Prefer additive CSS classes; renaming `wxc-` prefixed classes is breaking.

Evidence: `package.json`, `README.md`.

## Pitfalls

- Changing `$prefix` in SCSS without updating `WEBEX_COMPONENTS_CLASS_PREFIX` breaks tests and styles.
- SCSS compilation failures fail build (`failOnError: true` in Rollup scss plugin).
- Consumers who tree-shake JS but omit CSS see unstyled components.

Evidence: `rollup.config.js`, `src/constants.js`.

## Test-Case Strategy (module)

- Indirect: component snapshot tests assert expected `wxc-` classes.
- Build verification: `npm run build` produces expected dist artifacts.
- Visual: Storybook/Chromatic for theme regressions.

## Traceability

| Requirement | Code | Tests |
|---|---|---|
| STY-R-001 | `src/index.js` | build |
| STY-R-002 | `src/styles/_variables.scss`, `src/constants.js` | component snapshots |
| STY-R-003 | `rollup.config.js` | CI build |
| STY-R-004 | `rollup.config.js` | CI build |
| STY-R-005 | `rollup.config.js` | CI build |
