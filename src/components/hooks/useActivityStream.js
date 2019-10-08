import {useContext, useEffect, useReducer} from 'react';

import {AdapterContext} from '../../components/';

export const PREPEND_ACTIVITIES = 'prepend_activities';
export const APPEND_ACTIVITIES = 'append_activities';

/**
 * Returns a new array of activities based on the given action.
 * If no action is passed, it will return the same activities
 * array without any changes.
 *
 * @param {Array.<string|ActivityDate>} activities activities associated to the room
 * @param {object} action action to apply to given activities
 * @returns {Array.<string|ActivityDate>}
 */
function reducer(activities, action) {
  let newActivities = [];

  switch (action.type) {
    case PREPEND_ACTIVITIES:
      newActivities = action.payload.reverse().concat(activities);
      break;
    case APPEND_ACTIVITIES:
      newActivities = activities.concat(action.payload);
      break;
    default:
      newActivities = activities;
      break;
  }

  return newActivities;
}

/**
 * Custom hook that returns activity data associated to the room of the given ID.
 *
 * @param {string} roomID  ID of the room for which to return data.
 * @returns {Array} Activities state and state setter
 */
export default function useActivityStream(roomID) {
  const {roomsAdapter} = useContext(AdapterContext);
  const [activities, dispatch] = useReducer(reducer, []);

  // Subscribe to future updates on load
  useEffect(() => {
    const activityUpdates = roomsAdapter.getRoomActivities(roomID).subscribe((activityData) => {
      dispatch({type: APPEND_ACTIVITIES, payload: activityData});
    });

    return () => {
      activityUpdates.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [activities, dispatch];
}
