import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from '@momentum-ui/react';
import WebexMeetingControl from '../WebexMeetingControl/WebexMeetingControl';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';

const SCREENS = {
  camera: {
    icon: 'icon-camera_36',
    title: 'Allow access to camera',
    message: 'when your browser asks to let Webex use your camera for this video call',
    control: 'join-without-camera',
  },
  microphone: {
    icon: 'icon-microphone_36',
    title: 'Allow access to microphone',
    message: 'when your browser asks to let Webex use your microphone for this video call',
    control: 'join-without-microphone',
  },
};

/**
 * Webex Media Access component displays a prompt explaining necessary access to media.
 *
 * @param {object} props Data passed to the component
 * @param {string} props.meetingID  ID of the meeting
 * @param {string} props.media State of media controls
 * @returns {object} JSX of the component
 */
export default function WebexMediaAccess({meetingID, media}) {
  const screen = SCREENS[media];

  return (
    <div className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-media-access`}>
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
  meetingID: PropTypes.string.isRequired,
  media: PropTypes.oneOf(['camera', 'microphone']),
};

WebexMediaAccess.defaultProps = {
  media: 'camera',
};
