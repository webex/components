import {useContext, useState, useEffect} from 'react';

import {AdapterContext} from '../../components/';

/**
 * Custom hook that returns activity data of the given ID.
 *
 * @param {string} activityID  ID of the activity for which to return data.
 * @returns {Person} Data of the activity
 */
export default function useActivity(activityID) {
  const [activity, setActivity] = useState({});
  const {activitiesAdapter} = useContext(AdapterContext);

  useEffect(() => {
    const onError = (error) => {
      throw error;
    };
    const subscription = activitiesAdapter.getActivity(activityID).subscribe(setActivity, onError);

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activity;
}
