import React from 'react';
import PropTypes from 'prop-types';

import webexComponentClasses from '../helpers';
import {useActivity} from '../hooks';

import ActivityHeader from './ActivityHeader';

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
  const {
    ID,
    created,
    displayHeader,
    personID,
    text,
  } = useActivity(activityID);
  const [cssClasses, sc] = webexComponentClasses('activity', className);

  return (
    <div className={cssClasses} key={ID} style={style}>
      {displayHeader && <ActivityHeader personID={personID} timestamp={created} />}
      <div className={sc('content')}>{text}</div>
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
