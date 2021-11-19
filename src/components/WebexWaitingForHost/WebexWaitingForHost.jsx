import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import Icon from '../generic/Icon/Icon';
import {Button} from '../generic';
import WebexLocalMedia from '../WebexLocalMedia/WebexLocalMedia';
import WebexMeetingInfo from '../WebexMeetingInfo/WebexMeetingInfo';
import webexComponentClasses from '../helpers';
import {useMeeting} from '../hooks';
import {AdapterContext} from '../hooks/contexts';

/**
 * A component to be displayed while the user is waiting for the host to start the meeting.
 * It shows a waiting message and the local video stream (if available).
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting for which to show media
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexWaitingForHost({className, meetingID, style}) {
  const [cssClasses, sc] = webexComponentClasses('waiting-for-host', className);
  const adapter = useContext(AdapterContext);
  const {ID} = useMeeting(meetingID);
  const buttonHint = 'Leave the meeting to stop waiting for the host. To return to the meeting after leaving, refresh the web browser and join again.';

  return (
    <div className={cssClasses} style={style}>
      <WebexMeetingInfo className={sc('info')} meetingID={meetingID} />
      <div className={sc('content')}>
        <div className={sc('icon')}><Icon name="waiting-for-host" size={120} ariaLabel="Waiting for meeting rocket illustration" /></div>
        <div className={sc('text')}>Thank you for waiting. We’ll start the meeting when the host joins.</div>
        <Button
          type="default"
          size={40}
          onClick={() => adapter.meetingsAdapter.leaveMeeting(ID)}
          tooltip="Leave meeting"
          ariaLabel={buttonHint}
          tabIndex={1}
        >
          Leave meeting
        </Button>
      </div>
      <WebexLocalMedia className={sc('local-media')} meetingID={meetingID} mediaType="video" />
    </div>
  );
}

WebexWaitingForHost.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexWaitingForHost.defaultProps = {
  className: '',
  style: undefined,
};
