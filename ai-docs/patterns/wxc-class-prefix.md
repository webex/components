<!-- ───────────────────────────────
  Template:     Pattern (example)
  Template-ID:  pattern
  Generates:    ai-docs/patterns/wxc-class-prefix.md
  Description:  A repo convention from real code — correct vs incorrect form, with where it appears.
  Library ver:  0.2.1
  Last updated: 2026-07-27
─────────────────────────────── -->

# Pattern: wxc class prefix

> Router [`SPEC_INDEX.md`](../SPEC_INDEX.md) · [`GLOSSARY.md`](../GLOSSARY.md)

## When to use

When adding CSS classes in SCSS or className strings in JavaScript components.

## Correct

```javascript
// from src/constants.js
export const WEBEX_COMPONENTS_CLASS_PREFIX = 'wxc';
```

```scss
// from src/styles/_variables.scss
$WEBEX_COMPONENTS_CLASS_PREFIX: 'wxc';
```

Use `webexComponentClasses()` from `src/components/helpers.js` for BEM-style blocks.

## Incorrect

```javascript
const prefix = 'webex'; // hardcoded divergent prefix
```

**Why wrong:** Breaks theme/CSS alignment and snapshot tests expecting `wxc-` classes.

## Where it appears

- `src/constants.js`
- `src/styles/_variables.scss`
- `src/components/helpers.js`
- Multiple component SCSS files under `src/components/`

## Edge cases / exceptions

None — prefix must stay synchronized across JS and SCSS.
