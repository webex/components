import {useState, useEffect} from 'react';

/**
 * Custom hook that returns activity data of the given ID.
 *
 * @param {string} activityID  ID of the activity for which to return data.
 * @param {obj} activitiesAdapter  Component data adapter from which to retrieve data.
 * @returns {Person} Data of the activity
 */
export default function useActivity(activityID, activitiesAdapter) {
  const [activity, setActivity] = useState({});

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
