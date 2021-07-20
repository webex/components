import {useEffect, useContext, useState} from 'react';

import {AdapterContext} from './contexts';
import {chainWith} from '../../util';

const emptyMeeting = {
  title: null,
  localAudio: {
    stream: null,
  },
  localVideo: {
    stream: null,
  },
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
      const subscription = createMeeting$.pipe(
        chainWith(({ID}) => meetingsAdapter.getMeeting(ID)),
      ).subscribe(onMeeting, onError);

      let beforePageUnload = () => {
        if (lastMeeting?.ID) {
          meetingsAdapter.leavemeeting(lastMeeting.ID);
        }
      };

      window.addEventListener('beforeunload', beforePageUnload);

      cleanup = () => {
        if (lastMeeting?.ID) {
          meetingsAdapter.removeMedia(lastMeeting.ID);
          meetingsAdapter.leaveMeeting(lastMeeting.ID);
        }

        if (beforePageUnload) {
          window.removeEventListener('beforeunload', beforePageUnload);
          beforePageUnload = undefined;
        }
        subscription.unsubscribe();
      };
    }

    return cleanup;
  }, [meetingsAdapter, meetingDestination]);

  return meeting;
}
