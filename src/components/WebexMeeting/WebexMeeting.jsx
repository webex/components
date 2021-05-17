import React from 'react';
import PropTypes from 'prop-types';
import {Spinner} from '@momentum-ui/react';
import {MeetingState} from '@webex/component-adapter-interfaces';

import WebexInMeeting from '../WebexInMeeting/WebexInMeeting';
import WebexInterstitialMeeting from '../WebexInterstitialMeeting/WebexInterstitialMeeting';
import webexComponentClasses from '../helpers';
import {useMeeting} from '../hooks';

/**
 * Webex Meeting component displays the default Webex meeting experience.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 */

export default function WebexMeeting({className, meetingID, style}) {
  const {ID, state} = useMeeting(meetingID);
  const {JOINED, LEFT} = MeetingState;
  const isActive = state === JOINED;

  const cssClasses = webexComponentClasses('meeting', className);

  let meetingDisplay;

  // A meeting with a falsy state means that the meeting has not been created
  if (!state) {
    meetingDisplay = <Spinner />;
  } else if (state === LEFT) {
    meetingDisplay = "You've successfully left the meeting";
  } else {
    meetingDisplay = (
      <>
        {isActive
          ? <WebexInMeeting meetingID={ID} />
          : <WebexInterstitialMeeting meetingID={ID} />}
      </>
    );
  }

  return (
    <div className={cssClasses} style={style}>
      {meetingDisplay}
    </div>
  );
}

WebexMeeting.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexMeeting.defaultProps = {
  className: '',
  style: undefined,
};
