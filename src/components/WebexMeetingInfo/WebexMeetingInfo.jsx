import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {format} from 'date-fns';
import {Spinner} from '@momentum-ui/react';

import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import {useMeeting} from '../hooks';

/**
 * Formats a start and end date to a readable string.
 * Example: "5:00 PM - 6:00 PM"
 *
 * @param {Date} startDate  Meeting start time
 * @param {Date} endDate  Meeting end time
 * @returns {string} Formatted time range
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
 * @param {object} props  Data passed to the component
 * @param {string} props.meetingID  ID of the meeting
 * @param {string} props.className  Custome CSS class to apply
 * @returns {object} JSX of the component
 */
export default function WebexMeetingInfo({className, meetingID}) {
  const {
    ID,
    startTime,
    endTime,
    title,
  } = useMeeting(meetingID);
  const mainClasses = {
    [`${WEBEX_COMPONENTS_CLASS_PREFIX}-meeting-info`]: true,
    [className]: !!className,
  };
  let infoComponent = <Spinner />;

  if (ID) {
    const displayTitle = title || 'No Meeting Information';

    infoComponent = (
      <>
        <h2>{displayTitle}</h2>
        {
          startTime
          && endTime
          && <h3>{formatMeetingTime(new Date(startTime), new Date(endTime))}</h3>
        }
      </>
    );
  }

  return <div className={classNames(mainClasses)}>{infoComponent}</div>;
}

WebexMeetingInfo.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
};

WebexMeetingInfo.defaultProps = {
  className: '',
};
