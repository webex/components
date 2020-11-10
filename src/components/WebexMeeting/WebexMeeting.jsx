import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Spinner} from '@momentum-ui/react';

import WebexInMeeting from '../WebexInMeeting/WebexInMeeting';
import WebexInterstitialMeeting from '../WebexInterstitialMeeting/WebexInterstitialMeeting';
import WebexMeetingControl from '../WebexMeetingControl/WebexMeetingControl';
import WebexMeetingControls from '../WebexMeetingControl/WebexMeetingControls';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import {useMeetingDestination} from '../hooks';

/**
 * Webex Meeting component displays the default Webex meeting experience.
 *
 * @param {string} props.meetingDestination  ID of the virtual meeting location
 * @param {Array} [props.controls]  Array of control names to display
 * @returns {Object} JSX of the component
 */
export default function WebexMeeting({meetingDestination, controls}) {
  const {ID, remoteVideo} = useMeetingDestination(meetingDestination);
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
  meetingDestination: PropTypes.string.isRequired,
  controls: PropTypes.func,
};

WebexMeeting.defaultProps = {
  /**
   * A function that returns an array of control names for the meeting.
   * Control name must match with the adapter implementation of the control.
   *
   * @param {boolean} isActive  Whether or not the meeting is active
   */
  // eslint-disable-next-line no-confusing-arrow
  controls: (isActive) =>
    isActive
      ? ['mute-audio', 'mute-video', 'share-screen', 'leave-meeting']
      : ['mute-audio', 'mute-video', 'join-meeting'],
};
