import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {RoomType} from '@webex/component-adapter-interfaces';

import WebexActivity from '../WebexActivity/WebexActivity';
import webexComponentClasses from '../helpers';
import Loader from '../generic/Loader/Loader';
import {PREPEND_ACTIVITIES} from '../hooks/useActivityStream';
import {
  useActivityStream,
  useActivityScroll,
  useOverflowActivities,
  useRef,
  useRoom,
} from '../hooks';

import Greeting from './Greeting';
import TimeRuler from './TimeRuler';

/**
 * Memoize WebexActivity component to prevent re-rendering.
 *
 * @param {string} activity The activity ID
 * @returns {JSX} Comeponent
 */
const MemoWebexActivity = memo(({activity}) => {
  if (activity.date) {
    return <TimeRuler key={activity.date} date={activity.date} />;
  }

  return <WebexActivity activityID={activity} />;
});

MemoWebexActivity.defaultProps = {
  activity: undefined,
};
MemoWebexActivity.propTypes = {
  activity: PropTypes.string,
};

MemoWebexActivity.displayName = 'MemoWebexActivity';

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
  const {title, roomType} = useRoom(roomID);
  const activityStreamRef = useRef();

  const loadPreviousActivities = (previousActivities) => {
    dispatch({type: PREPEND_ACTIVITIES, payload: previousActivities});
  };

  const showLoader = useActivityScroll(roomID, activityStreamRef, loadPreviousActivities);
  const lastActivityRef = useOverflowActivities(roomID, activityStreamRef, loadPreviousActivities);

  const [cssClasses, sc] = webexComponentClasses('activity-stream', className);

  const personName = roomType === RoomType.DIRECT ? title : '';
  const activities = activitiesData.map(
    (activity) => <MemoWebexActivity key={activity} activity={activity} />,
  );

  return (
    <div className={cssClasses} ref={activityStreamRef} style={style}>
      {showLoader && <Loader />}
      {activities.length ? <>{activities}</> : <Greeting personName={personName} />}
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
