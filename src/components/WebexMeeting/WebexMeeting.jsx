import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Spinner} from '@momentum-ui/react';
import {MeetingState} from '@webex/component-adapter-interfaces';

import WebexInMeeting from '../WebexInMeeting/WebexInMeeting';
import WebexInterstitialMeeting from '../WebexInterstitialMeeting/WebexInterstitialMeeting';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import {useMeeting} from '../hooks';

/**
 * Webex Meeting component displays the default Webex meeting experience.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.meetingID  ID of the meeting
 * @returns {object} JSX of the component
 */
export default function WebexMeeting({meetingID}) {
  const {ID, state} = useMeeting(meetingID);
  const {JOINED, LEFT} = MeetingState;
  const isActive = state === JOINED;

  const classBaseName = `${WEBEX_COMPONENTS_CLASS_PREFIX}-meeting`;
  const mainClasses = {
    [classBaseName]: true,
  };

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
    <div className={classNames(mainClasses)}>
      {meetingDisplay}
    </div>
  );
}

WebexMeeting.propTypes = {
  meetingID: PropTypes.string.isRequired,
};
