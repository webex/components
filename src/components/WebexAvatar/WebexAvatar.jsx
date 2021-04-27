import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from '@momentum-ui/react';

import {usePerson} from '../hooks';

/**
 * Displays the avatar of a Webex user.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.personID  ID of the person for which to display avatar
 * @param {boolean} props.displayStatus  Whether or not to display the user's status
 *
 * @returns {object} JSX of the component
 */
export default function WebexAvatar({personID, displayStatus}) {
  const {avatar, displayName, status} = usePerson(personID);
  const type = displayStatus ? status : null;

  return <Avatar src={avatar} title={displayName} type={type} alt={displayName} />;
}

WebexAvatar.propTypes = {
  personID: PropTypes.string.isRequired,
  displayStatus: PropTypes.bool,
};

WebexAvatar.defaultProps = {
  displayStatus: true,
};
