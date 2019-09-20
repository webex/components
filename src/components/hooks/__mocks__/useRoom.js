export default function useRoom(roomID, adapter) {
  if (!(roomID in adapter.datasource)) {
    throw new Error(`Could not find room with ID "${roomID}"`);
  }

  return adapter.datasource[roomID];
}
