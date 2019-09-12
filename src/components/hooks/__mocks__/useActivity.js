export default function useActivity(activityID, adapter) {
  const IDs = Object.keys(adapter.datasource);
  let activity = null;

  if (IDs.includes(activityID)) {
    activity = adapter.datasource[activityID];
  } else {
    throw new Error(`Could not find activity with ID "${activityID}"`);
  }

  return activity;
}
