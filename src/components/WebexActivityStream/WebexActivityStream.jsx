import PropTypes from 'prop-types';
import React, {useRef} from 'react';
import {RoomType} from '@webex/component-adapter-interfaces';

import WebexActivity from '../WebexActivity/WebexActivity';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import {PREPEND_ACTIVITIES} from '../hooks/useActivityStream';
import {
  useActivityStream,
  useActivityScroll,
  useOverflowActivities,
  useRoom,
} from '../hooks';

import Greeting from './Greeting';
import TimeRuler from './TimeRuler';

/**
 * Webex Activity Stream component displays all activities that
 * happened on the given room ID. While mounted, the component
 * listens for activity updates to the room and also displays
 * those as they come in.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.roomID  ID of the room for which to display activities
 * @returns {object} JSX of the component
 */
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
      <TimeRuler key={activity.date} date={activity.date} />
    ) : (
      <WebexActivity key={activity} activityID={activity} />
    );

    return activityComponent;
  });

  return (
    <div className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-activity-stream`} ref={activityStreamRef}>
      {showLoader && <div className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-activity-stream-loader`} />}
      {activities.length ? <>{activities}</> : <Greeting personName={personName} />}
      <div className="last-activity" ref={lastActivityRef} />
    </div>
  );
}

WebexActivityStream.propTypes = {
  roomID: PropTypes.string.isRequired,
};
