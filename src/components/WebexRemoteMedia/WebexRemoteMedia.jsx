/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Badge, Spinner, AlertBanner} from '@momentum-ui/react';

import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import {TABLET, DESKTOP, DESKTOP_LARGE} from '../breakpoints';
import {
  useElementDimensions,
  useMeeting,
  useMembers,
  useStream,
} from '../hooks';

/**
 * Webex Remote Media component displays the meeting's remote video
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.meetingID  ID of the meeting
 * @param {string} props.className  Custome CSS class to apply
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
    speakerID,
  } = useMeeting(meetingID);
  const members = useMembers(meetingID, 'meeting');
  const audioRef = useStream(remoteAudio);
  const videoRef = useStream(remoteVideo);
  const shareRef = useStream(remoteShare);
  const [remoteMediaRef, {width}] = useElementDimensions();

  const hasOtherMembers = members.filter((member) => member.inMeeting).length > 1;
  const hasMedia = !!(remoteAudio || remoteVideo || remoteShare);

  const classBaseName = `${WEBEX_COMPONENTS_CLASS_PREFIX}-remote-media`;
  const mainClasses = {
    [`${classBaseName}`]: true,
    [`${classBaseName}-tablet`]: width >= TABLET && width < DESKTOP,
    [`${classBaseName}-desktop`]: width >= DESKTOP && width < DESKTOP_LARGE,
    [`${classBaseName}-desktop-xl`]: width >= DESKTOP_LARGE,
    [className]: !!className,
    'remote-video-n-share': remoteVideo && remoteShare,
  };

  let remoteDisplay;

  const setupVideoNode = (node) => {
    videoRef(node);
    if (node && node.setSinkId !== 'undefined') {
      node.setSinkId(speakerID);
    }
  };

  if (error) {
    remoteDisplay = (
      <AlertBanner show type="warning">
        Having trouble joining the meeting? Please check your connection.
      </AlertBanner>
    );
  } else if (hasMedia && hasOtherMembers) {
    remoteDisplay = (
      <>
        {remoteVideo
          && <video className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-remote-video`} ref={setupVideoNode} playsInline autoPlay />}
        {remoteShare
          && <video className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-remote-share`} ref={shareRef} muted playsInline autoPlay />}
        {remoteAudio && <audio ref={audioRef} autoPlay />}
      </>
    );
  } else if (hasMedia && !hasOtherMembers) {
    remoteDisplay = (
      <h4>
        Waiting for others to join...
      </h4>
    );
  } else {
    remoteDisplay = (
      <Badge rounded>
        <Spinner size={16} />
        <div>Connecting</div>
      </Badge>
    );
  }

  return (
    <div ref={remoteMediaRef} className={classNames(mainClasses)}>
      {remoteDisplay}
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
