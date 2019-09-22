import {useContext, useEffect, useReducer} from 'react';

import {AdapterContext} from '../../components/';

const APPEND_ACTIVITIES = 'append_activities';

/**
 * Returns a new array of activityIDs based on the given action.
 * If no action is passed, it will return the same activityIDs
 * array without any changes.
 *
 * @param {Array.<string>} activityIDs activityIDs associated to the room
 * @param {object} action action to apply to given activityIDs
 * @returns {Array.<string>} New activityIDs associated to the room
 */
function reducer(activityIDs, action) {
  let newActivityIDs = [];

  switch (action.type) {
    case APPEND_ACTIVITIES:
      newActivityIDs = activityIDs.concat(action.payload);
      break;
    default:
      newActivityIDs = activityIDs;
      break;
  }

  return newActivityIDs;
}

/**
 * Custom hook that returns activity data associated to the room of the given ID.
 *
 * @param {string} roomID  ID of the room for which to return data.
 * @returns {Room} Activity ID associated to the room
 */
export default function useActivityStream(roomID) {
  const [activityIDs, dispatch] = useReducer(reducer, []);
  const {roomsAdapter} = useContext(AdapterContext);

  useEffect(() => {
    const subscription = roomsAdapter.getRoomActivities(roomID).subscribe((activities) => {
      dispatch({type: APPEND_ACTIVITIES, payload: activities});
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activityIDs;
}
