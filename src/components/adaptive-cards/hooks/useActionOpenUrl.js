import {useContext} from 'react';
import {isValidUrl} from '../../../util';
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
 * Custom hook that receives an adaptive card OpenURL action and returns html attributes for the target element
 * If no action is received, no attributes are returned
 *
 * @param {object} data  Action properties
 * @returns {ActionAttributes|undefined} Action attributes
 */
export default function useActionOpenUrl(data) {
  const {onOpenUrl} = useContext(AdaptiveCardContext);

  let handleAction;

  if (data?.type === 'Action.OpenUrl') {
    const isValidHttpUrl = isValidUrl(data.url, ['https:', 'http:']);

    if (isValidHttpUrl) {
      handleAction = () => {
        window.open(data.url, '_blank');
        onOpenUrl(data.url);
      };
    }
  }

  return handleAction && {
    onClick: handleAction,
    onKeyDown: (event) => (event.key === 'Enter' || event.key === ' ') && handleAction(),
    role: 'link',
    title: data.tooltip,
  };
}
