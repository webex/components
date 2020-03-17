import React from 'react';
import PropTypes from 'prop-types';
import {format} from 'date-fns';
import {Spinner} from '@momentum-ui/react';

import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import {useMeeting} from '../hooks';

import './WebexMeetingInfo.scss';

/**
 * Formats a start and end date to a readable string.
 * Example: "5:00 PM - 6:00 PM"
 *
 * @export
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {String} formatted time range
 */
export function formatMeetingTime(startDate, endDate) {
  const formattedStartTime = format(startDate, 'p');
  const formattedEndTime = format(endDate, 'p');

  return `${formattedStartTime} - ${formattedEndTime}`;
}

/**
 * Webex Meeting Info component displays the information associated with
 * a given meetingID.
 *
 * @param {object} props
 * @returns {object} JSX of the component
 */
export default function WebexMeetingInfo({meetingID}) {
  const {ID, startTime, endTime, title} = useMeeting(meetingID);
  let infoComponent;

  if (ID) {
    const meetingTime = startTime ? <h3>{formatMeetingTime(new Date(startTime), new Date(endTime))}</h3> : null;
    const displayTitle = title || 'No Meeting Information';

    infoComponent = (
      <React.Fragment>
        <h2>{displayTitle}</h2>
        {meetingTime}
      </React.Fragment>
    );
  } else {
    infoComponent = (
      <React.Fragment>
        <Spinner />
      </React.Fragment>
    );
  }

  return <div className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-meeting-info`}>{infoComponent}</div>;
}

WebexMeetingInfo.propTypes = {
  meetingID: PropTypes.string.isRequired,
};
