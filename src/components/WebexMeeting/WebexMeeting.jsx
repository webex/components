import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Spinner} from '@momentum-ui/react';
import {MeetingState} from '@webex/component-adapter-interfaces';

import Modal from '../generic/Modal/Modal';
import WebexInMeeting from '../WebexInMeeting/WebexInMeeting';
import WebexInterstitialMeeting from '../WebexInterstitialMeeting/WebexInterstitialMeeting';
import WebexSettings from '../WebexSettings/WebexSettings';
import webexComponentClasses from '../helpers';
import {useMeeting} from '../hooks';
import {AdapterContext} from '../hooks/contexts';

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
  const {ID, state, showSettings} = useMeeting(meetingID);
  const {JOINED, LEFT} = MeetingState;
  const isActive = state === JOINED;
  const adapter = useContext(AdapterContext);

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
          ? <WebexInMeeting meetingID={ID} className="inner-meeting" />
          : <WebexInterstitialMeeting meetingID={ID} className="inner-meeting" />}
      </>
    );
  }

  return (
    <div className={cssClasses} style={style}>
      {meetingDisplay}
      {showSettings && (
        <Modal
          onClose={() => adapter.meetingsAdapter.toggleSettings(ID)}
          title="Settings"
        >
          <WebexSettings meetingID={ID} />
        </Modal>
      )}
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
