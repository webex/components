import {useEffect, useContext, useState} from 'react';

import {AdapterContext} from './contexts';

/**
 * A Webex user.
 *
 * @external Person
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/PeopleAdapter.js#L6}
 */

/**
 * Custom hook that returns a list of member IDs given a membership ID.
 *
 * @param {string} membershipID  ID of the room/meeting that contains the memberships
 * @returns {Array.<Person>} List of the person IDs from the participants
 */
export default function useMemberships(membershipID) {
  const [members, setMembers] = useState([]);
  const {membershipsAdapter} = useContext(AdapterContext);

  useEffect(() => {
    const onError = (error) => {
      setMembers([]);

      // eslint-disable-next-line no-console
      console.error(error.message);
    };
    const onMembers = (data) => {
      setMembers([...data.members]);
    };

    const subscription = membershipsAdapter.getMembers(membershipID).subscribe(onMembers, onError);

    return () => {
      subscription.unsubscribe();
    };
  }, [membershipsAdapter, membershipID]);

  return members;
}
