import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from '@momentum-ui/react';

import {usePerson} from '../hooks';

/**
 * Displays the avatar of a Webex user.
 *
 * @param {string} props.id  ID of the person for which to display avatar
 * @param {boolean} props.displayStatus  Whether or not to display the user's status
 *
 * @returns {object} JSX of the component
 */
export default function WebexAvatar({id, displayStatus}) {
  const {avatar, displayName, status} = usePerson(id);
  const type = displayStatus ? status : null;

  return <Avatar src={avatar} title={displayName} type={type} alt={displayName} />;
}

WebexAvatar.propTypes = {
  id: PropTypes.string.isRequired,
  displayStatus: PropTypes.bool,
};

WebexAvatar.defaultProps = {
  displayStatus: true,
};
