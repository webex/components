import React from 'react';
import PropTypes from 'prop-types';
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
export default function WebexRemoteMedia({meetingID}) {
  const {remoteAudio, remoteVideo, error} = useMeeting(meetingID);
  const audioRef = useStream(remoteAudio);
  const videoRef = useStream(remoteVideo);
  const hasMedia = !!(remoteAudio || remoteVideo);

  return (
    <div className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-remote-media`}>
      {error ? (
        <AlertBanner show type="warning">
          Having trouble joining the meeting? Please check your connection.
        </AlertBanner>
      ) : (
        <React.Fragment>
          {!hasMedia ? (
            <Badge rounded>
              <Spinner size={16} />
              <div>Connecting</div>
            </Badge>
          ) : null}
          {remoteVideo ? <video ref={videoRef} playsInline autoPlay /> : null}
          {remoteAudio ? <audio ref={audioRef} autoPlay /> : null}
        </React.Fragment>
      )}
    </div>
  );
}

WebexRemoteMedia.propTypes = {
  meetingID: PropTypes.string.isRequired,
};
