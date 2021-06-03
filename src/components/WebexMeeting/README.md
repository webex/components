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

2. Create a component instance by passing the meeting ID as a string. You then need to enclose it
within [a data provider](../WebexDataProvider/WebexDataProvider.js) that takes
the [component data adapter](../../adapters/WebexJSONAdapter.js) that we created previously

    ```js
    <WebexDataProvider adapter={jsonAdapter}>
      <WebexMeeting meetingID="meetingID"/>
    </WebexDataProvider>
    ```

The component knows how to manage its data. If anything changes in the data source that the adapter manages,
the component will also update on its own.
