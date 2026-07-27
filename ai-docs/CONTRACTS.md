<!-- ───────────────────────────────
  Template:     Contracts Catalog
  Template-ID:  contracts
  Generates:    ai-docs/CONTRACTS.md
  Description:  Standing as-built public-surface catalog (Provides/Requires) + compatibility policy.
  Library ver:  0.2.1
  Last updated: 2026-07-27
─────────────────────────────── -->

# Contracts Catalog — webex/components

> Machine source: `.sdd/manifest.json`. Package entry: `src/index.js` (Rollup input). Component barrel: `src/components/index.js`. Adapter module barrel: `src/adapters/index.js` (internal — only `WebexJSONAdapter` is re-exported from the package root).

### Exported API & Types

| Contract ID | Owner | Symbol | Purpose | Stability | Defined at |
|---|---|---|---|---|---|
| pkg.WebexJSONAdapter | adapters | WebexJSONAdapter | JSON adapter façade (npm public API) | Semver beta | `src/index.js` |
| pkg.WEBEX_COMPONENTS_CLASS_PREFIX | components | WEBEX_COMPONENTS_CLASS_PREFIX | CSS class prefix `'wxc'` | Stable | `src/index.js` |
| pkg.WebexAvatar | components | WebexAvatar | Avatar display | Semver beta | `src/components/index.js` |
| pkg.WebexActivity | components | WebexActivity | Single activity | Semver beta | `src/components/index.js` |
| pkg.WebexActivityStream | components | WebexActivityStream | Activity stream | Semver beta | `src/components/index.js` |
| pkg.WebexAdaptiveCards | components | WebexAdaptiveCards | Adaptive cards container | Semver beta | `src/components/index.js` |
| pkg.WebexDataProvider | components | WebexDataProvider | Adapter context provider | Semver beta | `src/components/index.js` |
| pkg.WebexInMeeting | components | WebexInMeeting | In-meeting layout | Semver beta | `src/components/index.js` |
| pkg.WebexInterstitialMeeting | components | WebexInterstitialMeeting | Pre-join interstitial | Semver beta | `src/components/index.js` |
| pkg.WebexLocalMedia | components | WebexLocalMedia | Local media display | Semver beta | `src/components/index.js` |
| pkg.WebexMediaAccess | components | WebexMediaAccess | Media permission prompt | Semver beta | `src/components/index.js` |
| pkg.WebexMeeting | components | WebexMeeting | Full meeting shell | Semver beta | `src/components/index.js` |
| pkg.WebexMeetingGuestAuthentication | components | WebexMeetingGuestAuthentication | Guest auth UI | Semver beta | `src/components/index.js` |
| pkg.WebexMeetingHostAuthentication | components | WebexMeetingHostAuthentication | Host auth UI | Semver beta | `src/components/index.js` |
| pkg.WebexMeetingControl | components | WebexMeetingControl | Single meeting control | Semver beta | `src/components/index.js` |
| pkg.WebexMeetingControlBar | components | WebexMeetingControlBar | Control bar | Semver beta | `src/components/index.js` |
| pkg.WebexMeetingInfo | components | WebexMeetingInfo | Meeting info display | Semver beta | `src/components/index.js` |
| pkg.WebexMember | components | WebexMember | Single member row | Semver beta | `src/components/index.js` |
| pkg.WebexMemberRoster | components | WebexMemberRoster | Member roster | Semver beta | `src/components/index.js` |
| pkg.WebexMessaging | components | WebexMessaging | Messaging UI | Semver beta | `src/components/index.js` |
| pkg.WebexRemoteMedia | components | WebexRemoteMedia | Remote media tiles | Semver beta | `src/components/index.js` |
| pkg.WebexSettings | components | WebexSettings | Settings panel | Semver beta | `src/components/index.js` |
| pkg.WebexWaitingForHost | components | WebexWaitingForHost | Waiting state UI | Semver beta | `src/components/index.js` |
| pkg.SignIn | components | SignIn | Sign-in UI | Semver beta | `src/components/index.js` |
| pkg.WebexSearchPeople | components | WebexSearchPeople | People search UI | Semver beta | `src/components/index.js` |
| pkg.WebexCreateSpace | components | WebexCreateSpace | Create space UI | Semver beta | `src/components/index.js` |
| pkg.useMeetingDestination | components | useMeetingDestination | Meeting destination hook | Semver beta | `src/components/index.js` |
| pkg.withMeeting | components | withMeeting | Meeting scope HOC | Semver beta | `src/components/index.js` |
| pkg.withAdapter | components | withAdapter | Adapter lifecycle HOC | Semver beta | `src/components/index.js` |
| pkg.Button | components | Button | Generic button | Semver beta | `src/components/index.js` |
| pkg.Modal | components | Modal | Generic modal | Semver beta | `src/components/index.js` |
| pkg.AdapterContext | components | AdapterContext | React context for adapter | Semver beta | `src/components/index.js` |
| pkg.MeetingContext | components | MeetingContext | React context for meeting scope | Semver beta | `src/components/index.js` |
| pkg.css.bundle | styles-themes | webex-components.css | Compiled stylesheet | Semver beta | `dist/css/webex-components.css` |
| pkg.themes | styles-themes | dist/themes/* | Theme asset folders | Semver beta | `rollup.config.js` |
| pkg.fonts | styles-themes | dist/assets/fonts/* | Font files (CiscoSansTT) | Semver beta | `rollup.config.js` |

### Internal adapter classes (not npm package exports)

Composed by `WebexJSONAdapter` and exported from the adapter module barrel for tests/Storybook — **not** re-exported from `src/index.js`.

| Symbol | Purpose | Defined at |
|---|---|---|
| ActivitiesJSONAdapter | Activities domain | `src/adapters/ActivitiesJSONAdapter.js` |
| MeetingsJSONAdapter | Meetings domain + controls | `src/adapters/MeetingsJSONAdapter.js` |
| MembershipJSONAdapter | Memberships domain | `src/adapters/MembershipJSONAdapter.js` |
| OrganizationsJSONAdapter | Organizations domain | `src/adapters/OrganizationsJSONAdapter.js` |
| PeopleJSONAdapter | People domain | `src/adapters/PeopleJSONAdapter.js` |
| RoomsJSONAdapter | Rooms domain | `src/adapters/RoomsJSONAdapter.js` |

Evidence: `src/adapters/index.js` vs `src/index.js` (only `WebexJSONAdapter` is published).

### Internal-only components (not in public barrel)

| Symbol | Purpose | Defined at |
|---|---|---|
| WebexAdaptiveCard | Single adaptive card renderer | `src/components/WebexAdaptiveCard/` |
| WebexAudioSettings | Audio device settings | `src/components/WebexAudioSettings/` |
| WebexVideoSettings | Video device settings | `src/components/WebexVideoSettings/` |
| WebexMeetingProvider | Meeting context wrapper | `src/components/WebexMeetingProvider/` |
| WebexNoMedia | No media placeholder | `src/components/WebexNoMedia/` |

Evidence: folder listing under `src/components/` vs `src/components/index.js` exports.

## Requires — what this repo depends on

| Dependency (service / package / datastore) | What is consumed | Schema / detail link | Availability assumption | Fallback on failure | Version floor |
|---|---|---|---|---|---|
| `@webex/component-adapter-interfaces` | Adapter base classes, `MeetingState`, domain adapter contracts | npm package + `src/adapters/ai-docs/adapters-spec.md` | Host supplies a connected adapter instance at runtime | Components cannot load Webex data; host must inject SDK or JSON adapter | ^1.28.0 |
| `react` / `react-dom` | UI rendering | `package.json` peerDependencies | Required at install/build time | Build or runtime failure if missing | 18.3.1 |
| `rxjs` | Observable streams from adapters | `package.json` peerDependencies | Required at install/build time | Adapter hooks cannot subscribe | ^6.6.2 |
| `prop-types` | Runtime prop validation | `package.json` peerDependencies | Required at install/build time | Dev-time PropTypes warnings only | ^15.7.2 |
| `@babel/runtime` | Transpiled helper functions | `package.json` peerDependencies | Required at install/build time | Runtime errors in transpiled code | ^7.11.2 |
| `adaptivecards-templating` | Adaptive card template expansion | `package.json` dependencies | Bundled with package | Adaptive card UI degrades or fails render | ^2.2.0 |
| `markdown-it` | Markdown rendering in messaging | `package.json` dependencies | Bundled with package | Messaging markdown falls back to plain text or fails render | ^12.3.2 |
| Host adapter (production) | Live Webex data via `@webex/sdk-component-adapter` (external) | `README.md`, `@webex/component-adapter-interfaces` | Host-managed Webex SDK session | Use `WebexJSONAdapter` for offline/demo only | n/a |

## Compatibility & Deprecation Policy

- **Breaking-change rule:** Beta product — breaking changes may occur; follow semantic-release and CHANGELOG.
- **Deprecation:** Mark in JSDoc and CHANGELOG before removal; prefer additive props.

## Detailed Interface Docs

- Module specs: `src/components/ai-docs/components-spec.md`, `src/adapters/ai-docs/adapters-spec.md`
- External adapter contracts: `@webex/component-adapter-interfaces` npm package
