import {useEffect, useContext, useState} from 'react';

import {AdapterContext} from './contexts';

/**
 * A Webex user.
 *
 * @external Person
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/PeopleAdapter.js#L6}
 */
// TODO: Figure out how to import JS Doc definitions and remove duplication.
/**
 * Enum for types of destinations.
 *
 * @external DestinationType
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MembershipsAdapter.js#L21}
 */

/**
 * Custom hook that returns a list of member IDs given a membership ID.
 *
 * @param {string} destinationID  ID of the room/meeting that contains the memberships
 * @param {DestinationType} destinationType Type of destination of the membership
 * @returns {Array.<Person>} List of the person IDs from the participants
 */
export default function useMembers(destinationID, destinationType) {
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

    const subscription = membershipsAdapter
      .getMembersFromDestination(destinationID, destinationType)
      .subscribe(onMembers, onError);

    return () => {
      subscription.unsubscribe();
    };
  }, [membershipsAdapter, destinationID, destinationType]);

  return members;
}
