import {useEffect, useContext, useState} from 'react';

import {AdapterContext} from '../../components/';

/**
 * Custom hook that returns meeting data of the given ID.
 *
 * @param {string} meetingID  ID of the meeting for which to return data.
 * @returns {Meeting} Data of the meeting
 */
export default function useMeeting(meetingID) {
  const [meeting, setMeeting] = useState({});
  const {meetingsAdapter} = useContext(AdapterContext);

  useEffect(() => {
    const onError = (error) => {
      throw error;
    };
    const subscription = meetingsAdapter.getMeeting(meetingID).subscribe(setMeeting, onError);

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return meeting;
}
