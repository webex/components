/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Badge, Spinner, AlertBanner} from '@momentum-ui/react';

import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import {useMeeting, useMemberships} from '../hooks';
import RemoteMediaDisplay from './RemoteMediaDisplay';
import './WebexRemoteMedia.scss';

/**
 * Webex Remote Media component displays the meeting's remote video
 *
 * @param {object} props
 * @param {string} props.className
 * @param {string} props.meetingID
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
  const members = useMemberships(meetingID, 'meeting');
  const hasOtherMembers = members.length > 1;
  const hasMedia = !!(remoteAudio || remoteVideo || remoteShare);
  const hasTwoMedia = remoteVideo && remoteShare;
  const mainClasses = {
    [`${WEBEX_COMPONENTS_CLASS_PREFIX}-remote-media`]: true,
    [className]: !!className,
    'split-screen': hasTwoMedia,
  };
  let remoteDisplay;

  if (error) {
    remoteDisplay = (
      <AlertBanner show type="warning">
        Having trouble joining the meeting? Please check your connection.
      </AlertBanner>
    );
  } else if (hasMedia && hasOtherMembers) {
    remoteDisplay = (
      <RemoteMediaDisplay
        remoteAudio={remoteAudio}
        remoteVideo={remoteVideo}
        remoteShare={remoteShare}
      />
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
    <div className={classNames(mainClasses)}>
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
