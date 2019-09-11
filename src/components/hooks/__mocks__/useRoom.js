export default function useRoom(ID, adapter) {
  const [roomID] = Object.keys(adapter.datasource);
  const rooms = adapter.datasource;
  let room = null;

  if (ID === roomID) {
    room = rooms[ID];
  } else {
    throw new Error(`Could not find room with ID "${ID}"`);
  }

  return room;
}
