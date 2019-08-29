export default function useActivity(ID, adapter) {
  const [activityID] = Object.keys(adapter.datasource);
  let activity = null;

  if (ID === activityID) {
    activity = adapter.datasource[ID];
  } else {
    throw new Error(`Could not find activity with ID "${ID}"`);
  }

  return activity;
}
