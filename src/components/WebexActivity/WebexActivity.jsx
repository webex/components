import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import webexComponentClasses from '../helpers';
import {useActivity} from '../hooks';
import {AdapterContext} from '../hooks/contexts';

import ActivityHeader from './ActivityHeader';
import WebexAdaptiveCard from '../WebexAdaptiveCard/WebexAdaptiveCard';

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
  const adapter = useContext(AdapterContext);
  const hasCard = adapter.activitiesAdapter.hasAdaptiveCard(activity);

  const [cssClasses, sc] = webexComponentClasses('activity', className);

  return (
    <div className={cssClasses} key={activity.ID} style={style}>
      {activity.displayHeader && (
        <ActivityHeader personID={activity.personID} timestamp={activity.created} />
      )}
      <div className={sc('content')}>
        {activity.text}
        {hasCard && <WebexAdaptiveCard activityID={activity.ID} />}
      </div>
    </div>
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
