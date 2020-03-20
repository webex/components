import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Spinner} from '@momentum-ui/react';

import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import {WebexAvatar} from '../';
import {useElementDimensions, useMe, useMeeting, useStream} from '../hooks';
import {PHONE_LARGE} from '../breakpoints';

import './WebexLocalMedia.scss';

/**
 * Webex Local Media component displays the user's local video.
 *
 * @param {string} props.meetingID  ID of the meeting from which to obtain local media
 * @returns {Object} JSX of the component
 */
export default function WebexLocalMedia({className, meetingID}) {
  const [mediaRef, {width}] = useElementDimensions();
  const {localVideo} = useMeeting(meetingID);
  const {ID} = useMe();
  const videoRef = useStream(localVideo);

  const classBaseName = `${WEBEX_COMPONENTS_CLASS_PREFIX}-local-media`;
  const mainClasses = {
    [classBaseName]: true,
    [`${classBaseName}-desktop`]: width >= PHONE_LARGE,
    [`${classBaseName}-no-media`]: localVideo === null,
    [className]: !!className,
  };
  const disabledVideo = ID ? <WebexAvatar personID={ID} displayStatus={false} /> : <Spinner />;

  return (
    <div ref={mediaRef} className={classNames(mainClasses)}>
      {localVideo ? <video ref={videoRef} playsInline autoPlay /> : disabledVideo}
    </div>
  );
}

WebexLocalMedia.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
};

WebexLocalMedia.defaultProps = {
  className: '',
};
