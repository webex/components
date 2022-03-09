import PropTypes from 'prop-types';
import React from 'react';

import WebexActivity from '../WebexActivity/WebexActivity';
import webexComponentClasses from '../helpers';
import Loader from '../generic/Loader/Loader';
import {PREPEND_ACTIVITIES} from '../hooks/useActivityStream';
import {
  useActivityStream,
  useActivityScroll,
  useOverflowActivities,
  useRef,
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
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.roomID  ID of the room for which to display activities
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexActivityStream({className, roomID, style}) {
  const [activitiesData, dispatch] = useActivityStream(roomID);
  const loadPreviousActivities = (previousActivities) => {
    dispatch({type: PREPEND_ACTIVITIES, payload: previousActivities});
  };

  const activityStreamRef = useRef();
  const showLoader = useActivityScroll(roomID, activityStreamRef, loadPreviousActivities);
  const lastActivityRef = useOverflowActivities(roomID, activityStreamRef, loadPreviousActivities);

  const [cssClasses, sc] = webexComponentClasses('activity-stream', className);

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
    <div className={cssClasses} ref={activityStreamRef} style={style}>
      {showLoader && <Loader />}
      {activities.length ? <>{activities}</> : <Greeting />}
      <div className={sc('last-activity')} ref={lastActivityRef} />
    </div>
  );
}

WebexActivityStream.propTypes = {
  className: PropTypes.string,
  roomID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexActivityStream.defaultProps = {
  className: '',
  style: undefined,
};
