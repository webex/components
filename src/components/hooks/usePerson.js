import {useEffect, useContext, useState} from 'react';
import {PersonStatus} from '@webex/component-adapter-interfaces';

import {AdapterContext} from './contexts';

/**
 * A Webex user.
 *
 * @external Person
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/PeopleAdapter.js#L6}
 */

/**
 * Custom hook that returns person data of the given ID.
 *
 * @param {string} id  ID of the person for which to return data.
 * @returns {Person} Data of the person
 */
export default function usePerson(id) {
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
    const onPerson = (data) => {
      const newPerson = {...data};

      // Convert the keys back to their corresponding
      // values, if the status is key based
      if (Object.keys(PersonStatus).includes(newPerson.status)) {
        newPerson.status = PersonStatus[newPerson.status];
      }

      setPerson(newPerson);
    };

    const subscription = peopleAdapter.getPerson(id).subscribe(onPerson, onError);

    return () => {
      subscription.unsubscribe();
    };
  }, [peopleAdapter, id]);

  return person;
}
