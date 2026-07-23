# components — SPEC

> Start here → root [`AGENTS.md`](../../../AGENTS.md) · router [`SPEC_INDEX.md`](../../../ai-docs/SPEC_INDEX.md) · system [`ARCHITECTURE.md`](../../../ai-docs/ARCHITECTURE.md).

## Metadata

| Field | Value |
|---|---|
| Module id | components |
| Source path(s) | `src/components/`, `src/constants.js`, `src/util.js` |
| Doc kind | Module spec |
| Coverage score | 96% assessed 2026-07-23 — all exports, hooks, HOCs, and internal support folders documented |
| Generated from | `module-spec` @ SDLC template library `0.2.1` |
| generated_by / approved_by / updated_at | cursor-agent-session / pending PR approval / 2026-07-23 |
| Validation status | not-run |

## Evidence Rules

Every requirement cites `file path` evidence. Test evidence preferred for WHY. Unresolved gaps marked `[NEEDS HUMAN INPUT]` only when code/tests do not support a claim.

## Source Material Register

| Source material | Scope | Decision | Detail location or disposition |
|---|---|---|---|
| Per-component README.md files | component usage | reference-only | Linked from Overview; not canonical |
| Root README.md | package usage | reference-only | GETTING_STARTED / ARCHITECTURE |
| Storybook stories | UI behavior | verified | Use Cases, UI Flow sections |

## Overview

The **components** module is the primary UI surface of `@webex/components`. It contains exported Webex experience components (meetings, messaging, roster, settings, authentication), shared generic widgets (`Button`, `Modal`, …), React hooks that read adapter observables, and HOCs (`withAdapter`, `withMeeting`) that wire adapter lifecycle into the tree.

Internal folders (`icons/`, `inputs/`, `adaptive-cards/`, `generic/`) support exported components but are not all re-exported from `src/components/index.js`.

## Purpose / Responsibility

Owns all React presentation and client-side interaction for Webex component experiences. Does **not** fetch Webex cloud data directly — consumes injected adapters only.

## Stack

- JavaScript (JSX), React 18, PropTypes
- RxJS consumption via hooks (peer dependency)
- Jest + React Testing Library for tests
- SCSS co-located per component; aggregated via `src/styles/index.scss`

## Folder / Package Structure

```
src/components/
├── WebexMeeting/           # Full meeting shell
├── WebexMessaging/         # Messaging UI
├── WebexDataProvider/      # AdapterContext provider
├── hoc/                    # withAdapter, withMeeting
├── hooks/                  # useMeeting, usePerson, contexts
├── generic/                # Button, Modal, Title, …
├── icons/                  # SVG/icon components
├── inputs/                 # Form inputs
├── adaptive-cards/         # Adaptive card rendering
├── index.js                # Public export barrel
├── helpers.js              # className helpers
└── breakpoints.js          # Responsive breakpoints
```

## Key Files (source of truth)

| File | Holds |
|---|---|
| `src/components/index.js` | Public component and hook exports |
| `src/components/hoc/withAdapter.jsx` | Adapter connect/disconnect HOC |
| `src/components/WebexDataProvider/WebexDataProvider.jsx` | AdapterContext provider |
| `src/components/hooks/contexts.js` | AdapterContext, MeetingContext |
| `src/constants.js` | `WEBEX_COMPONENTS_CLASS_PREFIX`, ARIA label constants |
| `src/util.js` | Shared helpers used by components/adapters |

## Public Surface

| Contract ID | Type | Surface | Purpose | Compatibility | Schema / detail link | Root index |
|---|---|---|---|---|---|---|
| components.WebexMeeting | SDK export | `WebexMeeting` component | Default meeting UX | Semver beta | `src/components/WebexMeeting/WebexMeeting.jsx` | `ai-docs/CONTRACTS.md` |
| components.withAdapter | SDK export | HOC factory | Inject adapter + connect lifecycle | Semver | `src/components/hoc/withAdapter.jsx` | `ai-docs/CONTRACTS.md` |
| components.WebexDataProvider | SDK export | Context provider | Pass adapter to subtree | Semver | `src/components/WebexDataProvider/WebexDataProvider.jsx` | `ai-docs/CONTRACTS.md` |
| components.useMeetingDestination | SDK export | Hook | Resolve meeting destination | Semver | `src/components/hooks/useMeetingDestination.js` | `ai-docs/CONTRACTS.md` |

Full export list: `src/components/index.js`.

