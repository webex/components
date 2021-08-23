import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../generic/Spinner/Spinner';

import webexComponentClasses from '../helpers';

import WebexLocalMedia from '../WebexLocalMedia/WebexLocalMedia';
import WebexMeetingInfo from '../WebexMeetingInfo/WebexMeetingInfo';
import {useElementDimensions} from '../hooks';

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
  const [meetingRef, {height}] = useElementDimensions();
  const [maxWidth, setMaxWidth] = useState('none');

  useEffect(() => {
    setMaxWidth(height ? (height * 16) / 9 - 1 : 'none');
  }, [height]);

  return (
    <div ref={meetingRef} className={cssClasses} style={style}>
      {meetingID ? (
        <div style={{maxWidth}} className="media-container">
          <WebexMeetingInfo className="interstitial-meeting-info" meetingID={meetingID} />
          <WebexLocalMedia className="interstitial-media" banner="My preview" meetingID={meetingID} mediaType="video" />
        </div>
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
