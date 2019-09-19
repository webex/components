export default function useActivityStream(ID, adapter) {
  return `${ID}-activities` in adapter.datasource ? adapter.datasource[`${ID}-activities`] : [];
}
