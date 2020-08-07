import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Badge, Spinner, AlertBanner} from '@momentum-ui/react';

import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import {useMeeting, useStream} from '../hooks';
import './WebexRemoteMedia.scss';

/**
 * Webex Remote Media component displays the meeting's remote video
 *
 * @param {object} props
 * @returns {object} JSX of the component
 *
 * NOTE: waiting for the UX for a design on what to display if there is no remote video
 */
export default function WebexRemoteMedia({className, meetingID}) {
  const {
    remoteAudio,
    remoteVideo,
    remoteShare,
    error,
  } = useMeeting(meetingID);
  const audioRef = useStream(remoteAudio);
  const videoRef = useStream(remoteVideo);
  const shareRef = useStream(remoteShare);
  const hasMedia = !!(remoteAudio || remoteVideo || remoteShare);
  const hasTwoMedia = remoteVideo && remoteShare;
  const mainClasses = {
    [`${WEBEX_COMPONENTS_CLASS_PREFIX}-remote-media`]: true,
    [className]: !!className,
    'split-screen': hasTwoMedia,
  };

  return (
    <div className={classNames(mainClasses)}>
      {error ? (
        <AlertBanner show type="warning">
          Having trouble joining the meeting? Please check your connection.
        </AlertBanner>
      ) : (
        <>
          {!hasMedia ? (
            <Badge rounded>
              <Spinner size={16} />
              <div>Connecting</div>
            </Badge>
          ) : null}

          {remoteVideo ? <video ref={videoRef} playsInline autoPlay /> : null}

          {remoteShare ? <video ref={shareRef} playsInline autoPlay /> : null}

          {remoteAudio ? <audio ref={audioRef} autoPlay /> : null}
        </>
      )}
    </div>
  );
}

WebexRemoteMedia.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
};

WebexRemoteMedia.defaultProps = {
  className: '',
};
