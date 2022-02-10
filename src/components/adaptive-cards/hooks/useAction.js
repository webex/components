import useActionOpenUrl from './useActionOpenUrl';
import useActionSubmit from './useActionSubmit';
import useActionToggleVisibility from './useActionToggleVisibility';

/**
 * Custom hook that receives an adaptive card action and returns html attributes for the target element
 *
 * @param {object} data  Action properties
 * @returns {object} Action attributes
 */
export default function useAction(data) {
  const handleActionOpenUrl = useActionOpenUrl(data);
  const handleActionSubmit = useActionSubmit(data);
  const handleActionToggleVisibility = useActionToggleVisibility(data);

  return handleActionOpenUrl || handleActionSubmit || handleActionToggleVisibility;
}
