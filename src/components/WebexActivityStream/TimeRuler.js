import React from 'react';
import PropTypes from 'prop-types';
import {ListSeparator} from '@momentum-ui/react';
import format from 'date-fns/format';
import isSameWeek from 'date-fns/isSameWeek';
import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';

import './TimeRuler.scss';

/**
 * Returns a formatted timestamp based on the given date's offset from the current time.
 *
 * Divisor for messages from today display today
 * Divisor for messages from dates from a previous day display as Yesterday
 * Divisor for messages of dates from a previous day of the week (but not yesterday) display as <day of the week>
 * Divisor for messages of dates older than a week from today display as M/D/YY
 *
 * @param {Date} timestamp Date instance to format
 * @returns {string} formattedDate
 */
export function formatTimeRulerText(timestamp) {
  let formattedDate;

  if (isToday(timestamp)) {
    formattedDate = 'Today';
  } else if (isYesterday(timestamp)) {
    // Yesterday
    formattedDate = 'Yesterday';
  } else if (isSameWeek(timestamp, new Date())) {
    // Monday
    formattedDate = format(timestamp, 'iiii');
  } else {
    // 1/1/2020
    formattedDate = format(timestamp, 'P');
  }

  return formattedDate;
}

export default function TimeRuler({date}) {
  const text = formatTimeRulerText(new Date(date));

  return <ListSeparator className="time-ruler" role="listitem" text={text} />;
}

TimeRuler.propTypes = {
  date: PropTypes.string.isRequired,
};
