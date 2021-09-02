import React from 'react';
import PropTypes from 'prop-types';
import {
  format,
  isToday,
  isSameWeek,
  isYesterday,
} from 'date-fns';

import WebexAvatar from '../WebexAvatar/WebexAvatar';
import {usePerson} from '../hooks';
import webexComponentClasses from '../helpers';

/**
 * Returns a formatted timestamp based on the given date's offset from the current time.
 *
 * @param {Date} timestamp Date instance to format
 * @returns {string} formattedDate
 */
export function formatMessageDate(timestamp) {
  let formattedDate;

  if (isToday(timestamp)) {
    // 12:00 PM
    formattedDate = format(timestamp, 'p');
  } else if (isYesterday(timestamp)) {
    // Yesterday, 12:00 PM
    formattedDate = `Yesterday, ${format(timestamp, 'p')}`;
  } else if (isSameWeek(timestamp, new Date())) {
    // Monday, 12:00 PM
    formattedDate = format(timestamp, 'iiii, p');
  } else {
    // 1/1/2020, 12:00 PM
    formattedDate = format(timestamp, 'P, p');
  }

  return formattedDate;
}

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

  const cssClasses = webexComponentClasses('activity-header', className);

  return (
    <div className={cssClasses} style={style}>
      <WebexAvatar personID={personID} className="activity-avatar" />
      <div className="activity-author">
        <span>{displayName}</span>
        <span className="activity-timestamp">{formatMessageDate(new Date(timestamp))}</span>
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
