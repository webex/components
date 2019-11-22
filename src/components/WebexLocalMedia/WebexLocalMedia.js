import React from 'react';
import PropTypes from 'prop-types';

import {WebexAvatar} from '../';
import {useMeeting, useVideo} from '../hooks';

import './WebexLocalMedia.scss';

/**
 * Webex Local Media component displays the user's local video
 *
 * @param {object} props
 * @returns {object} JSX of the component
 */
export default function WebexLocalMedia({meetingID, personID}) {
  const {localVideo} = useMeeting(meetingID);
  const videoRef = useVideo(localVideo);

  return (
    <div className="local-media">
      {localVideo ? <video ref={videoRef} playsInline /> : <WebexAvatar personID={personID} />}
    </div>
  );
}

WebexLocalMedia.propTypes = {
  meetingID: PropTypes.string.isRequired,
  personID: PropTypes.string.isRequired,
};
