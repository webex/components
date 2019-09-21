import {useContext} from 'react';

export default function useActivity(activityID) {
  const datasource = useContext();

  if (!(activityID in datasource.activitiesAdapter)) {
    throw new Error(`Could not find activity with ID "${activityID}"`);
  }

  return datasource.activitiesAdapter[activityID];
}
