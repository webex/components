import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {WebexLocalMedia, WebexRemoteMedia} from '../';
import {useElementDimensions} from '../hooks';
import {TABLET, DESKTOP} from '../breakpoints';

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
    'in-meeting-tablet': width >= TABLET && width < DESKTOP,
    'in-meeting-desktop': width >= DESKTOP,
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
