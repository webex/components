import React from 'react';
import PropTypes from 'prop-types';

import {WebexLocalMedia, WebexRemoteMedia} from '..';

import './WebexInMeeting.css';

/**
 * Webex In-Meeting component displays the remote stream plus
 * the local stream at the bottom right corner.
 *
 * @param {object} props
 * @returns {object} JSX of the component
 */
export default function WebexInMeeting({meetingID}) {
  return (
    <div className="in-meeting">
      <WebexRemoteMedia meetingID={meetingID} />
      <WebexLocalMedia meetingID={meetingID} />
    </div>
  );
}

WebexInMeeting.propTypes = {
  meetingID: PropTypes.string.isRequired,
};
