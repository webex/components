import {useContext, useState, useEffect} from 'react';

import {AdapterContext} from './contexts';

// TODO: Figure out how to import JS Doc definitions and remove duplication.
/**
 * An activity a person performs in Webex.
 *
 * @external Activity
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/ActivitiesAdapter.js#L6}
 */

/**
 * Custom hook that returns activity data of the given ID.
 *
 * @param {string} activityID  ID of the activity for which to return data.
 * @returns {Activity} Data of the activity
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
