import React from 'react';
import PropTypes from 'prop-types';
import {useMeetingControl} from '../hooks';
import webexComponentClasses from '../helpers';
import Title from '../generic/Title/Title';
import WebexMeetingControl from '../WebexMeetingControl/WebexMeetingControl';
import WebexNoMedia from '../WebexNoMedia/WebexNoMedia';

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
  const [cssClasses, sc] = webexComponentClasses('audio-settings', className);
  const [, display] = useMeetingControl('switch-microphone', meetingID);

  return (
    <div className={cssClasses} style={style}>
      {display.options?.length !== 0
        ? (
          <>
            <Title type="subsection">Speaker</Title>
            <WebexMeetingControl type="switch-speaker" meetingID={meetingID} />
            <Title type="subsection">Microphone</Title>
            <WebexMeetingControl type="switch-microphone" meetingID={meetingID} />
          </>
        ) : (
          <WebexNoMedia media="microphone" className={sc('no-media')} />
        )}
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
