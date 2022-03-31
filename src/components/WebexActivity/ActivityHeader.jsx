import React from 'react';
import PropTypes from 'prop-types';

import WebexAvatar from '../WebexAvatar/WebexAvatar';
import {usePerson} from '../hooks';
import webexComponentClasses, {formatMessageDate} from '../helpers';

/**
 * ActivityHeader component displays the header content of an activity.
 * Header includes the avatar of the activity author as well as the
 * activity timestamp.
 *
 * @param {object} props Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.personID  ID of the activity author
 * @param {object} props.style  Custom style to apply
 * @param {string} props.timestamp  Activity timestamp
 * @returns {object} JSX of the component
 */
export default function ActivityHeader({
  className,
  personID,
  style,
  timestamp,
}) {
  const {displayName} = usePerson(personID);

  const [cssClasses, sc] = webexComponentClasses('activity-header', className);

  return (
    <div className={cssClasses} style={style}>
      <WebexAvatar personID={personID} className={sc('avatar')} />
      <div className={sc('author')}>
        <span>{displayName}</span>
        <span className={sc('timestamp')}>{formatMessageDate(new Date(timestamp))}</span>
      </div>
    </div>
  );
}

ActivityHeader.propTypes = {
  className: PropTypes.string,
  personID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
  timestamp: PropTypes.string.isRequired,
};

ActivityHeader.defaultProps = {
  className: '',
  style: undefined,
};
