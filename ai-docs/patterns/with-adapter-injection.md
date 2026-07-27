<!-- ───────────────────────────────
  Template:     Pattern (example)
  Template-ID:  pattern
  Generates:    ai-docs/patterns/with-adapter-injection.md
  Description:  A repo convention from real code — correct vs incorrect form, with where it appears.
  Library ver:  0.2.1
  Last updated: 2026-07-27
─────────────────────────────── -->

# Pattern: adapter injection via withAdapter

> Router [`SPEC_INDEX.md`](../SPEC_INDEX.md) · components spec

## When to use

When a host application embeds Webex components that need live or demo Webex data.

## Correct

```javascript
// from src/components/hoc/withAdapter.jsx
// 1. adapterFactory(props) returns adapter instance
// 2. await adapter.connect()
// 3. wrap with WebexDataProvider when connected
const Enhanced = withAdapter(MyComponent, adapterFactory);
```

## Incorrect

```javascript
// Render WebexMeeting without withAdapter/WebexDataProvider — no AdapterContext
<WebexMeeting meetingID="..." />

// Or: read AdapterContext inside withAdapter-wrapped component without checking adapterConnected
function MyView() {
  const adapter = useContext(AdapterContext); // undefined on first paint
  return adapter.meetingsAdapter.getMeetingInfo(...);
}
```

**Why wrong:** Hooks and context consumers expect `AdapterContext` from `WebexDataProvider`. `withAdapter` renders the wrapped component before connect completes; without the provider (or without checking `adapterConnected`), adapter access fails.

## Where it appears

- `src/components/hoc/withAdapter.jsx`
- `src/components/hoc/withAdapter.test.jsx`
- `src/components/WebexDataProvider/WebexDataProvider.jsx`
- Storybook stories using `WebexJSONAdapter`

## Edge cases / exceptions

Manual `WebexDataProvider` usage is valid when host manages connect/disconnect lifecycle itself.
