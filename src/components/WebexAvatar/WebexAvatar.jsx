import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Avatar} from '@momentum-ui/react';
import {PersonStatus} from '@webex/component-adapter-interfaces';
import Icon from '../generic/Icon/Icon';
import webexComponentClasses from '../helpers';
import {usePerson} from '../hooks';

const statusIcons = {
  active: 'unread',
  call: 'camera-presence',
  dnd: 'dnd-presence',
  inactive: 'recents-presence',
  meeting: 'meetings-presence',
  ooo: 'pto-presence',
  presenting: 'share-screen-filled',
};

const numberOfPlaceholders = 11;

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
  const [randomPlaceholder] = useState(
    () => Math.floor(Math.random() * numberOfPlaceholders) + 1,
  );
  const [imageError, setImageError] = useState(false);
  const type = displayStatus ? status : null;
  const initials = displayName?.split(' ').map((name) => name.charAt(0)).slice(0, 2).join('');
  const placeholderClassName = `placeholder placeholder-${randomPlaceholder}`;
  const cssClasses = webexComponentClasses('avatar', className);
  const iconName = statusIcons[status];
  const statusClassName = `status-${status}`;

  return (
    <>
      <div className={cssClasses} style={style}>
        <div className="avatar-content">
          <svg viewBox="0 0 40 40" className={placeholderClassName}>
            <text x="50%" y="50%">
              {displayName === ' ' ? '??' : initials}
            </text>
          </svg>
          {avatar
            && <img className={imageError ? 'image-error' : ''} src={avatar} alt="avatar" onError={() => setImageError(true)} />}
          {displayStatus && status !== PersonStatus.BOT && iconName && (
            <div className="status-icon-container">
              <Icon name={iconName} className={`status-icon ${statusClassName}`} />
            </div>
          )}
          {displayStatus && status === PersonStatus.BOT && (
            <svg viewBox="0 0 25 25" className="avatar-bot-badge">
              <text x="50%" y="52%">Bot</text>
            </svg>
          )}
        </div>
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
