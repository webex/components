import {useContext} from 'react';

export default function usePerson(personID) {
  const datasource = useContext();
  let person = {...datasource.peopleAdapter[personID]};

  if (!(personID in datasource.peopleAdapter)) {
    person = {
      displayName: ' ',
    };
  }

  return person;
}
