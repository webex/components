import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../generic/Spinner/Spinner';

import webexComponentClasses from '../helpers';

import WebexLocalMedia from '../WebexLocalMedia/WebexLocalMedia';
import WebexMeetingInfo from '../WebexMeetingInfo/WebexMeetingInfo';

/**
 * Webex Interstitial component displays the user's local video and
 * meeting info, in preparation to joining a meeting.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexInterstitialMeeting({className, meetingID, style}) {
  const cssClasses = webexComponentClasses('interstitial-meeting', className);

  return (
    <div className={cssClasses} style={style}>
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
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexInterstitialMeeting.defaultProps = {
  className: '',
  style: undefined,
};
