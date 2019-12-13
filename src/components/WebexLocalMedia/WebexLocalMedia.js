import React from 'react';
import PropTypes from 'prop-types';

import {WebexAvatar} from '../';
import {useMe, useMeeting, useVideo} from '../hooks';

import './WebexLocalMedia.scss';

/**
 * Webex Local Media component displays the user's local video
 *
 * @param {object} props
 * @returns {object} JSX of the component
 */
export default function WebexLocalMedia({meetingID}) {
  const {localVideo} = useMeeting(meetingID);
  const videoRef = useVideo(localVideo);
  const {ID} = useMe();

  return (
    <div className="local-media">
      {localVideo ? <video ref={videoRef} playsInline /> : <WebexAvatar personID={ID} />}
    </div>
  );
}

WebexLocalMedia.propTypes = {
  meetingID: PropTypes.string.isRequired,
};
