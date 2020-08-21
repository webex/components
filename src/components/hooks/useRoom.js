import {useEffect, useContext, useState} from 'react';

import {AdapterContext} from './contexts';
/**
 * A virtual space where people can collaborate in Webex.
 *
 * @external Room
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/RoomsAdapter.js#L7}
 */

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
