import React from 'react';
import PropTypes from 'prop-types';

import webexComponentClasses from '../helpers';
import {useAdaptiveCard} from '../hooks';
import AdaptiveCard from '../adaptive-cards/AdaptiveCard/AdaptiveCard';

/**
 * Action to perform when submitting a card
 *
 * @callback submitCallback
 * @param {object} inputs  Data to submit
 * @param {Promise<object>} submitPromise  Promise that resolves to the submitted action
 */

/**
 * WebexAdaptiveCard component displays a webex adaptive card.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.activityID  ID of the activity corresponding to this card
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {submitCallback} [props.onSubmit]  Action to perform when submitting a card
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexAdaptiveCard({
  activityID,
  className,
  onSubmit,
  style,
}) {
  const [card, submit] = useAdaptiveCard(activityID);
  const [cssClasses] = webexComponentClasses('adaptive-card', className);

  const handleSubmit = (inputs) => {
    const submitPromise = submit(inputs).toPromise();

    onSubmit(submitPromise, inputs);
  };

  return (
    <AdaptiveCard
      className={cssClasses}
      template={card}
      onSubmit={handleSubmit}
      style={style}
    />
  );
}

WebexAdaptiveCard.propTypes = {
  activityID: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
  onSubmit: PropTypes.func,
};

WebexAdaptiveCard.defaultProps = {
  className: undefined,
  style: undefined,
  onSubmit: () => {},
};
