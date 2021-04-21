import React from 'react';
import PropTypes from 'prop-types';
import {Spinner} from '@momentum-ui/react';

import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';

import WebexLocalMedia from '../WebexLocalMedia/WebexLocalMedia';
import WebexMeetingInfo from '../WebexMeetingInfo/WebexMeetingInfo';

/**
 * Webex Interstitial component displays the user's local video and
 * meeting info, in preparation to joining a meeting.
 *
 * @param {object} props
 * @returns {object} JSX of the component
 */
export default function WebexInterstitialMeeting({meetingID}) {
  return (
    <div className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-interstitial-meeting`}>
      {meetingID ? (
        <>
          <WebexMeetingInfo className="interstitial-meeting-info" meetingID={meetingID} />
          <WebexLocalMedia className="interstitial-media" meetingID={meetingID} mediaType="video" />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

WebexInterstitialMeeting.propTypes = {
  meetingID: PropTypes.string.isRequired,
};
