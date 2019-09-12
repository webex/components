export default function useRoom(roomID, adapter) {
  const rooms = adapter.datasource;
  const IDs = Object.keys(rooms);
  let room = null;

  if (IDs.includes(roomID)) {
    room = rooms[roomID];
  } else {
    throw new Error(`Could not find room with ID "${roomID}"`);
  }

  return room;
}
