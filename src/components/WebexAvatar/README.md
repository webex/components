# Webex Avatar Component
Webex avatar component displays the avatar and status of a _Webex Teams_ user.

<p align="center">
  <img src="./WebexAvatar.png" alt="Default Webex Avatar" />
</p>

## Preview
To see all the different possible states of the Webex Avatar component, you can run our Storybook:
```shell
  npm start
```

## Embed
1. Create a component adapter from which the data will be retrieved (See [adapters](../../adapters)). For instance:

    ```js
      const jsonAdapter = new PeopleJSONAdapter();
    ```
2. Create a component instance by passing the person ID as a string and the [component data adapter](../../adapters/PeopleAdapter.js) that we created previously

    ```js
      <WebexAvatar personID="personID" adapter={jsonAdapter} />
    ```

The component knows how to manage its data. If anything changes in the data source that the adapter manages, the component will also update on its own.
