import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {useElementDimensions} from '../hooks';

import {WebexLocalMedia, WebexRemoteMedia} from '..';

import './WebexInMeeting.scss';

/**
 * Webex In-Meeting component displays the remote stream plus
 * the local stream at the bottom right corner.
 *
 * @param {string} props.meetingID  ID of the meeting for which to show media
 * @returns {Object} JSX of the component
 */
export default function WebexInMeeting({meetingID}) {
  const [meetingRef, {width}] = useElementDimensions();
  const cssClasses = classNames({
    'in-meeting': true,
    'in-meeting-tablet': width >= 768 && width < 1024, // Standard tablet size
    'in-meeting-desktop': width >= 1024,
  });

  return (
    <div ref={meetingRef} className={cssClasses}>
      <WebexRemoteMedia meetingID={meetingID} />
      <WebexLocalMedia meetingID={meetingID} />
    </div>
  );
}

WebexInMeeting.propTypes = {
  meetingID: PropTypes.string.isRequired,
};
