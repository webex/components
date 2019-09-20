export default function useActivity(activityID, adapter) {
  if (!(activityID in adapter.datasource)) {
    throw new Error(`Could not find activity with ID "${activityID}"`);
  }

  return adapter.datasource[activityID];
}
