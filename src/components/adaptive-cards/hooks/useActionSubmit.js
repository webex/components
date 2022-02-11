import {useContext} from 'react';
import AdaptiveCardContext from '../context/adaptive-card-context';

/**
 * HTML attributes for the action target element.
 *
 * @typedef {object} ActionAttributes
 * @property {Function} onClick  onClick callback function
 * @property {Function} onKeyDown onKeyDown callback function
 * @property {Function} role  Role for accessibility
 * @property {Function} title   Title to be displayed
 */

/**
 * Custom hook that receives an adaptive card Submit action and returns html attributes for the target element
 * If no action is received, no attributes are returned
 *
 * @param {object} data  Action properties
 * @returns {ActionAttributes|undefined} Action attributes
 */
export default function useActionSubmit(data) {
  const {
    getAllValues,
    validate,
    submit,
    invalidSubmit,
  } = useContext(AdaptiveCardContext);

  let handleAction;

  if (data?.type === 'Action.Submit') {
    handleAction = () => {
      if (data.associatedInputs?.toLowerCase() !== 'none') {
        if (validate()) {
          let values = getAllValues();

          if (typeof data.data === 'object') {
            values = {...values, ...data.data};
          }
          submit(values);
        } else {
          invalidSubmit(getAllValues());
        }
      } else {
        submit(data.data);
      }
    };
  }

  return handleAction && {
    onClick: handleAction,
    onKeyDown: (event) => (event.key === 'Enter' || event.key === ' ') && handleAction(),
    role: 'button',
    title: data.tooltip,
  };
}
