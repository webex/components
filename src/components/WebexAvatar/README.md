# Webex Avatar Component

Webex avatar component displays the avatar and status of a _Webex_ user.

<p align="center">
  <img src="./WebexAvatar.png" alt="Default Webex Avatar" />
</p>

## Preview

To see all the different possible states of the Webex Avatar component,
you can view our [storybook](https://webex.github.io/components/storybook/?path=/story/webex-avatar--default)
or run the following **NPM** command:

```shell
  npm start
```

## Embed

1. Create a component adapter from which the data will be retrieved (See [adapters](../../adapters)). For instance:

    ```js
    const jsonAdapter = new WebexJSONAdapter(jsonData);
    ```

2. Create a component instance by passing the person ID as a string and
enclose it within [a data provider](../WebexDataProvider/WebexDataProvider.js)
that takes the [component data adapter](../../adapters/WebexJSONAdapter.js) that we created previously

    ```js
    <WebexDataProvider adapter={jsonAdapter}>
      <WebexAvatar personID="personID" />
    </WebexDataProvider>
    ```

The component knows how to manage its data. If anything changes in the data source that the adapter manages, the component will also update on its own.
