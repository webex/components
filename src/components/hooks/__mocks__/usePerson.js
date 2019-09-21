import {useContext} from 'react';

export default function usePerson(personID) {
  const datasource = useContext();

  if (!(personID in datasource.peopleAdapter)) {
    throw new Error(`Could not find person with ID "${personID}"`);
  }

  return datasource.peopleAdapter[personID];
}
