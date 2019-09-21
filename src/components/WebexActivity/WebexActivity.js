import React from 'react';
import PropTypes from 'prop-types';

import {useActivity} from '../hooks';

import ActivityHeader from './ActivityHeader';
import './WebexActivity.scss';

/**
 * WebexActivity component displays activity content.
 *
 * @param {object} props
 * @returns {object} JSX of the component
 */
export default function WebexActivity({activityID}) {
  const {ID, text, created, displayHeader, personID} = useActivity(activityID);
  const header = displayHeader ? <ActivityHeader personID={personID} timestamp={created} /> : null;

  return (
    <div className="activity" key={ID}>
      {header}
      <div className="activity-content">{text}</div>
    </div>
  );
}

WebexActivity.propTypes = {
  activityID: PropTypes.string.isRequired,
};
