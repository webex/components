import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from '@momentum-ui/react';
import WebexMeetingControl from '../WebexMeetingControl/WebexMeetingControl';
import webexComponentClasses from '../helpers';

const SCREENS = {
  camera: {
    icon: 'icon-camera_36',
    title: 'Allow access to camera',
    message: 'when your browser asks to let Webex use your camera for this video call',
    control: 'proceed-without-camera',
  },
  microphone: {
    icon: 'icon-microphone_36',
    title: 'Allow access to microphone',
    message: 'when your browser asks to let Webex use your microphone for this video call',
    control: 'proceed-without-microphone',
  },
};

/**
 * Webex Media Access component displays a prompt explaining necessary access to media.
 *
 * @param {object} props Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {JSX.Element} [props.logo]  Logo
 * @param {string} props.media State of media controls
 * @param {string} props.meetingID  ID of the meeting
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 *
 */
export default function WebexMediaAccess({
  className,
  logo,
  media,
  meetingID,
  style,
}) {
  const screen = SCREENS[media];
  const cssClasses = webexComponentClasses('media-access', className);

  return (
    <div className={cssClasses} style={style}>
      {logo && <div className="logo-container">{logo}</div>}
      <Icon name={screen.icon} />
      <h2 className="title">{screen.title}</h2>
      <p className="body">
        Select
        {' '}
        <span className="allow">Allow</span>
        {' '}
        {screen.message}
      </p>
      <WebexMeetingControl meetingID={meetingID} type={screen.control} />
    </div>
  );
}

WebexMediaAccess.propTypes = {
  className: PropTypes.string,
  logo: PropTypes.node,
  media: PropTypes.oneOf(['camera', 'microphone']),
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexMediaAccess.defaultProps = {
  className: '',
  logo: undefined,
  media: 'camera',
  style: undefined,
};
