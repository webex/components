import {useEffect, useContext, useState} from 'react';

import {AdapterContext} from '../../components/';

/**
 * Custom hook that returns a list of participant IDs given a membership ID.
 *
 * @param {string} membershipID  ID of the room/meeting that contains the participants
 * @returns {Array.<Person>} List of the person IDs from the participants
 */
export default function useParticipants(membershipID) {
  const [participants, setParticipants] = useState([]);
  const {membershipsAdapter} = useContext(AdapterContext);

  useEffect(() => {
    const onError = (error) => {
      setParticipants([]);

      // eslint-disable-next-line no-console
      console.error(error.message);
    };
    const onMembers = (data) => {
      setParticipants(data.members);
    };

    const subscription = membershipsAdapter.getMembers(membershipID).subscribe(onMembers, onError);

    return () => {
      subscription.unsubscribe();
    };
  }, [membershipsAdapter, membershipID]);

  return participants;
}
