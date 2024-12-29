/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {MeetingContext} from '../hooks';

/**
 * Provides a meeting context to the wrapped component.
 *
 * @param {object} props  Data passed to the provider
 * @param {React.Component} props.children  Component children to wrap
 * @returns {React.Component} Component with access to the meeting context
 */
export default function WebexMeetingProvider({children}) {
    const [meetingPinPasswd, setMeetingPinPasswd] = useState('');
    const [participantName, setParticipantName] = useState('');
    return <MeetingContext.Provider value={{meetingPinPasswd, setMeetingPinPasswd, participantName, setParticipantName}}>{children}</MeetingContext.Provider>;
}

WebexMeetingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
