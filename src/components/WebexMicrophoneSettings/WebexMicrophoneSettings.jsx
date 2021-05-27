import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';
import WebexMeetingControl from '../WebexMeetingControl/WebexMeetingControl';

/**
 * Webex Microphone Settings component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting from which to obtain local media
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexMicrophoneSettings({className, meetingID, style}) {
  const cssClasses = webexComponentClasses('microphone-settings', className);

  return (
    <div className={cssClasses} style={style}>
      <h2>Microphone</h2>
      <WebexMeetingControl type="switch-microphone" meetingID={meetingID} />
    </div>
  );
}

WebexMicrophoneSettings.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexMicrophoneSettings.defaultProps = {
  className: '',
  style: undefined,
};
