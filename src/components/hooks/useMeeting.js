import {useEffect, useContext, useState} from 'react';

import {AdapterContext} from './contexts';

const emptyMeeting = {
  ID: null,
  title: null,
  localAudio: {
    stream: null,
  },
  localVideo: {
    stream: null,
  },
  remoteAudio: null,
  remoteVideo: null,
  remoteShare: null,
  state: null,
  showRoster: null,
  error: null,
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
 * Custom hook that returns meeting data of the given ID.
 *
 * @param {string} meetingID  ID of the meeting for which to get data
 * @returns {Meeting} Data of the meeting
 */
export default function useMeeting(meetingID) {
  const [meeting, setMeeting] = useState(emptyMeeting);
  const {meetingsAdapter} = useContext(AdapterContext);

  useEffect(() => {
    let cleanup;

    if (!meetingID) {
      setMeeting({...emptyMeeting});
      cleanup = undefined;
    } else {
      const onMeeting = (newMeeting) => {
        // React won't recognize the meeting attributes have been updated
        // since the state is the meeting object itself. We need to create a new
        // meeting object trigger the state change
        setMeeting({...newMeeting});
      };
      const onError = (error) => {
        setMeeting({...emptyMeeting, error});
        // eslint-disable-next-line no-console
        console.log(error);
      };

      const subscription = meetingsAdapter
        .getMeeting(meetingID)
        .subscribe(onMeeting, onError);

      cleanup = () => {
        subscription.unsubscribe();
      };
    }

    return cleanup;
  }, [meetingsAdapter, meetingID]);

  return meeting;
}
