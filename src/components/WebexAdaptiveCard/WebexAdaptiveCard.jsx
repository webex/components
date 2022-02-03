import React from 'react';
import PropTypes from 'prop-types';

import webexComponentClasses from '../helpers';
import {useAdaptiveCard} from '../hooks';
import AdaptiveCard from '../adaptive-cards/AdaptiveCard/AdaptiveCard';

/**
 * WebexAdaptiveCard component displays a webex adaptive card.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.activityID  ID of the activity corresponding to this card
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexAdaptiveCard({activityID, className, style}) {
  const [card, submit] = useAdaptiveCard(activityID);
  const [cssClasses] = webexComponentClasses('adaptive-card', className);

  return (
    <AdaptiveCard
      className={cssClasses}
      template={card}
      onSubmit={(inputs) => submit(inputs).subscribe()}
      style={style}
    />
  );
}

WebexAdaptiveCard.propTypes = {
  activityID: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

WebexAdaptiveCard.defaultProps = {
  className: undefined,
  style: undefined,
};
