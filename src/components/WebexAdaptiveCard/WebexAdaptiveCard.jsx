import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
 * @param {string} [props.msgSubmitStarted]  Message to display while submitting user input
 * @param {string} [props.msgSubmitSuccess]  Message to display when submit finished with success
 * @param {string} [props.msgSubmitFail]  Message to display when submit failed
 * @param {submitCallback} [props.onSubmit]  Action to perform when submitting a card
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexAdaptiveCard({
  activityID,
  className,
  msgSubmitFail,
  msgSubmitStarted,
  msgSubmitSuccess,
  onSubmit,
  style,
}) {
  const [card, submit] = useAdaptiveCard(activityID);
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
  msgSubmitFail: PropTypes.string,
  msgSubmitStarted: PropTypes.string,
  msgSubmitSuccess: PropTypes.string,
  onSubmit: PropTypes.func,
  style: PropTypes.shape(),
};

WebexAdaptiveCard.defaultProps = {
  className: undefined,
  msgSubmitFail: 'Error',
  msgSubmitStarted: 'Sending...',
  msgSubmitSuccess: 'Sent',
  onSubmit: () => {},
  style: undefined,
};
