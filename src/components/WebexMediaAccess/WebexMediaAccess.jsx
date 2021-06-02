import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from '@momentum-ui/react';
import WebexMeetingControl from '../WebexMeetingControl/WebexMeetingControl';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';

/**
 * Webex Media Access component displays a prompt explaining necessary access to media.
 *
 * @param {object} props Data passed to the component
 * @param {string} props.meetingID  ID of the meeting
 * @returns {object} JSX of the component
 */
export default function WebexMediaAccess({meetingID}) {
  return (
    <div className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-media-access`}>
      <Icon name="icon-camera_36" />
      <h2 className="title">Allow access to camera</h2>
      <p className="body">
        Select
        {' '}
        <span className="allow">Allow</span>
        {' '}
        when your browser asks to let Webex use your camera for this video call
      </p>
      <WebexMeetingControl meetingID={meetingID} type="join-without-camera" />
    </div>
  );
}

WebexMediaAccess.propTypes = {
  meetingID: PropTypes.string.isRequired,
};
