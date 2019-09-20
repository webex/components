import React from 'react';
import PropTypes from 'prop-types';
import {format, isToday, isSameWeek, isYesterday} from 'date-fns';

import WebexAvatar from '../WebexAvatar/WebexAvatar';
import {useActivity, usePerson} from '../hooks';

import './WebexActivity.scss';

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
    // Yesterday 12:00 PM
    formattedDate = `Yesterday ${format(timestamp, 'p')}`;
  } else if (isSameWeek(timestamp, new Date())) {
    // Monday 12:00 PM
    formattedDate = format(timestamp, 'iiii p');
  } else {
    // 1/1/2020 12:00 PM
    formattedDate = format(timestamp, 'P p');
  }

  return formattedDate;
}

export function Header({personID, adapter, created}) {
  const {displayName} = usePerson(personID, adapter);

  return (
    <div className="activity-header">
      <WebexAvatar personID={personID} adapter={adapter} />
      <div className="activity-author">
        <span>{displayName}</span>
        <span className="activity-timestamp">{formatMessageDate(new Date(created))}</span>
      </div>
    </div>
  );
}

Header.propTypes = {
  personID: PropTypes.string.isRequired,
  adapter: PropTypes.object.isRequired,
  created: PropTypes.string.isRequired,
};

export default function WebexActivity({activityID, adapters}) {
  const {created, displayHeader, ID, personID, text} = useActivity(activityID, adapters.activitiesAdapter);
  const header = displayHeader ? (
    <Header personID={personID} adapter={adapters.peopleAdapter} created={created} />
  ) : null;

  return (
    <div className="activity" key={ID}>
      {header}
      <div className="activity-content">{text}</div>
    </div>
  );
}

WebexActivity.propTypes = {
  activityID: PropTypes.string.isRequired,
  adapters: PropTypes.exact({
    activitiesAdapter: PropTypes.object.isRequired,
    peopleAdapter: PropTypes.object.isRequired,
  }).isRequired,
};
