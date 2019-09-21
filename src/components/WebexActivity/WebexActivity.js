import React from 'react';
import PropTypes from 'prop-types';

import {useActivity} from '../hooks';

import ActivityHeader from './ActivityHeader';
import './WebexActivity.scss';

export default function WebexActivity({activityID}) {
  const {ID, text, created, displayHeader, personID} = useActivity(activityID);
  const header = displayHeader ? <ActivityHeader personID={personID} created={created} /> : null;

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
