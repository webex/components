import {useContext} from 'react';

export default function useRoom(roomID) {
  const datasource = useContext();

  if (!(roomID in datasource.roomsAdapter)) {
    throw new Error(`Could not find room with ID "${roomID}"`);
  }

  return datasource.roomsAdapter[roomID];
}
