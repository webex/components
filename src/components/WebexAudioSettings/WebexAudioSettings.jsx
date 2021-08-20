import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';
import WebexMeetingControl from '../WebexMeetingControl/WebexMeetingControl';

/**
 * Webex Audio Settings component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting from which to obtain local media
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexAudioSettings({className, meetingID, style}) {
  const cssClasses = webexComponentClasses('audio-settings', className);

  return (
    <div className={cssClasses} style={style}>
      <h5>Speaker</h5>
      <WebexMeetingControl type="switch-speaker" meetingID={meetingID} />
      <h5>Microphone</h5>
      <WebexMeetingControl type="switch-microphone" meetingID={meetingID} />
    </div>
  );
}

WebexAudioSettings.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexAudioSettings.defaultProps = {
  className: '',
  style: undefined,
};
