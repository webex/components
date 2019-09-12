export default function usePerson(personID, adapter) {
  const people = adapter.datasource;
  const IDs = Object.keys(people);
  let person = null;

  if (IDs.includes(personID)) {
    person = people[personID];
  } else {
    throw new Error(`Could not find person with ID "${personID}"`);
  }

  return person;
}
