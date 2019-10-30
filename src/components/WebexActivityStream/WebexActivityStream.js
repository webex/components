import React, {Fragment, useRef} from 'react';
import PropTypes from 'prop-types';
import {ListSeparator} from '@momentum-ui/react';
import {RoomType} from '@webex/component-adapter-interfaces';
import {format, isToday, isSameWeek, isYesterday} from 'date-fns';

import {useActivityStream, useActivityScroll, useOverflowActivities, useRoom} from '../hooks';
import {PREPEND_ACTIVITIES} from '../hooks/useActivityStream';
import WebexActivity from '../WebexActivity/WebexActivity';

import Greeting from './Greeting';
import './WebexActivityStream.scss';

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
    formattedDate = 'today';
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

export function TimeRuler({text}) {
  return <ListSeparator className="time-ruler" role="listitem" text={text} />;
}

TimeRuler.propTypes = {
  text: PropTypes.string.isRequired,
};

export default function WebexActivityStream({roomID}) {
  const [activitiesData, dispatch] = useActivityStream(roomID);
  const loadPreviousActivities = (previousActivities) => {
    dispatch({type: PREPEND_ACTIVITIES, payload: previousActivities});
  };

  const {title, roomType} = useRoom(roomID);
  const activityStreamRef = useRef(null);
  const showLoader = useActivityScroll(roomID, activityStreamRef, loadPreviousActivities);
  const lastActivityRef = useOverflowActivities(roomID, activityStreamRef, loadPreviousActivities);

  const personName = roomType === RoomType.DIRECT ? title : '';
  const activities = activitiesData.map((activity) => {
    // If the activity is an object with a date property, it is a time ruler
    const activityComponent = activity.date ? (
      <TimeRuler key={activity.date.toString()} text={formatTimeRulerText(new Date(activity.date))} />
    ) : (
      <WebexActivity key={activity} activityID={activity} />
    );

    return activityComponent;
  });

  return (
    <div className="activity-stream" ref={activityStreamRef}>
      {showLoader && <div className="activity-stream-loader" />}
      {activities.length ? <Fragment>{activities}</Fragment> : <Greeting personName={personName} />}
      <div className="last-activity" ref={lastActivityRef} />
    </div>
  );
}

WebexActivityStream.propTypes = {
  roomID: PropTypes.string.isRequired,
};
