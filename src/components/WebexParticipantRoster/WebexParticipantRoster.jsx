import React from 'react';
import PropTypes from 'prop-types';
import {List} from '@momentum-ui/react';

import WebexParticipant from '../WebexParticipant/WebexParticipant';
import useMemberships from '../hooks/useMemberships';

/**
 * Displays the roster of Webex meeting or room participants.
 *
 * @param {string} props.location  the roster of Webex meeting or room participants.
 *
 * @returns {object} JSX of the component
 */
export default function WebexParticipantRoster({destination}) {
  const participants = useMemberships(destination);

  const participantList = participants.map((participant) => (
    <WebexParticipant key={participant.personID} personID={participant.personID} />
  ));

  return <List>{participantList}</List>;
}

WebexParticipantRoster.propTypes = {
  destination: PropTypes.string.isRequired,
};
