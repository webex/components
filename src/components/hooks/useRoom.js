import {useState, useEffect} from 'react';

/**
 * Custom hook that returns room data of the given ID.
 *
 * @param {string} roomID  ID of the room for which to return data.
 * @param {obj} roomsAdapter  Component data adapter from which to retrieve data.
 * @returns {Room} Data of the room
 */
export default function useRoom(roomID, roomsAdapter) {
  const [room, setRoom] = useState({});

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
