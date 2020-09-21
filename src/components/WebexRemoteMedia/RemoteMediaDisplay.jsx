/* eslint-disable jsx-a11y/media-has-caption, react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import {useStream} from '../hooks';

/**
 * Remote Media Display component displays the meeting's remote video and audio html elements
 *
 * @param {object} props
 * @param {object} props.remoteAudio
 * @param {object} props.remoteShare
 * @param {object} props.remoteVideo
 * @returns {object} JSX of the component
 */
export default function RemoteMediaDisplay({remoteAudio, remoteShare, remoteVideo}) {
  const audioRef = useStream(remoteAudio);
  const videoRef = useStream(remoteVideo);
  const shareRef = useStream(remoteShare);

  return (
    <>
      {remoteVideo ? <video ref={videoRef} playsInline autoPlay /> : null}

      {remoteShare ? <video ref={shareRef} playsInline autoPlay /> : null}

      {remoteAudio ? <audio ref={audioRef} autoPlay /> : null}
    </>
  );
}

RemoteMediaDisplay.propTypes = {
  remoteAudio: PropTypes.object,
  remoteShare: PropTypes.object,
  remoteVideo: PropTypes.object,
};

RemoteMediaDisplay.defaultProps = {
  remoteAudio: null,
  remoteShare: null,
  remoteVideo: null,
};
