import React from 'react';
import PropTypes from 'prop-types';
import {Spinner} from '@momentum-ui/react';

import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';

import Modal from '../generic/Modal/Modal';
import WebexLocalMedia from '../WebexLocalMedia/WebexLocalMedia';
import WebexMeetingInfo from '../WebexMeetingInfo/WebexMeetingInfo';
import WebexMediaAccess from '../WebexMediaAccess/WebexMediaAccess';
import {useMeeting} from '../hooks';

/**
 * Webex Interstitial component displays the user's local video and
 * meeting info, in preparation to joining a meeting.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.meetingID  ID of the meeting
 * @returns {object} JSX of the component
 */
export default function WebexInterstitialMeeting({meetingID}) {
  const {videoPermission} = useMeeting(meetingID);

  return (
    <div className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-interstitial-meeting`}>
      {meetingID ? (
        <>
          <WebexMeetingInfo className="interstitial-meeting-info" meetingID={meetingID} />
          <WebexLocalMedia className="interstitial-media" meetingID={meetingID} mediaType="video" />
          {videoPermission === 'ASKING' && (
            <Modal>
              <WebexMediaAccess meetingID={meetingID} />
            </Modal>
          )}
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
