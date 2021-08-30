/* eslint-disable jsx-a11y/media-has-caption */
import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import Badge from '../generic/Badge/Badge';
import Icon from '../generic/Icon/Icon';
import Spinner from '../generic/Spinner/Spinner';
import Title from '../generic/Title/Title';

import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import webexComponentClasses from '../helpers';
import {TABLET, DESKTOP, DESKTOP_LARGE} from '../breakpoints';
import {
  useElementDimensions,
  useMeeting,
  useMembers,
  useSpeakers,
  useStream,
} from '../hooks';

/**
 * Webex Remote Media component displays the meeting's remote video
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custome CSS class to apply
 * @param {string} props.meetingID  ID of the meeting
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 *
 * NOTE: waiting for the UX for a design on what to display if there is no remote video
 */
export default function WebexRemoteMedia({className, meetingID, style}) {
  const {
    remoteAudio,
    remoteVideo,
    remoteShare,
    error,
    speakerID,
  } = useMeeting(meetingID);
  const members = useMembers(meetingID, 'meeting');
  const audioRef = useRef();
  const videoRef = useRef();
  const shareRef = useRef();

  useStream(audioRef, remoteAudio);
  useStream(videoRef, remoteVideo);
  useStream(shareRef, remoteShare);

  useSpeakers(audioRef, speakerID);

  const [remoteMediaRef, {width}] = useElementDimensions();

  const hasOtherMembers = members.filter((member) => member.inMeeting).length > 1;
  const hasMedia = !!(remoteAudio || remoteVideo || remoteShare);

  const cssClasses = webexComponentClasses('remote-media', className, {
    tablet: width >= TABLET && width < DESKTOP,
    desktop: width >= DESKTOP && width < DESKTOP_LARGE,
    'desktop-xl': width >= DESKTOP_LARGE,
  },
  {
    'remote-video-n-share': remoteVideo && remoteShare,
  });

  let remoteDisplay;

  if (error) {
    remoteDisplay = (
      <div className="media-error">
        <Icon name="error" className="media-error-icon" />
        <div>Having trouble joining the meeting?</div>
        <div>Please check your connection.</div>
      </div>
    );
  } else if (hasMedia && hasOtherMembers) {
    remoteDisplay = (
      <>
        {remoteVideo
          && <video className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-remote-video`} ref={videoRef} muted playsInline autoPlay />}
        {remoteShare
          && <video className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-remote-share`} ref={shareRef} muted playsInline autoPlay />}
        {remoteAudio && <audio ref={audioRef} autoPlay />}
      </>
    );
  } else if (hasMedia && !hasOtherMembers) {
    remoteDisplay = <Title>Waiting for others to join...</Title>;
  } else {
    remoteDisplay = (
      <Badge>
        <Spinner size={14} className="connecting-spinner" />
        <span>Connecting</span>
      </Badge>
    );
  }

  return (
    <div ref={remoteMediaRef} className={cssClasses} style={style}>
      {remoteDisplay}
    </div>
  );
}

WebexRemoteMedia.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexRemoteMedia.defaultProps = {
  className: '',
  style: undefined,
};
