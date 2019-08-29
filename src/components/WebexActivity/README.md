# Webex Activity Component

Webex activity component displays the activity content.

<p align="center">
  <img src="./WebexActivity.png" alt="Default Webex Activity" />
</p>

## Preview

To see all the different possible states of the Webex Activity component, you can run our Storybook:

```shell
  npm start
```

## Embed

1. Create a component adapters object from which the data will be retrieved (See [adapters](../../adapters)). For instance:

   ```js
   const jsonAdapters = {
     peopleJSONAdapter: new PeopleJSONAdapter(people),
     activitiesJSONAdapter: new ActivitiesJSONAdapter(activities),
   };
   ```

2. Create a component instance by passing the activity ID as a string and the component data adapters which contains [PeopleAdapter](../../adapters/PeopleAdapter.js) and [ActivitiesAdapter](../../adapters/ActivitiesAdapter.js) that we created previously

   ```js
   <WebexActivities activityID="activityID" adapters={jsonAdapters} />
   ```

The component knows how to manage its data. If anything changes in the data source that the adapter manages, the component will also update on its own.
