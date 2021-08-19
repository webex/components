import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from '@momentum-ui/react';
import Icon from '../generic/Icon/Icon';
import webexComponentClasses from '../helpers';
import {usePerson} from '../hooks';

const statusClassNames = {
  active: 'avatar-icon-active',
  call: 'avatar-icon-in-a-meeting',
  dnd: 'avatar-icon-dnd',
  inactive: 'avatar-icon-away',
  meeting: 'avatar-icon-in-a-meeting',
  ooo: 'avatar-icon-away',
  presenting: 'avatar-icon-dnd',
};

const statusIcons = {
  active: 'unread',
  call: 'camera-presence',
  dnd: 'dnd-presence',
  inactive: 'recents-presence',
  meeting: 'meetings-presence',
  ooo: 'pto-presence',
  presenting: 'share-screen-filled',
};

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

  let content;

  if (!avatar && !displayName && !status) {
    content = <> </>; // loading
  } else if (!avatar && displayName === ' ') {
    content = <> </>; // error
  } else {
    const iconName = statusIcons[status];
    const iconClassName = statusClassNames[status];

    if (!iconClassName) {
      console.error(`${iconClassName} avatar status is not defined. Available avatar stauses are "${Object.keys(statusClassNames).join(', ')}".`);
    }

    content = (
      <>
        <img src={avatar} alt="avatar" />
        {displayStatus && iconName && iconClassName && (
        <div className="status-icon-container">
          <Icon name={iconName} className={`status-icon ${iconClassName}`} />
        </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className={cssClasses} style={style}>
        {content}
      </div>
      <Avatar
        src={avatar}
        title={displayName}
        type={type}
        alt={displayName}
        className="wxc-old-avatar"
        style={style}
      />
    </>
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
