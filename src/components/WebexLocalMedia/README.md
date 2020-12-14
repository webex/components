# Webex Local Media Component

Webex local media component displays the user local stream, if enabled. If user's local media is disabled the avatar of the current _Webex_ user is displayed.

<p align="center">
  <img src="./WebexLocalMedia.png" alt="Default Webex Local Media" />
</p>

## Preview

To see all the different possible states of the Webex Local Media component,
you can view our [storybook](https://webex.github.io/components/storybook/?path=/story/webex-local-media--enabled)
or run the following **NPM** command:

```shell
  npm start
```

## Embed

1. Create a component adapter from which the data will be retrieved (See [adapters](../../adapters)). For instance:

    ```js
    const jsonAdapter = new WebexJSONAdapter(jsonData);
    ```

2. Create a component instance by passing the person ID as a string and enclose it within
[a data provider](../WebexDataProvider/WebexDataProvider.js) that takes
the [component data adapter](../../adapters/WebexJSONAdapter.js) that we created previously

    ```js
    <WebexDataProvider adapter={jsonAdapter}>
      <WebexLocalMedia meetingID="meetingID" />
    </WebexDataProvider>
    ```

The component knows how to manage its data. If anything changes in the data source that the adapter manages,
the component will also update on its own.
