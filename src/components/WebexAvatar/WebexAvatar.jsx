import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {PersonStatus} from '@webex/component-adapter-interfaces';
import Icon from '../generic/Icon/Icon';
import Loader from '../generic/Loader/Loader';
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
  const initials = displayName?.split(' ').map((name) => name.charAt(0)).slice(0, 2).join('');
  const iconName = statusIcons[status];
  const isSelf = status === PersonStatus.SELF;
  const isBot = status === PersonStatus.BOT;
  const isTyping = status === PersonStatus.TYPING;
  const hasPlaceholder = !isSelf;
  const hasImage = avatar && !isSelf;
  const hasStatus = displayStatus && (!isBot && !isSelf) && iconName;
  const [cssClasses, sc] = webexComponentClasses('avatar', className, {
    'avatar-self': isSelf,
  });
  const placeholderClassName = `${sc('placeholder')} ${sc('placeholder')}-${randomPlaceholder}`;
  const statusClassName = sc(`status-${status}`);

  return (
    <div className={cssClasses} style={style}>
      <div className={sc('content')}>
        {isTyping && displayStatus && <Loader />}
        {hasPlaceholder
          && (
            <svg viewBox="0 0 40 40" className={placeholderClassName}>
              <text x="50%" y="50%">
                {displayName === ' ' ? '??' : initials}
              </text>
            </svg>
          )}
        {hasImage
          && <img className={imageError ? sc('image-error') : sc('image')} src={avatar} alt="avatar" onError={() => setImageError(true)} />}
        {hasStatus
          && (
            <div className={sc('status-icon-container')}>
              <Icon name={iconName} className={`${sc('status-icon')} ${statusClassName}`} />
            </div>
          )}
        {isBot && displayStatus && (
          <svg viewBox="0 0 26 26" className={sc('bot-badge')}>
            <text x="50%" y="57%">Bot</text>
          </svg>
        )}
        {isSelf && displayStatus && (
          <Icon name="chat-filled" className={sc('self-icon')} />
        )}
      </div>
    </div>
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
