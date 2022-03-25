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
  const [activity, setActivity] = useState({cards: []});
  const adapter = useContext(AdapterContext);
  const activitiesAdapter = adapter && adapter.activitiesAdapter;

  useEffect(() => {
    let cleanup;

    if (!activitiesAdapter || !activityID) {
      setActivity({cards: []});
      cleanup = undefined;
    } else {
      const onError = (error) => {
        throw error;
      };
      const subscription = activitiesAdapter
        .getActivity(activityID).subscribe(setActivity, onError);

      cleanup = () => {
        subscription.unsubscribe();
      };
    }

    return cleanup;
  }, [activitiesAdapter, activityID]);

  return activity;
}
