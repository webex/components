import React from 'react';
import PropTypes from 'prop-types';
import {List} from '@momentum-ui/react';

import WebexParticipant from '../WebexParticipant/WebexParticipant';
import useParticipants from '../hooks/useParticipants';

/**
 * Displays the roster of Webex meeting or room participants.
 *
 * @param {string} props.location  the roster of Webex meeting or room participants.
 *
 * @returns {object} JSX of the component
 */
export default function WebexParticipantRoster({destination}) {
  const participants = useParticipants(destination);

  const participantList = participants.map((participant) => <WebexParticipant personID={participant.personID} />);

  return <List>{participantList}</List>;
}

WebexParticipantRoster.propTypes = {
  destination: PropTypes.string.isRequired,
};
