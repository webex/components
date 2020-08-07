import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@momentum-ui/react/lib/ListItem';

import {usePerson} from '../hooks';
import WebexAvatar from '../WebexAvatar/WebexAvatar';
import './WebexParticipant.scss';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';

/**
 * Displays a webex meeting participant.
 *
 * @param {string} props.personID  ID of the person for which to display avatar
 * @param {boolean} props.displayStatus  Whether or not to display the user's status
 *
 * @returns {object} JSX of the component
 */
export default function WebexParticipant({personID, displayStatus}) {
  const {firstName, lastName} = usePerson(personID);

  return (
    <ListItem className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-participant`}>
      <WebexAvatar personID={personID} displayStatus={displayStatus} />
      <div className="participant-name">{`${firstName} ${lastName}`}</div>
    </ListItem>
  );
}

WebexParticipant.propTypes = {
  personID: PropTypes.string.isRequired,
  displayStatus: PropTypes.bool,
};

WebexParticipant.defaultProps = {
  displayStatus: false,
};
