import {useEffect, useContext, useState} from 'react';
import {concatMap} from 'rxjs/operators';

import {AdapterContext} from './contexts';

/**
 * Custom hook that returns meeting data of a newly created meeting
 * at the given meeting destination.
 *
 * @param {string} meetingDestination  Virtual location where the meeting should take place.
 * @returns {Meeting} Data of the meeting
 */
export default function useMeetingDestination(meetingDestination) {
  const emptyMeeting = {
    ID: null,
    title: null,
    localAudio: null,
    localVideo: null,
    remoteAudio: null,
    remoteVideo: null,
  };

  const [meeting, setMeeting] = useState(emptyMeeting);
  const [createNewMeeting, setCreateNewMeeting] = useState(false);
  const {meetingsAdapter} = useContext(AdapterContext);

  useEffect(() => {
    // React won't recognize the meeting attributes have been updated
    // since the state is the meeting object itself. We need to create a new
    // meeting object trigger the state change
    const onMeeting = (newMeeting) => {
      setMeeting({...newMeeting});
    };
    const onError = (error) => {
      throw error;
    };
    const onComplete = () => {
      setCreateNewMeeting(!createNewMeeting);
      setMeeting(emptyMeeting);
    };

    const subscription = meetingsAdapter
      .createMeeting(meetingDestination)
      .pipe(concatMap(({ID}) => meetingsAdapter.getMeeting(ID)))
      .subscribe(onMeeting, onError, onComplete);

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingDestination, createNewMeeting]);

  return meeting;
}
