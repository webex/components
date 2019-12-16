import React from 'react';
import PropTypes from 'prop-types';
import {Spinner} from '@momentum-ui/react';

import {useMeeting} from '../hooks';

import {WebexLocalMedia, WebexMeetingInfo} from '..';

import './WebexInterstitialMeeting.css';

/**
 * Webex Interstitial component displays the user's local video and
 * meeting info, in preparation to joining a meeting.
 *
 * @param {object} props
 * @returns {object} JSX of the component
 */
export default function WebexInterstitialMeeting({meetingDestination}) {
  const {ID} = useMeeting(null, meetingDestination);

  return (
    <div className="interstitial-meeting">
      {ID ? (
        <React.Fragment>
          <WebexMeetingInfo meetingID={ID} />
          <WebexLocalMedia meetingID={ID} />
        </React.Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

WebexInterstitialMeeting.propTypes = {
  meetingDestination: PropTypes.string.isRequired,
};
