import React from 'react';
import PropTypes from 'prop-types';
import {
  format,
  isToday,
  isSameWeek,
  isYesterday,
} from 'date-fns';

import WebexAvatar from '../WebexAvatar/WebexAvatar';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import {usePerson} from '../hooks';

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
 * @param {object} props
 * @returns {object} JSX of the component
 */
export default function ActivityHeader({personID, timestamp}) {
  const {displayName} = usePerson(personID);

  return (
    <div className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-activity-header`}>
      <WebexAvatar personID={personID} />
      <div className="activity-author">
        <span>{displayName}</span>
        <span className="activity-timestamp">{formatMessageDate(new Date(timestamp))}</span>
      </div>
    </div>
  );
}

ActivityHeader.propTypes = {
  personID: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};
