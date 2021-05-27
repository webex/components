import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {MeetingState} from '@webex/component-adapter-interfaces';

import {useMeeting} from '../hooks';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import WebexMeetingControl from '../WebexMeetingControl/WebexMeetingControl';

/**
 * WebexMeetingControlBar
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.meetingID  ID of the meeting to control
 * @param {string} props.className  Custom CSS class to apply
 * @param {object} props.controls  Controls to display
 * @returns {object} JSX of the component
 */
export default function WebexMeetingControlBar({className, controls, meetingID}) {
  const {state} = useMeeting(meetingID);
  const {JOINED} = MeetingState;
  const isActive = state === JOINED;
  const mainClasses = {
    [`${WEBEX_COMPONENTS_CLASS_PREFIX}-meeting-control-bar`]: true,
    [className]: !!className,
  };
  const meetingControls = controls(isActive).map(
    (key) => <WebexMeetingControl key={key} type={key} meetingID={meetingID} />,
  );

  return (
    <div className={classNames(mainClasses)}>{meetingControls}</div>
  );
}

WebexMeetingControlBar.propTypes = {
  className: PropTypes.string,
  controls: PropTypes.func,
  meetingID: PropTypes.string.isRequired,
};

WebexMeetingControlBar.defaultProps = {
  /**
   * A function that returns an array of control names for the meeting.
   * Control name must match with the adapter implementation of the control.
   *
   * @param {boolean} isActive  Whether or not the meeting is active
   * @returns {Array.<string>} List of controls to display
   */

  className: '',
  controls: (isActive) => (
    isActive
      ? ['settings', 'mute-audio', 'mute-video', 'share-screen', 'leave-meeting']
      : ['settings', 'mute-audio', 'mute-video', 'join-meeting']
  ),
};
