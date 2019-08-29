export default function usePerson(ID, adapter) {
  const [personID] = Object.keys(adapter.datasource);
  const people = adapter.datasource;
  let person = null;

  if (ID === personID) {
    person = people[ID];
  } else {
    throw new Error(`Could not find person with ID "${ID}"`);
  }

  return person;
}
