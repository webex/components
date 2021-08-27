import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';
import Title from '../generic/Title/Title';
import WebexLocalMedia from '../WebexLocalMedia/WebexLocalMedia';
import WebexMeetingControl from '../WebexMeetingControl/WebexMeetingControl';
import Banner from '../generic/Banner/Banner';

/**
 * Webex Video Settings component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting from which to obtain local media
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexVideoSettings({meetingID, className, style}) {
  const cssClasses = webexComponentClasses('video-settings', className);

  return (
    <div className={cssClasses} style={style}>
      <Title>Camera</Title>
      <WebexMeetingControl type="switch-camera" meetingID={meetingID} />
      <div className="media">
        <WebexLocalMedia mediaType="video" meetingID={meetingID} />
        <Banner type="bottom">Preview</Banner>
      </div>
    </div>
  );
}

WebexVideoSettings.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexVideoSettings.defaultProps = {
  className: '',
  style: undefined,
};