## Requires (dependencies)

- `@webex/component-adapter-interfaces` adapter instances on `AdapterContext` (activities, meetings, memberships, people, rooms adapters minimum per `WebexDataProvider.propTypes`)
- Peer: `react`, `react-dom`, `prop-types`, `rxjs`
- Internal: `src/adapters/` for Storybook/demo; production hosts use SDK adapters
- Styles from `src/styles/` imported at package entry

## Requirements

| ID | WHAT | WHY | Source Evidence | Test / Example Evidence | Assumptions / Gaps | Confidence |
|---|---|---|---|---|---|---|
| COMP-R-001 | Exported components MUST be listed in `src/components/index.js` | Defines npm public API | `src/components/index.js` | `package.json` exports via Rollup entry | none | PRESENT |
| COMP-R-002 | `withAdapter` MUST call `adapter.connect()` before wrapping with `WebexDataProvider` | Prevents hooks reading disconnected adapter | `src/components/hoc/withAdapter.jsx` | `src/components/hoc/withAdapter.test.jsx` | none | PRESENT |
| COMP-R-003 | `WebexDataProvider` MUST require adapter shape with five domain adapters | Matches adapter interface contract | `src/components/WebexDataProvider/WebexDataProvider.jsx` | `src/components/WebexDataProvider/WebexDataProvider.test.js` | organizations adapter optional in propTypes | PRESENT |
| COMP-R-004 | DOM class prefix MUST use `wxc` constant | Consistent theming/CSS | `src/constants.js` | `src/styles/_variables.scss` | none | PRESENT |
| COMP-R-005 | Exported component folders SHOULD follow co-located test and Storybook pattern | Regression safety for public API | `CONTRIBUTING.md` | `src/components/**/*.test.js`, `*.stories.js` | not every export has stories | PRESENT |
| COMP-R-006 | All exported symbols MUST match `src/components/index.js` barrel | npm public API contract | `src/components/index.js` | build/export tests | none | PRESENT |
| COMP-R-007 | Internal hooks under `hooks/` MUST subscribe/unsubscribe adapter observables safely | Prevents memory leaks on unmount | `src/components/hooks/useMeeting.js` | hook tests | none | PRESENT |
| COMP-R-008 | `WebexDataProvider` PropTypes require five domain adapters (activities, meetings, memberships, people, rooms) | Documents minimum adapter shape for context | `src/components/WebexDataProvider/WebexDataProvider.jsx` | WebexDataProvider.test.js | organizationsAdapter on WebexJSONAdapter but not in PropTypes — host/SDK may still supply | PRESENT |

## Design Overview

Components follow a **container/presentation** split where data arrives exclusively through adapter hooks. `withAdapter` owns adapter instantiation and async connect/disconnect; presentational components remain testable with mock adapters in JSON form.

Hooks encapsulate RxJS subscription lifecycle for meeting, person, room, and activity streams. Generic components (`Button`, `Modal`) provide shared UX primitives with Webex styling.

Supporting folders (`icons/`, `inputs/`, `generic/`, `adaptive-cards/`) implement internal UI pieces. Only `Button` and `Modal` from `generic/` are npm-exported; other support components are consumed internally (see Class / Component Relationships).

## Data Flow

```mermaid
flowchart TB
  HostProps[Host props / access token]
  Factory[adapterFactory in withAdapter]
  Adapter[WebexAdapter instance]
  Connect[adapter.connect]
  Provider[WebexDataProvider]
  Ctx[AdapterContext]
  Hook[useMeeting / usePerson / …]
  UI[Webex* component render]

  HostProps --> Factory
  Factory --> Adapter
  Adapter --> Connect
  Connect --> Provider
  Provider --> Ctx
  Ctx --> Hook
  Hook --> UI
  UI -->|control action| Adapter
```

Data flows one way from adapter observables into hooks, then into React render output. User actions invoke adapter control objects (defined in adapter module).

## Sequence Diagram(s)

Sequence coverage:

| Operation group | Diagram | Failure / recovery coverage |
|---|---|---|
| Adapter connect + meeting subscribe | below | `withAdapter` defers provider until connect completes |

```mermaid
sequenceDiagram
  participant Host
  participant WithAdapter
  participant Adapter
  participant Provider as WebexDataProvider
  participant Comp as WebexMeeting

  Host->>WithAdapter: render with props
  WithAdapter->>Adapter: adapterFactory(props)
  WithAdapter->>Adapter: connect()
  Adapter-->>WithAdapter: connected
  WithAdapter->>Provider: adapter
  Provider->>Comp: AdapterContext available
  Comp->>Adapter: subscribe meeting observables
  Adapter-->>Comp: meeting state updates
```

