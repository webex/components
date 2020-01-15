import React from 'react';
import PropTypes from 'prop-types';
import {Spinner} from '@momentum-ui/react';

import {WebexLocalMedia, WebexMeetingInfo} from '..';

import './WebexInterstitialMeeting.css';

/**
 * Webex Interstitial component displays the user's local video and
 * meeting info, in preparation to joining a meeting.
 *
 * @param {object} props
 * @returns {object} JSX of the component
 */
export default function WebexInterstitialMeeting({meetingID}) {
  return (
    <div className="interstitial-meeting">
      {meetingID ? (
        <React.Fragment>
          <WebexMeetingInfo meetingID={meetingID} />
          <WebexLocalMedia meetingID={meetingID} />
        </React.Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

WebexInterstitialMeeting.propTypes = {
  meetingID: PropTypes.string.isRequired,
};
