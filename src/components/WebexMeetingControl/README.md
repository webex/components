# Webex Meeting Control Component

Webex Meeting Control component displays a button that allows for control over a meeting by performing a specific action.

<p align="center">
  <img src="./WebexMeetingControl.png" alt="Default Webex Meeting Control" />
</p>

## Preview

To see all the different possible states of the Webex Meeting Control component,
you can view our [storybook](https://webex.github.io/components/?path=/story/webex-meeting-control--text)
or run the following **NPM** command:

```shell
  npm start
```

## Embed

1. Create a component adapter from which the data will be retrieved (See [adapters](../../adapters)). For instance:

    ```js
    const jsonAdapter = new WebexJSONAdapter(jsonData);
    ```

2. Create a component instance by passing the control _type_ as a string and the meetingID as a string and 
enclose it within [a data provider](../WebexDataProvider/WebexDataProvider.js)
that takes the [component data adapter](../../adapters/WebexJSONAdapter.js) that we created previously.

    ```js
    <WebexDataProvider adapter={jsonAdapter}>
        <WebexMeetingControl type="mute-audio" meetingID="meetingID"/>
    </WebexDataProvider>
    ```

The component knows how to manage its data. If anything changes in the data source that the adapter manages, the component will also update on its own.