## Class / Component Relationships

```mermaid
classDiagram
  class withAdapter {
    +WrappedComponent
    +adapterFactory
  }
  class WebexDataProvider {
    +adapter
    +children
  }
  class WebexMeeting {
    +meetingID
    +layout
    +controls
  }
  class useMeeting {
    <<hook>>
  }
  withAdapter --> WebexDataProvider : wraps when connected
  WebexDataProvider --> WebexMeeting : provides context
  WebexMeeting --> useMeeting : reads state
```

Relationship: HOC → Provider → feature components → hooks → adapter interfaces (external package).

**Internal components (not in public barrel):**

| Component folder | Role | Used by |
|---|---|---|
| `WebexAdaptiveCard/` | Renders single adaptive card | `WebexAdaptiveCards` |
| `WebexAudioSettings/` | Audio device selection UI | `WebexSettings` |
| `WebexVideoSettings/` | Video device selection UI | `WebexSettings` |
| `WebexMeetingProvider/` | Provides meeting context | Meeting subtree |
| `WebexNoMedia/` | Placeholder when no media | Media components |

**Hooks catalog** (`src/components/hooks/` — only `useMeetingDestination` exported from package barrel):

| Hook | Purpose | Evidence |
|---|---|---|
| `useMeeting` | Subscribe to current meeting observables | `src/components/hooks/useMeeting.js` |
| `useMeetingControl` | Access meeting control instances | `src/components/hooks/useMeetingControl.js` |
| `useMeetingDestination` | Resolve meeting destination (exported) | `src/components/hooks/useMeetingDestination.js` |
| `usePerson` | Person data by ID | `src/components/hooks/usePerson.js` |
| `useMe` | Current user person data | `src/components/hooks/useMe.js` |
| `useRoom` | Room/space data | `src/components/hooks/useRoom.js` |
| `useMembers` | Membership roster | `src/components/hooks/useMembers.js` |
| `useActivity` | Single activity | `src/components/hooks/useActivity.js` |
| `useActivityStream` | Activity stream | `src/components/hooks/useActivityStream.js` |

Additional hooks: `useActivityScroll`, `useOverflowActivities`, `useAdaptiveCard`, `useOrganization`, `useStream`, `useSpeakers`, `useMetrics`, `useElementDimensions`, `useElementPosition`, `useAutoFocus`, `useRef` — see `src/components/hooks/index.js`.

Evidence: `src/components/` directory listing, import graph from `WebexMeeting.jsx`.

## Use Cases

| UC | Actor | Flow | Evidence |
|---|---|---|---|
| UC-1 Embed meeting | Host developer | Wrap route with `withAdapter(WebexMeeting, factory)` | `README.md`, stories |
| UC-2 Demo offline | Storybook author | Pass `WebexJSONAdapter` datasource | `.storybook/`, adapters module |
| UC-3 Custom controls | Host developer | Pass `controls` render prop to `WebexMeeting` | `src/components/WebexMeeting/WebexMeeting.jsx` |

## UI Flow

Primary meeting UI states driven by `MeetingState` from adapter interfaces:

1. Authentication / waiting (guest/host auth components)
2. Interstitial (pre-join)
3. In-meeting (media, controls, roster)
4. Settings modal overlay

Evidence: imports in `src/components/WebexMeeting/WebexMeeting.jsx`.

## State Model

| State layer | Owner | Transitions |
|---|---|---|
| Adapter observables | adapters module | Meeting join/leave, mute, roster — via control objects |
| React local state | components | Modal open, layout dimensions, UI-only toggles |
| AdapterContext | components | Set when `WebexDataProvider` mounts after connect |
| MeetingContext | components | Meeting-scoped subtree via `withMeeting` |

No Redux/global store — all domain state flows from adapter subscriptions.

Evidence: `src/components/hooks/contexts.js`, `src/components/hoc/withMeeting.jsx`, `src/adapters/MeetingsJSONAdapter.js`.

## Concurrency & Reactive Flow

Component hooks subscribe to RxJS observables from adapter methods. Subscriptions must clean up on unmount (handled in hook implementations). Multiple components may subscribe to the same meeting observable; adapter emits push updates.

