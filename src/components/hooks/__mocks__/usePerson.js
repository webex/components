import people from '../../../data/people';

// eslint-disable-next-line no-unused-vars
export default function usePerson(ID, adapter) {
  const [personID] = Object.keys(people);
  let person = null;

  if (ID === personID) {
    person = people[ID];
  } else {
    // eslint-disable-next-line no-console
    console.error(`Could not find person with ID "${ID}"`);
  }

  return person;
}
