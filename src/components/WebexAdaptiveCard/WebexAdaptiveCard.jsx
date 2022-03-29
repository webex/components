import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import webexComponentClasses from '../helpers';
import {useAdaptiveCard} from '../hooks';
import AdaptiveCard from '../adaptive-cards/AdaptiveCard/AdaptiveCard';

/**
 * Called when an open url action was performed
 *
 * @callback openUrlCallback
 * @param {string} url  Opened url
 */

/**
 * Called when a show card action was performed
 *
 * @callback showCardCallback
 * @param {boolean} shown  Flag to indicate whether the card is shown or hidden
 * @param {object} card  Card
 */

/**
 * Called when a submit action was performed
 *
 * @callback submitCallback
 * @param {Promise<object>} submitPromise  Promise that resolves to the submitted action
 * @param {object} inputs  Data to submit
 */

/**
 * WebexAdaptiveCard component displays a webex adaptive card.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.activityID  ID of the activity corresponding to this card
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {number} props.cardIndex  Index of the card to display
 * @param {string} [props.msgSubmitStarted]  Message to display while submitting user input
 * @param {string} [props.msgSubmitSuccess]  Message to display when submit finished with success
 * @param {string} [props.msgSubmitFail]  Message to display when submit failed
 * @param {openUrlCallback} [props.onOpenUrl]  Called when an open url action was performed
 * @param {showCardCallback} [props.onShowCard]  Called when a show card action was performed
 * @param {submitCallback} [props.onSubmit]  Called when a submit action was performed
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexAdaptiveCard({
  activityID,
  className,
  cardIndex,
  msgSubmitFail,
  msgSubmitStarted,
  msgSubmitSuccess,
  onOpenUrl,
  onShowCard,
  onSubmit,
  style,
}) {
  const [card, submit] = useAdaptiveCard(activityID, cardIndex);
  const [cssClasses, sc] = webexComponentClasses('adaptive-card', className);
  const [submitStatus, setSubmitStatus] = useState({});

  const handleSubmit = (inputs) => {
    setSubmitStatus({message: msgSubmitStarted});
    const submitPromise = submit(inputs).toPromise();

    submitPromise.then(
      () => setSubmitStatus({message: msgSubmitSuccess}),
      () => setSubmitStatus({message: msgSubmitFail, isError: true}),
    ).finally(
      setTimeout(() => setSubmitStatus({}), 2000),
    );

    onSubmit(submitPromise, inputs);
  };

  return (
    <div
      className={cssClasses}
      style={style}
    >
      <AdaptiveCard
        className={sc('card')}
        template={card}
        onOpenUrl={onOpenUrl}
        onShowCard={onShowCard}
        onSubmit={handleSubmit}
      />
      {submitStatus.message && (
        <div className={classnames(sc('status'), {[sc('status--error')]: submitStatus.isError})}>{submitStatus.message}</div>
      )}
    </div>
  );
}

WebexAdaptiveCard.propTypes = {
  activityID: PropTypes.string.isRequired,
  className: PropTypes.string,
  cardIndex: PropTypes.number.isRequired,
  msgSubmitFail: PropTypes.string,
  msgSubmitStarted: PropTypes.string,
  msgSubmitSuccess: PropTypes.string,
  onOpenUrl: PropTypes.func,
  onShowCard: PropTypes.func,
  onSubmit: PropTypes.func,
  style: PropTypes.shape(),
};

WebexAdaptiveCard.defaultProps = {
  className: undefined,
  msgSubmitFail: 'Error',
  msgSubmitStarted: 'Sending...',
  msgSubmitSuccess: 'Sent',
  onOpenUrl: () => {},
  onShowCard: () => {},
  onSubmit: () => {},
  style: undefined,
};
