import {useEffect, useContext, useState} from 'react';

import {AdapterContext} from '../../components/';

/**
 * Custom hook that returns person data of the given ID.
 *
 * @param {string} personID  ID of the person for which to return data.
 * @returns {Person} Data of the person
 */
export default function usePerson(personID) {
  const [person, setPerson] = useState({});
  const {peopleAdapter} = useContext(AdapterContext);

  useEffect(() => {
    const onError = (error) => {
      setPerson({
        displayName: ' ',
      });

      // eslint-disable-next-line no-console
      console.error(error.message);
    };
    const subscription = peopleAdapter.getPerson(personID).subscribe(setPerson, onError);

    return () => {
      subscription.unsubscribe();
    };
  }, [peopleAdapter, personID]);

  return person;
}
