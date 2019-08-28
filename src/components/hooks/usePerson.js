import {useState, useEffect} from 'react';

/**
 * Custom hook that returns person data of the given ID.
 *
 * @param {string} personID  ID of the person for which to return data.
 * @param {PeopleAdapter} adapter  Component data adapter from which to retrieve data.
 * @returns {Person} Data of the person
 */
export default function usePerson(personID, adapter) {
  const [person, setPerson] = useState(undefined);

  useEffect(() => {
    // eslint-disable-next-line no-console
    const onError = (error) => console.error(error.message);
    const subscription = adapter.getPerson(personID).subscribe(setPerson, onError);

    return () => {
      subscription.unsubscribe();
    };
  }, [person]);

  return person;
}
