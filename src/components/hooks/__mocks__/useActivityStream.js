export default function useActivityStream(ID, adapter) {
  const [roomID] = Object.keys(adapter.datasource);
  const rooms = adapter.datasource;

  return ID === roomID ? rooms[`${ID}-activities`] : [];
}
