import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from '@momentum-ui/react';

import webexComponentClasses from '../helpers';
import {usePerson} from '../hooks';

/**
 * Displays the avatar of a Webex user.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {boolean} props.displayStatus  Whether or not to display the user's status
 * @param {string} props.personID  ID of the person for which to display avatar
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 *
 */
export default function WebexAvatar({
  className,
  displayStatus,
  personID,
  style,
}) {
  const {avatar, displayName, status} = usePerson(personID);
  const type = displayStatus ? status : null;

  const cssClasses = webexComponentClasses('avatar', className);

  return (
    <Avatar
      src={avatar}
      title={displayName}
      type={type}
      alt={displayName}
      className={cssClasses}
      style={style}
    />
  );
}

WebexAvatar.propTypes = {
  className: PropTypes.string,
  displayStatus: PropTypes.bool,
  personID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexAvatar.defaultProps = {
  className: '',
  displayStatus: true,
  style: undefined,
};
