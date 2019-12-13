import {useEffect, useContext, useState} from 'react';

import {AdapterContext} from '../../components/';

/**
 * Custom hook that returns person data of the current user.
 *
 * @returns {Person} Data of the person
 */
export default function useMe() {
  const [person, setPerson] = useState({});
  const {peopleAdapter} = useContext(AdapterContext);

  useEffect(() => {
    const onError = (error) => {
      // eslint-disable-next-line no-console
      console.error(error.message);
    };
    const subscription = peopleAdapter.getMe().subscribe(setPerson, onError);

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return person;
}
