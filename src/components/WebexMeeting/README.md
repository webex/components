# Webex Meeting Component

Webex Meeting component displays the [Webex In Meeting](../WebexInMeeting) component or the
[Webex Interstitial Meeting](../WebexInterstitialMeeting) component depending on the state of the meeting.

<p align="center">
  <img src="./WebexMeeting.gif" alt="Default Webex Meeting" />
</p>

## Preview

To see all the different possible states of the Webex Meeting component,
you can view our [storybook](https://webex.github.io/components/storybook/storybook/?path=/story/webex-meeting--in-session)
or run the following **NPM** command:

```shell
  npm start
```

## Embed

1. Create a component adapter from which the data will be retrieved (See [adapters](../../adapters)). For instance:

    ```js
    const jsonAdapter = new WebexJSONAdapter(jsonData);
    ```

2. Create a component instance by passing the meeting ID as a string, an optional function to specify a custom list of controls for a meeting and an optional range to specify which controls can be collapsed if not enough space is available.
The controls function receives a boolean parameter which is true when the meeting is active. It should return an array of control names (strings) corresponding to the current state of the meeting (inactive or active). The default control names `['mute-audio', 'mute-video', 'settings', 'join-meeting']` if the meeting is inactive and `['mute-audio', 'mute-video', 'share-screen', 'member-roster', 'settings', 'leave-meeting']`otherwise.
Ensure that the control names match with the adapter implementation of the controls.
The `controlsCollapseRangeStart` is a zero-based index of the first collapsible control (can be negative).
The `controlsCollapseRangeEnd` is a zero-based index before the last collapsible control (can be negative). Negative numbers are counted from the end of the controls array. For example, if the `controlsCollapseRangeEnd` is -2, the last 2 controls won't collapse. You then need to enclose it within [a data provider](../WebexDataProvider/WebexDataProvider.js) that takes the [component data adapter](../../adapters/WebexJSONAdapter.js) that we created previously

    ```js
    const controls = (isActive) => isActive
      ? ['mute-audio', 'mute-video', 'share-screen', 'member-roster', 'settings', 'leave-meeting']
      : ['mute-audio', 'mute-video', 'settings', 'join-meeting'];

    <WebexDataProvider adapter={jsonAdapter}>
      <WebexMeeting 
        meetingID="meetingID"
        controls={controls}
        controlsCollapseRangeStart={0}
        controlsCollapseRangeEnd={-1}
      />
    </WebexDataProvider>
    ```
or, alternatively it can be used withAdapter HOC

    ```js
    const controls = (isActive) => isActive
      ? ['mute-audio', 'mute-video', 'share-screen', 'member-roster', 'settings', 'leave-meeting']
      : ['mute-audio', 'mute-video', 'settings', 'join-meeting'];

    const MeetingWithAdapter = withAdapter(WebexMeeting, (props) => {
      return new WebexJSONAdapter(data); // or other adapter
    });

    <MeetingWithAdapter 
      meetingID="meetingID"
      controls={controls}
      controlsCollapseRangeStart={0}
      controlsCollapseRangeEnd={-1}
    />
    ```

The component knows how to manage its data. If anything changes in the data source that the adapter manages,
the component will also update on its own.
