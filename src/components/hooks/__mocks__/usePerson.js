export default function usePerson(personID, adapter) {
  if (!(personID in adapter.datasource)) {
    throw new Error(`Could not find person with ID "${personID}"`);
  }

  return adapter.datasource[personID];
}
