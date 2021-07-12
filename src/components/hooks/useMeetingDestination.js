import {useEffect, useContext, useState} from 'react';
import {concat} from 'rxjs';
import {last, concatMap} from 'rxjs/operators';

import {AdapterContext} from './contexts';

const emptyMeeting = {
  title: null,
  localAudio: null,
  localVideo: null,
  remoteAudio: null,
  remoteVideo: null,
  state: null,
};

// TODO: Figure out how to import JS Doc definitions and remove duplication.
/**
 * A video conference in Webex over WebRTC.
 *
 * @external Meeting
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MeetingsAdapter.js#L20}
 * @see {@link https://webrtc.org}
 */

/**
 * Custom hook that returns meeting data of a newly created meeting
 * at the given meeting destination.
 *
 * @param {string} meetingDestination  Virtual location where the meeting should take place.
 * @returns {Meeting} Data of the meeting
 */
export default function useMeetingDestination(meetingDestination) {
  const [meeting, setMeeting] = useState(emptyMeeting);
  const adapter = useContext(AdapterContext);
  const meetingsAdapter = adapter && adapter.meetingsAdapter;

  useEffect(() => {
    let cleanup;
    let lastMeeting;

    if (!meetingDestination || !meetingsAdapter) {
      setMeeting({...emptyMeeting});
      cleanup = undefined;
    } else {
      const onMeeting = (newMeeting) => {
        // React won't recognize the meeting attributes have been updated
        // since the state is the meeting object itself
        // We need to create a new meeting object trigger the state change
        setMeeting({...newMeeting});
        lastMeeting = newMeeting;
      };
      const onError = (error) => {
        setMeeting({...emptyMeeting, error});
        // eslint-disable-next-line no-console
        console.log(error);
      };

      const createMeeting$ = meetingsAdapter.createMeeting(meetingDestination);
      const getMeeting$ = createMeeting$.pipe(
        last(),
        concatMap(({ID}) => meetingsAdapter.getMeeting(ID)),
      );
      const subscription = concat(createMeeting$, getMeeting$).subscribe(onMeeting, onError);

      cleanup = () => {
        if (lastMeeting?.ID) {
          meetingsAdapter.removeMedia(lastMeeting.ID);
          meetingsAdapter.leaveMeeting(lastMeeting.ID);
        }
        subscription.unsubscribe();
      };
    }

    return cleanup;
  }, [meetingsAdapter, meetingDestination]);

  return meeting;
}
