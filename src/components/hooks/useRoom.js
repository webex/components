import {useEffect, useContext, useState} from 'react';

import {AdapterContext} from '../../components/';

/**
 * Custom hook that returns room data of the given ID.
 *
 * @param {string} roomID  ID of the room for which to return data.
 * @returns {Room} Data of the room
 */
export default function useRoom(roomID) {
  const [room, setRoom] = useState({});
  const {roomsAdapter} = useContext(AdapterContext);

  useEffect(() => {
    const onError = (error) => {
      throw error;
    };
    const subscription = roomsAdapter.getRoom(roomID).subscribe(setRoom, onError);

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return room;
}
