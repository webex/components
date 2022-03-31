import React from 'react';
import PropTypes from 'prop-types';

import {useActivity} from '../hooks';

import Activity from '../generic/Activity/Activity';
import WebexAdaptiveCards from '../WebexAdaptiveCards/WebexAdaptiveCards';

/**
 * WebexActivity component displays activity content.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.activityID  ID of the activity
 * @param {string} props.className  Custom CSS class to apply
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexActivity({activityID, className, style}) {
  const activity = useActivity(activityID);

  return (
    <>
      <Activity
        {...activity}
        className={className}
        style={style}
        isReply={!!activity.parentID}
      >
        {activity.cards && <WebexAdaptiveCards activityID={activityID} />}
      </Activity>
      {activity.replyIDs && activity.replyIDs.map((id) => (
        <WebexActivity activityID={id} key={id} />
      ))}
    </>
  );
}

WebexActivity.propTypes = {
  activityID: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

WebexActivity.defaultProps = {
  className: '',
  style: undefined,
};
