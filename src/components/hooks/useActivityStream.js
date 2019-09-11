import {useState, useEffect} from 'react';
import {merge} from 'rxjs';

/**
 * Custom hook that returns activity data associated to the room of the given ID.
 *
 * @param {string} roomID  ID of the room for which to return data.
 * @param {obj} roomsAdapter  Component data adapter from which to retrieve data.
 * @returns {Room} Activity ID associated to the room
 */
export default function useActivityStream(roomID, roomsAdapter) {
  const [activityIDs, setActivityIDs] = useState([]);

  useEffect(() => {
    const activityStream = merge(
      roomsAdapter.getPreviousRoomActivities(roomID),
      roomsAdapter.getRoomActivities(roomID)
    );
    const subscription = activityStream.subscribe(setActivityIDs);

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activityIDs;
}
