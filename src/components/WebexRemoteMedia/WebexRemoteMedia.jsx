/* eslint-disable jsx-a11y/media-has-caption */
import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import Badge from '../generic/Badge/Badge';
import Icon from '../generic/Icon/Icon';
import Spinner from '../generic/Spinner/Spinner';
import Title from '../generic/Title/Title';
import {AdapterContext} from '../hooks/contexts';

import webexComponentClasses from '../helpers';
import {TABLET, DESKTOP, DESKTOP_LARGE} from '../breakpoints';
import {
  useElementDimensions,
  useMeeting,
  useMembers,
  useRef,
  useSpeakers,
  useStream,
} from '../hooks';

/**
 * Webex Remote Media component displays the meeting's remote video
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custome CSS class to apply
 * @param {string} props.layout  Layout to apply on remote video
 * @param {string} props.meetingID  ID of the meeting
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 *
 * NOTE: waiting for the UX for a design on what to display if there is no remote video
 */
export default function WebexRemoteMedia({
  className, layout, meetingID, style,
}) {
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
  const remoteMediaRef = useRef();
  const adapter = useContext(AdapterContext);

  useStream(audioRef, remoteAudio);
  useStream(videoRef, remoteVideo);
  useStream(shareRef, remoteShare);

  useSpeakers(audioRef, speakerID);

  const {width} = useElementDimensions(remoteMediaRef);

  const hasOtherMembers = members.filter((member) => member.inMeeting).length > 1;
  const hasMedia = !!(remoteAudio || remoteVideo || remoteShare);

  const [cssClasses, sc] = webexComponentClasses('remote-media', className, {
    tablet: width >= TABLET && width < DESKTOP,
    desktop: width >= DESKTOP && width < DESKTOP_LARGE,
    'desktop-xl': width >= DESKTOP_LARGE,
    'remote-video-n-share': remoteVideo && remoteShare,
  });

  let remoteDisplay;

  useEffect(() => {
    if (remoteVideo) {
      adapter.meetingsAdapter.changeLayout(meetingID, layout);
    }
  }, [adapter.meetingsAdapter, layout, meetingID, remoteVideo]);

  if (error) {
    remoteDisplay = (
      <div className={sc('media-error')}>
        <Icon name="error" className={sc('error-icon')} />
        <div>Having trouble joining the meeting?</div>
        <div>Please check your connection.</div>
      </div>
    );
  } else if (hasMedia && hasOtherMembers) {
    remoteDisplay = (
      <>
        {remoteVideo
          && <video className={`${sc('video')} ${sc('remote-video')}`} ref={videoRef} muted playsInline autoPlay />}
        {remoteShare
          && <video className={`${sc('video')} ${sc('remote-share')}`} ref={shareRef} muted playsInline autoPlay />}
        {remoteAudio && <audio ref={audioRef} autoPlay />}
      </>
    );
  } else if (hasMedia && !hasOtherMembers) {
    remoteDisplay = <Title type="subsection">Waiting for others to join...</Title>;
  } else {
    remoteDisplay = (
      <Badge className={sc('connecting-badge')}>
        <Spinner size={16} className={sc('connecting-spinner')} />
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
  layout: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexRemoteMedia.defaultProps = {
  className: '',
  layout: 'Grid',
  style: undefined,
};
