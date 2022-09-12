# Webex Create Space Component

Webex Create Space component creates a new room with the list of added people.

## Preview

To see the create space component,
you can view our [storybook](https://webex.github.io/components/storybook/?path=/story/platform-webex-create-space--create-space)

or run the following **NPM** command for local setup:

```shell
  npm start
```

## Embed

1. Create a component adapter from which the data will be retrieved (See [adapters](../../adapters)). For instance:

    ```js
    const jsonAdapter = new WebexJSONAdapter(jsonData);
    ```

2. Create a component instance and enclose it within [a data provider](../WebexDataProvider/WebexDataProvider.js)
that takes the [component data adapter](../../adapters/WebexJSONAdapter.js) that we created previously

  The following can be passed as props from the integration app to the create space component:
  - `spaceName` default space name when the component is loaded. It can be edited later in the create space form.
  - `createSpace` a boolean value to define the component to call the create room api or to return the added people list to the integration so that intergation can call create room apis.
  - `createSpaceResponse` a callback function to return data to the integration
  - `webexLookAhead` a boolean value to define whether the component will search for people inside webex contacts or not.
  - `memberLookAhead` a callback function in which the component will pass the search string so that the integration 
  can search the person in their contacts and if returned they will be added as a collaborators.
  - `className`  an external css class
  - `style` external style object

    ```js   
    <WebexDataProvider adapter={jsonAdapter}>
      <WebexCreateSpace
        spaceName="space-name" 
        createSpace={true}
        webexLookAhead={true}
      />
    </WebexDataProvider>
    ```

The component knows how to manage its data. If anything changes in the data source that the adapter manages, the component will also update on its own.
