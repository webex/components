import React from 'react';
import PropTypes from 'prop-types';

export const MeetingContext = React.createContext();

/**
 * WebexMeetingControls is a higher-order component that pass a meeting
 * context to several WebexMeetingControl components.
 *
 * @param {object} props
 * @returns {object} JSX of the component
 */
export default function WebexMeetingControls({meetingID, children}) {
  return (
    <MeetingContext.Provider value={meetingID}>
      <div className="meeting-controls">{children}</div>
    </MeetingContext.Provider>
  );
}

WebexMeetingControls.propTypes = {
  meetingID: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
