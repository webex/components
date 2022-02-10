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
 * Custom hook that receives an adaptive card ToggleVisibility action and returns html attributes for the target element
 * If no action is received, no attributes are returned
 *
 * @param {object} data  Action properties
 * @returns {ActionAttributes|undefined} Action attributes
 */
export default function useActionToggleVisibility(data) {
  const {getIsVisible, setIsVisible} = useContext(AdaptiveCardContext);
  let handleAction;

  if (data?.type === 'Action.ToggleVisibility') {
    handleAction = () => (data.targetElements || []).map((elem) => (
      typeof elem === 'string'
        ? setIsVisible(elem, !getIsVisible(elem))
        : setIsVisible(elem.elementId, elem.isVisible)));
  }

  return handleAction && {
    onClick: handleAction,
    onKeyDown: (event) => (event.key === 'Enter' || event.key === ' ') && handleAction(),
    role: 'button',
    title: data.tooltip,
  };
}
