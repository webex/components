import React from 'react';
import PropTypes from 'prop-types';

import webexComponentClasses from '../helpers';
import {useActivity} from '../hooks';
import WebexAdaptiveCard from '../WebexAdaptiveCard/WebexAdaptiveCard';

/**
 * Action to perform when submitting a card
 *
 * @callback submitCallback
 * @param {object} inputs  Data to submit
 * @param {Promise<object>} submitPromise  Promise that resolves to the submitted action
 */

/**
 * WebexAdaptiveCards component displays webex adaptive cards corresponding to an activity.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.activityID  ID of the activity corresponding to this cards
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {submitCallback} [props.onSubmit]  Action to perform when submitting a card
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexAdaptiveCards({
  activityID,
  className,
  onSubmit,
  style,
}) {
  const activity = useActivity(activityID);

  const [cssClasses, sc] = webexComponentClasses('adaptive-cards', className);

  return (
    <div className={cssClasses} style={style}>
      {activity.cards.map((_, index) => (
        <WebexAdaptiveCard
          key={index}
          activityID={activityID}
          className={sc('card')}
          cardIndex={index}
          onSubmit={(submitPromise, inputs) => onSubmit(index, submitPromise, inputs)}
        />
      ))}
    </div>
  );
}

WebexAdaptiveCards.propTypes = {
  activityID: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
  onSubmit: PropTypes.func,
};

WebexAdaptiveCards.defaultProps = {
  className: undefined,
  style: undefined,
  onSubmit: () => {},
};
