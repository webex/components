import React, {
  JSX,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {DestinationType, MeetingState} from '@webex/component-adapter-interfaces';
import Badge from '../generic/Badge/Badge';
import Modal from '../generic/Modal/Modal';
import Spinner from '../generic/Spinner/Spinner';
import Title from '../generic/Title/Title';
import {PHONE_LARGE} from '../breakpoints';

import WebexInMeeting from '../WebexInMeeting/WebexInMeeting';
import WebexInterstitialMeeting from '../WebexInterstitialMeeting/WebexInterstitialMeeting';
import WebexMeetingControlBar from '../WebexMeetingControlBar/WebexMeetingControlBar';
import WebexMemberRoster from '../WebexMemberRoster/WebexMemberRoster';
import WebexSettings from '../WebexSettings/WebexSettings';
import webexComponentClasses from '../helpers';
import {useElementDimensions, useMeeting} from '../hooks';
import {AdapterContext} from '../hooks/contexts';

/**
 * Webex Meeting component displays the default Webex meeting experience.
 *
 * @param {object} props  Data passed to the component
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {JSX.Element} [props.logo]  Logo
 * @param {string} [props.meetingID]  ID of the meeting
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexMeeting({
  className,
  logo,
  meetingID,
  style,
}) {
  const {
    ID,
    localAudio,
    localVideo,
    state,
    showRoster,
    showSettings,
  } = useMeeting(meetingID);
  const {JOINED, LEFT} = MeetingState;
  const isActive = state === JOINED;
  const adapter = useContext(AdapterContext);
  const [mediaRef, {width}] = useElementDimensions();
  const cssClasses = webexComponentClasses('meeting', className, null, {'roster-only': showRoster && width <= PHONE_LARGE});
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef();

  useEffect(() => {
    if (state && state !== LEFT) {
      setShowToast(true);
      toastTimeoutRef.current = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }

    return () => clearTimeout(toastTimeoutRef.current);
  }, [localAudio.stream, localVideo.stream, state, LEFT]);

  const toastText = `${localAudio.stream ? 'Unmuted' : 'Muted'}, ${localVideo.stream ? 'Camera on' : 'Camera off'}`;
  let meetingDisplay;

  // A meeting with a falsy state means that the meeting has not been created
  if (!state) {
    meetingDisplay = <div className="centered"><Spinner /></div>;
  } else if (state === LEFT) {
    meetingDisplay = <Title className="centered">You&apos;ve successfully left the meeting</Title>;
  } else {
    meetingDisplay = (
      <>
        {logo && <div>{logo}</div>}
        <div className="body">
          {isActive
            ? <WebexInMeeting meetingID={ID} className="inner-meeting" />
            : <WebexInterstitialMeeting meetingID={ID} className="inner-meeting" />}
          {showRoster && (
            <WebexMemberRoster
              destinationID={ID}
              destinationType={DestinationType.MEETING}
              className="member-roster"
              onClose={() => adapter.meetingsAdapter.toggleRoster(ID)}
            />
          )}
          {showToast && <Badge className="media-state-toast">{toastText}</Badge>}
        </div>
        <WebexMeetingControlBar meetingID={ID} className="control-bar" />
        {showSettings && (
          <Modal
            onClose={() => adapter.meetingsAdapter.toggleSettings(ID)}
            title="Settings"
          >
            <WebexSettings meetingID={ID} />
          </Modal>
        )}
      </>
    );
  }

  return (
    <div className={cssClasses} style={style} ref={mediaRef}>
      {meetingDisplay}
    </div>
  );
}

WebexMeeting.propTypes = {
  className: PropTypes.string,
  logo: PropTypes.node,
  meetingID: PropTypes.string,
  style: PropTypes.shape(),
};

WebexMeeting.defaultProps = {
  className: '',
  logo: undefined,
  meetingID: undefined,
  style: undefined,
};
