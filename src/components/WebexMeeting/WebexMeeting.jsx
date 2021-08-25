import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {DestinationType, MeetingState} from '@webex/component-adapter-interfaces';
import Spinner from '../generic/Spinner/Spinner';

import Modal from '../generic/Modal/Modal';
import WebexInMeeting from '../WebexInMeeting/WebexInMeeting';
import WebexInterstitialMeeting from '../WebexInterstitialMeeting/WebexInterstitialMeeting';
import WebexMeetingControlBar from '../WebexMeetingControlBar/WebexMeetingControlBar';
import WebexMemberRoster from '../WebexMemberRoster/WebexMemberRoster';
import WebexSettings from '../WebexSettings/WebexSettings';
import webexComponentClasses from '../helpers';
import {useMeeting} from '../hooks';
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
    state,
    showRoster,
    showSettings,
  } = useMeeting(meetingID);
  const {JOINED, LEFT} = MeetingState;
  const isActive = state === JOINED;
  const adapter = useContext(AdapterContext);

  const cssClasses = webexComponentClasses('meeting', className);

  let meetingDisplay;

  // A meeting with a falsy state means that the meeting has not been created
  if (!state) {
    meetingDisplay = <div className="centered"><Spinner /></div>;
  } else if (state === LEFT) {
    meetingDisplay = <div className="centered">You&apos;ve successfully left the meeting</div>;
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
    <div className={cssClasses} style={style}>
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
