import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from '@momentum-ui/react';

import {usePerson, useMembers} from '../hooks';
import WebexAvatar from '../WebexAvatar/WebexAvatar';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';

/**
 * Displays a webex meeting member.
 *
 * @param {string} props.destinationType Type of destination of the membership roster
 * @param {string} props.destinationID  ID of the destination for which to get members
 * @param {string} props.personID  ID of the person for which to display avatar
 * @param {boolean} props.displayStatus  Whether or not to display the user's status
 *
 * @returns {object} JSX of the component
 */
export default function WebexMember({
  destinationType,
  destinationID,
  personID,
  displayStatus,
}) {
  const {firstName, lastName} = usePerson(personID);
  const members = useMembers(destinationID, destinationType);
  const member = members
    .find((itemMember) => itemMember.personID === personID);

  const isMuted = member && member.muted;

  return (
    <div className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-member`}>
      <WebexAvatar personID={personID} displayStatus={displayStatus} />
      <div className="details">
        <div className="name">{`${firstName} ${lastName}`}</div>
      </div>
      {isMuted && <Icon name="icon-microphone-muted_16" className="muted" />}
    </div>
  );
}

WebexMember.propTypes = {
  destinationType: PropTypes.string.isRequired,
  destinationID: PropTypes.string.isRequired,
  personID: PropTypes.string.isRequired,
  displayStatus: PropTypes.bool,
};

WebexMember.defaultProps = {
  displayStatus: false,
};
