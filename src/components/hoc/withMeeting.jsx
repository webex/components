import React from 'react';
import PropTypes from 'prop-types';

import {useMeetingDestination} from '../hooks';

/**
 * withMeeting is a higher-order component that takes a component (WrappedComponent)
 * and returns a new component (WithMeeting). The new component needs to be provided with a meeting destination
 * on the "meetingDestination" prop. The wrapped component will receive the meeting object on the "meeting" prop.
 *
 * Example:
 *
 * function OriginalComponent {
 *  return <div>Meeting id is {props.meeting.ID}</div>;
 *
 * }
 *
 * const EnhancedComponent = withMeeting(OriginalComponent);
 *
 * <EnhancedComponent meetingDestination="<MEETING_DESTINATION>" />
 *
 * @param {React.Component} WrappedComponent The component to wrap and enhance
 * @returns {React.Component} The enhanced component
 */
export default function withMeeting(WrappedComponent) {
  /**
   * @param {object} props  Data to be forwarded to WrappedComponent
   * @param {string} props.meetingDestination Virtual location where the meeting should take place
   * @returns {object} JSX of the component
   */
  function WithMeeting(props) {
    const {meetingDestination} = props;
    const meeting = useMeetingDestination(meetingDestination);

    return <WrappedComponent meeting={meeting} {...props} />;
  }

  WithMeeting.propTypes = {
    meetingDestination: PropTypes.string.isRequired,
  };

  return WithMeeting;
}
