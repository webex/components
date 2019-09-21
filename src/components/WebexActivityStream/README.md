# Webex Activity Stream Component

Webex activity stream component displays a list of activities of a room.

<p align="center">
  <span>picture coming up</span>
</p>

## Preview

To see all the different possible states of the Webex Activity Stream component, you can run our Storybook:

```shell
  npm start
```

## Embed

1. Create a component adapter from which the data will be retrieved (See [adapters](../../adapters)). For instance:

   ```js
   const jsonAdapter = new WebexJSONAdapter(jsonData);
   ```

2. Create a component instance by passing the room ID as a string and the [component data adapter](../../adapters/RoomsAdapter.js) that we created previously

   ```js
   <WebexDataProvider adapter={jsonAdapter}>
     <WebexActivityStream roomID="roomID" />
   </WebexDataProvider>
   ```

The component knows how to manage its data. If anything changes in the data source that the adapter manages, the component will also update on its own.
