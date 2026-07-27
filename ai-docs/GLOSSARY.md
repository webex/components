<!-- ───────────────────────────────
  Template:     Glossary
  Template-ID:  glossary
  Generates:    ai-docs/GLOSSARY.md
  Description:  Ubiquitous language — domain term → definition → authoritative code location.
  Library ver:  0.2.1
  Last updated: 2026-07-27
─────────────────────────────── -->

# Glossary — webex/components

> Start here → root [`AGENTS.md`](../AGENTS.md) · router [`SPEC_INDEX.md`](SPEC_INDEX.md).

## Domain Terms

| Term | Definition | Authoritative location | Notes / synonyms to avoid |
|---|---|---|---|
| Adapter | Object implementing `@webex/component-adapter-interfaces` that supplies observable Webex domain data to components | `src/adapters/WebexJSONAdapter.js` | Not "provider" (use `WebexDataProvider` for React context only) |
| WebexJSONAdapter | Façade JSON adapter wiring six domain adapters from a static datasource object | `src/adapters/WebexJSONAdapter.js` | Demo/Storybook adapter, not SDK adapter |
| withAdapter | HOC that creates adapter, calls connect/disconnect, wraps tree in `WebexDataProvider` | `src/components/hoc/withAdapter.jsx` | |
| WebexDataProvider | React context provider exposing adapter to descendant hooks | `src/components/WebexDataProvider/WebexDataProvider.jsx` | |
| Meeting control | Imperative action object (join, mute, share, …) exposed by meetings adapter | `src/adapters/MeetingsJSONAdapter/controls/` | Control ID strings in `MeetingsJSONAdapter.js` |
| wxc | CSS class prefix for all Webex component styles | `src/constants.js`, `src/styles/_variables.scss` | Must stay synchronized |
| Component barrel | Public export surface for npm consumers | `src/components/index.js` | |
| Storybook | Interactive component catalog for development/demo | `.storybook/`, `src/**/*.stories.js` | |
| Peer dependency | React/RxJS packages excluded from Rollup bundle | `rollup.config.js` `external` | Host must install |

## Abbreviations & Acronyms

| Abbreviation | Expansion | Meaning in this repo |
|---|---|---|
| HOC | Higher-Order Component | `withAdapter`, `withMeeting` |
| UMD | Universal Module Definition | Browser global bundle format |
| ES | ECMAScript modules | `dist/es/` output |
| SCSS | Sassy CSS | Style source format |
| ARIA | Accessible Rich Internet Applications | Accessibility attributes on media controls |

## Maintenance

- New exported symbol or domain concept → add term here in the same PR as the code change.
