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
// Render WebexMeeting without adapter context or before connect() completes
<WebexMeeting meetingID="..." />
```

**Why wrong:** Hooks read `AdapterContext`; missing or disconnected adapter yields empty/error state.

## Where it appears

- `src/components/hoc/withAdapter.jsx`
- `src/components/hoc/withAdapter.test.jsx`
- `src/components/WebexDataProvider/WebexDataProvider.jsx`
- Storybook stories using `WebexJSONAdapter`

## Edge cases / exceptions

Manual `WebexDataProvider` usage is valid when host manages connect/disconnect lifecycle itself.
