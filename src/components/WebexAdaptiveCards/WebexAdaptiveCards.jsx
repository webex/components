import React from 'react';
import PropTypes from 'prop-types';

import webexComponentClasses from '../helpers';
import {useActivity} from '../hooks';
import WebexAdaptiveCard from '../WebexAdaptiveCard/WebexAdaptiveCard';

/**
 * Called when an open url action was performed
 *
 * @callback openUrlCallback
 * @param {number} index  Card index
 * @param {string} url  Opened url
 */

/**
 * Called when a show card action was performed
 *
 * @callback showCardCallback
 * @param {number} index  Card index
 * @param {boolean} shown  Flag to indicate whether the card is shown or hidden
 * @param {object} card  Card
 */

/**
 * Called when a submit action was performed
 *
 * @callback submitCallback
 * @param {number} index  Card index
 * @param {Promise<object>} submitPromise  Promise that resolves to the submitted action
 * @param {object} inputs  Data to submit
 */

/**
 * WebexAdaptiveCards component displays webex adaptive cards corresponding to an activity.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.activityID  ID of the activity corresponding to this cards
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {openUrlCallback} [props.onOpenUrl]  Called when an open url action was performed
 * @param {showCardCallback} [props.onShowCard]  Called when a show card action was performed
 * @param {submitCallback} [props.onSubmit]  Called when a submit action was performed
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexAdaptiveCards({
  activityID,
  className,
  onOpenUrl,
  onShowCard,
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
          onOpenUrl={(url) => onOpenUrl(index, url)}
          onShowCard={(shown, card) => onShowCard(index, shown, card)}
          onSubmit={(submitPromise, inputs) => onSubmit(index, submitPromise, inputs)}
        />
      ))}
    </div>
  );
}

WebexAdaptiveCards.propTypes = {
  activityID: PropTypes.string.isRequired,
  className: PropTypes.string,
  onOpenUrl: PropTypes.func,
  onShowCard: PropTypes.func,
  onSubmit: PropTypes.func,
  style: PropTypes.shape(),
};

WebexAdaptiveCards.defaultProps = {
  className: undefined,
  onOpenUrl: () => {},
  onShowCard: () => {},
  onSubmit: () => {},
  style: undefined,
};