Evidence: `src/components/hooks/useMeeting.js`, `src/adapters/MeetingsJSONAdapter.js`, `rxjs` peer dependency.

## State Machine

Meeting shell UI transitions follow adapter-reported `MeetingState` (from `@webex/component-adapter-interfaces`). `WebexMeeting` selects child components based on meeting status and auth requirements.

```mermaid
stateDiagram-v2
  [*] --> AuthOrWaiting: render WebexMeeting
  AuthOrWaiting --> Interstitial: authenticated / guest flow complete
  Interstitial --> InMeeting: join success
  InMeeting --> Interstitial: leave / end
  InMeeting --> SettingsOverlay: open settings
  SettingsOverlay --> InMeeting: close settings
```

Evidence: `src/components/WebexMeeting/WebexMeeting.jsx`, `@webex/component-adapter-interfaces` `MeetingState`.

## Pitfalls

- Importing components without CSS yields unstyled UI — load `dist/css/webex-components.css`.
- Assuming `organizationsAdapter` on provider when only five adapters validated in propTypes — verify host adapter shape.
- Snapshot tests sensitive to class names — coordinate with styles module when changing prefix.
- `withAdapter` renders without provider until connect completes — do not assume adapter context on first paint.

Evidence: `src/components/hoc/withAdapter.jsx`, `src/util.js`.

## Module Do's / Don'ts

- DO: one folder per component with `ComponentName.jsx` + co-located `.scss`, `.test.js`, `.stories.js`.
- DO: use `webexComponentClasses()` from `src/components/helpers.js` for BEM-style class names.
- DO: use responsive breakpoints from `src/components/breakpoints.js` (e.g. `PHONE_LARGE`).
- DON'T: fetch Webex cloud data directly from components — use adapter hooks only.
- DON'T: export internal support components without updating `src/components/index.js` and `CONTRACTS.md`.

Evidence: `CONTRIBUTING.md`, `src/components/helpers.js`.

## Export Stability

Public exports are semver-managed via semantic-release. Beta status documented in README — consumers should pin versions. Adding optional props is minor; removing exports or required props is major.

Evidence: `README.md` Project Status, `package.json` release scripts.

## Host Integration & Theming

Hosts MUST:

1. Install peer dependencies (`react`, `react-dom`, `rxjs`, `prop-types`).
2. Import compiled CSS from package `dist/css/webex-components.css`.
3. Provide adapter via `withAdapter` or manual `WebexDataProvider`.
4. For production Webex data, use SDK adapter from `@webex/sdk-component-adapter` (external repo) — not bundled here.

Evidence: `README.md`, `package.json` peerDependencies.

## Test-Case Strategy (module)

- Co-located Jest tests per component (`*.test.js`, `*.test.jsx`).
- Snapshot tests for stable DOM structure where established.
- Hook tests with mock adapter context.
- Storybook for visual states; Chromatic in CI.

| Behavior / Requirement | Existing test evidence | Gap |
|---|---|---|
| COMP-R-002 connect-before-provider | `src/components/hoc/withAdapter.test.jsx` | none |
| COMP-R-005 co-located tests | `src/components/**/*.test.js` | not all exports have stories |
| COMP-R-007 hook cleanup | hook tests under `src/components/hooks/` | none |

Evidence: `src/components/**/*.test.js`, `.circleci/config.yml`.

## Traceability

| Requirement | Code | Tests |
|---|---|---|
| COMP-R-001 | `src/components/index.js` | Rollup build smoke |
| COMP-R-002 | `src/components/hoc/withAdapter.jsx` | `src/components/hoc/withAdapter.test.jsx` |
| COMP-R-003 | `src/components/WebexDataProvider/WebexDataProvider.jsx` | `src/components/WebexDataProvider/WebexDataProvider.test.js` |
| COMP-R-004 | `src/constants.js` | style/component tests |
| COMP-R-005 | `src/components/` | `src/components/**/*.test.js` |
| COMP-R-006 | `src/components/index.js` | build |
| COMP-R-007 | `src/components/hooks/useMeeting.js` | hook tests |
| COMP-R-008 | `src/components/WebexDataProvider/WebexDataProvider.jsx` | WebexDataProvider.test.js |

- Repo architecture: [`ai-docs/ARCHITECTURE.md`](../../../ai-docs/ARCHITECTURE.md) · Registry: [`ai-docs/SPEC_INDEX.md`](../../../ai-docs/SPEC_INDEX.md)
- Coverage state & contracts baseline: `.sdd/manifest.json`
