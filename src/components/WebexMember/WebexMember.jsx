import React from 'react';
import PropTypes from 'prop-types';

import {usePerson, useMembers} from '../hooks';
import WebexAvatar from '../WebexAvatar/WebexAvatar';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';

/**
 * Displays a webex meeting member.
 *
 * @param {string} props.destinationType Type of destination of the membership roster
 * @param {string} props.destinationID  ID of the destination for which to get members
 * @param {string} props.id  ID of the person for which to display avatar
 * @param {boolean} props.displayStatus  Whether or not to display the user's status
 *
 * @returns {object} JSX of the component
 */
export default function WebexMember({
  destinationType,
  destinationID,
  id,
  displayStatus,
}) {
  const {firstName, lastName} = usePerson(id);
  const members = useMembers(destinationID, destinationType);
  const member = members
    .find((itemMember) => itemMember.id === id);

  const isMuted = member && member.muted;

  return (
    <div className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-member`}>
      <WebexAvatar id={id} displayStatus={displayStatus} />
      <div className="member-name">{`${firstName} ${lastName}`}</div>
      {isMuted && <div className="member-muted"><span className="icon icon-microphone-muted_24" /></div>}
    </div>
  );
}

WebexMember.propTypes = {
  destinationType: PropTypes.string.isRequired,
  destinationID: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  displayStatus: PropTypes.bool,
};

WebexMember.defaultProps = {
  displayStatus: false,
};
