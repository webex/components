import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Spinner} from '@momentum-ui/react';

import {useMeeting} from '../hooks';

import {WebexInMeeting, WebexInterstitialMeeting, WebexMeetingControl, WebexMeetingControls} from '..';

import './WebexMeeting.css';

/**
 * Webex Meeting component displays the default Webex meeting experience.
 *
 * @param {object} props
 * @returns {object} JSX of the component
 */
export default function WebexMeeting({meetingDestination, controls}) {
  const {ID} = useMeeting(null, meetingDestination);
  // Subscribe to meeting updates after meeting creation
  const {remoteVideo} = useMeeting(ID);
  const isActive = remoteVideo !== null;
  const meetingControls = controls(isActive).map((key) => <WebexMeetingControl key={key} type={key} />);

  return (
    <div className="meeting">
      {ID ? (
        <Fragment>
          {isActive ? <WebexInMeeting meetingID={ID} /> : <WebexInterstitialMeeting meetingID={ID} />}
          <WebexMeetingControls meetingID={ID}>{meetingControls}</WebexMeetingControls>
        </Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

WebexMeeting.propTypes = {
  meetingDestination: PropTypes.string.isRequired,
  controls: PropTypes.func,
};

WebexMeeting.defaultProps = {
  /**
   * A function that returns an array of control names for the meeting.
   * Control name must match with the adapter implementation of the control.
   *
   * @param {boolean} isActive  Whether or not the meeting is active
   */
  // eslint-disable-next-line no-confusing-arrow
  controls: (isActive) =>
    isActive ? ['mute-audio', 'mute-video', 'leave-meeting'] : ['mute-audio', 'mute-video', 'join-meeting'],
};
