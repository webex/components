import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Spinner} from '@momentum-ui/react';

import WebexAvatar from '../WebexAvatar/WebexAvatar';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import {PHONE_LARGE} from '../breakpoints';
import {
  useElementDimensions,
  useMe,
  useMeeting,
  useStream,
} from '../hooks';

/**
 * Webex Local Media component displays the user's local video or local share.
 *
 * @param {string} props.meetingID  ID of the meeting from which to obtain local media
 * @returns {Object} JSX of the component
 */
export default function WebexLocalMedia({className, meetingID, mediaType}) {
  const [mediaRef, {width}] = useElementDimensions();
  const {localVideo, localShare} = useMeeting(meetingID);
  let stream;

  switch (mediaType) {
    case 'video':
      stream = localVideo;
      break;
    case 'screen':
      stream = localShare;
      break;
    default:
      break;
  }

  const ref = useStream(stream);
  const {ID} = useMe();

  const classBaseName = `${WEBEX_COMPONENTS_CLASS_PREFIX}-local-media`;
  const mainClasses = {
    [classBaseName]: true,
    [`${classBaseName}-desktop`]: width >= PHONE_LARGE,
    [`${classBaseName}-no-media`]: !stream,
    [className]: !!className,
  };

  const disabledVideo = ID ? <WebexAvatar personID={ID} displayStatus={false} /> : <Spinner />;

  return (
    <div ref={mediaRef} className={classNames(mainClasses)}>
      {stream ? <video ref={ref} playsInline autoPlay /> : disabledVideo}
    </div>
  );
}

WebexLocalMedia.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  mediaType: PropTypes.oneOf(['video', 'screen']),
};

WebexLocalMedia.defaultProps = {
  className: '',
  mediaType: 'video',
};
