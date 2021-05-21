# Webex Settings Component

Webex Settings component allows the user to choose which camera and microphone to use during the meeting.

<p align="center">
  <img src="./WebexSettings.png" alt="Default Webex Settings" />
</p>

## Preview

To see all the different possible states of the Webex Settings component,
you can view our [storybook](https://webex.github.io/components/?path=/story/meetings-webex-settings--settings)
or run the following **NPM** command:

```shell
  npm start
```

## Embed

1. Create a component adapter from which the data will be retrieved (See [adapters](../../adapters)). For instance:

    ```js
    const jsonAdapter = new WebexJSONAdapter(jsonData);
    ```

2. Create a component instance by passing the meetingID as a string and
enclose it within [a data provider](../WebexDataProvider/WebexDataProvider.js)
that takes the [component data adapter](../../adapters/WebexJSONAdapter.js) that we created previously.

    ```js
    <WebexDataProvider adapter={jsonAdapter}>
        <WebexSettings meetingID="meetingID"/>
    </WebexDataProvider>
    ```

The component knows how to manage its data. If anything changes in the data source that the adapter manages, the component will also update on its own.
