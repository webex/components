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
  const cssClasses = webexComponentClasses('audio-settings', className);
  const [, display] = useMeetingControl('switch-microphone', meetingID);
  // The browser api setSinkId() does not work properly on Firefox and Safari browsers.
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId
  const isFirefox = navigator.userAgent.indexOf('Firefox') !== -1; // detect Firefox browser
  const isSafari = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1; // detect Safari browser
  const checkBrowser = isFirefox || isSafari;

  return (
    <div className={cssClasses} style={style}>
      {display.options?.length !== 0
        ? (
          <>
            <Title>Speaker</Title>
            {!checkBrowser
              ? <WebexMeetingControl type="switch-speaker" meetingID={meetingID} />
              : <WebexNoMedia media="speaker" className="no-media" />}
            <Title>Microphone</Title>
            <WebexMeetingControl type="switch-microphone" meetingID={meetingID} />
          </>
        ) : (
          <WebexNoMedia media="microphone" className="no-media" />
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
