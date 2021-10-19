import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../generic/Spinner/Spinner';

import WebexAvatar from '../WebexAvatar/WebexAvatar';
import webexComponentClasses from '../helpers';
import {PHONE_LARGE} from '../breakpoints';
import {
  useElementDimensions,
  useMe,
  useMeeting,
  useStream,
  useRef,
} from '../hooks';

/**
 * Webex Local Media component displays the user's local video or local share.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.mediaType  Type of local media to display
 * @param {string} props.meetingID  ID of the meeting from which to obtain local media
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexLocalMedia({
  className,
  mediaType,
  meetingID,
  style,
}) {
  const [mediaRef, {width}] = useElementDimensions();
  const {localVideo, localShare, settings} = useMeeting(meetingID);
  const {ID} = useMe();
  const videoRef = useRef();

  let stream;

  switch (mediaType) {
    case 'video':
      stream = localVideo.stream;
      break;
    case 'screen':
      stream = localShare?.stream;
      break;
    case 'preview':
      stream = settings.preview.video;
      break;
    default:
      break;
  }

  useStream(videoRef, stream);

  const [cssClasses] = webexComponentClasses('local-media', className, {
    desktop: width >= PHONE_LARGE,
    'no-media': !stream,
  });
  const disabledVideo = ID ? <WebexAvatar personID={ID} displayStatus={false} /> : <Spinner />;

  return (
    <div ref={mediaRef} className={cssClasses} style={style}>
      {
        /* eslint-disable-next-line jsx-a11y/media-has-caption */
        stream ? <video ref={videoRef} playsInline autoPlay /> : disabledVideo
      }
    </div>
  );
}

WebexLocalMedia.propTypes = {
  className: PropTypes.string,
  mediaType: PropTypes.oneOf(['video', 'screen', 'preview']),
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexLocalMedia.defaultProps = {
  className: '',
  mediaType: 'video',
  style: undefined,
};
