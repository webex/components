import {useEffect, useContext, useState} from 'react';

import {AdapterContext} from '../../components/';

/**
 * Custom hook that returns meeting data of the given ID.
 *
 * @param {string} meetingID  ID of the meeting for which to get data
 * @returns {Meeting} Data of the meeting
 */
export default function useMeeting(meetingID) {
  const emptyMeeting = {
    ID: null,
    title: null,
    localAudio: null,
    localVideo: null,
    remoteAudio: null,
    remoteVideo: null,
    remoteShare: null,
    error: null,
  };

  const [meeting, setMeeting] = useState(emptyMeeting);
  const {meetingsAdapter} = useContext(AdapterContext);

  useEffect(() => {
    // React won't recognize the meeting attributes have been updated
    // since the state is the meeting object itself. We need to create a new
    // meeting object trigger the state change
    const onMeeting = (newMeeting) => {
      setMeeting({...newMeeting});
    };
    const onError = (error) => {
      setMeeting({
        ...emptyMeeting,
        error,
      });

      throw error;
    };
    const onComplete = () => {
      setMeeting(emptyMeeting);
    };

    const subscription = meetingsAdapter.getMeeting(meetingID).subscribe(onMeeting, onError, onComplete);

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingID]);

  return meeting;
}
