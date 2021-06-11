import PropTypes from 'prop-types';

import {useMeeting} from '../hooks';

/**
 * WebexMeetingIf
 *
 * This helper component makes it easy for developers to add content conditionally,
 * depending on the current meeting's state, without obtaining the meeting object with
 * the adapter getMeeting() function or the useMeeting() hook.
 *
 * Example:
 *
 * <WebexMeetingIf meetingID="someid" condition={meeting => meeting.state !== 'LEFT'}>
 *  <WebexMeetingControlBar controls={...} />
 * </WebexMeetingIf>
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.meetingID  ID of the meeting
 * @param {{function(meeting: object): boolean}} props.condition  Function that returns true or false
 * @returns {object} JSX of the component
 */
export default function WebexMeetingIf({children, condition, meetingID}) {
  const meeting = useMeeting(meetingID);

  return (
    condition(meeting) ? children : ''
  );
}

WebexMeetingIf.propTypes = {
  children: PropTypes.node.isRequired,
  condition: PropTypes.func.isRequired,
  meetingID: PropTypes.string.isRequired,
};
