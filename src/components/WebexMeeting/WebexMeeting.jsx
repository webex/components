import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Spinner} from '@momentum-ui/react';

import WebexInMeeting from '../WebexInMeeting/WebexInMeeting';
import WebexInterstitialMeeting from '../WebexInterstitialMeeting/WebexInterstitialMeeting';
import WebexMeetingControl from '../WebexMeetingControl/WebexMeetingControl';
import WebexMeetingControls from '../WebexMeetingControl/WebexMeetingControls';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import {useMeeting} from '../hooks';

/**
 * Webex Meeting component displays the default Webex meeting experience.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.meetingID  ID of the meeting
 * @param {Array.<string>} [props.controls]  Array of control names to display
 * @returns {object} JSX of the component
 */
export default function WebexMeeting({meetingID, controls}) {
  const {ID, remoteVideo} = useMeeting(meetingID);
  const isActive = remoteVideo !== null;

  const classBaseName = `${WEBEX_COMPONENTS_CLASS_PREFIX}-meeting`;
  const mainClasses = {
    [classBaseName]: true,
    [`${classBaseName}-active`]: ID && isActive,
  };

  const meetingControls = controls(isActive).map(
    (key) => <WebexMeetingControl key={key} type={key} />,
  );

  let meetingDisplay;

  // Undefined meeting ID means that a meeting has never been set
  if (ID === undefined) {
    meetingDisplay = <Spinner />;
  // A null meeting ID means that a meeting is no longer valid (e.g. user left or kicked out)
  } else if (ID === null) {
    meetingDisplay = "You've successfully left the meeting";
  } else {
    meetingDisplay = (
      <>
        {isActive
          ? <WebexInMeeting meetingID={ID} />
          : <WebexInterstitialMeeting meetingID={ID} />}
        <WebexMeetingControls className="meeting-controls-container" meetingID={ID}>
          {meetingControls}
        </WebexMeetingControls>
      </>
    );
  }

  return (
    <div className={classNames(mainClasses)}>
      {meetingDisplay}
    </div>
  );
}

WebexMeeting.propTypes = {
  meetingID: PropTypes.string.isRequired,
  controls: PropTypes.func,
};

WebexMeeting.defaultProps = {
  /**
   * A function that returns an array of control names for the meeting.
   * Control name must match with the adapter implementation of the control.
   *
   * @param {boolean} isActive  Whether or not the meeting is active
   * @returns {Array.<string>} List of controls to display
   */
  controls: (isActive) => (
    isActive
      ? ['mute-audio', 'mute-video', 'share-screen', 'leave-meeting']
      : ['mute-audio', 'mute-video', 'join-meeting']
  ),
};
