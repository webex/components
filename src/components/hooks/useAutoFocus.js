import {useEffect} from 'react';

/**
 * Custom hook that focuses an html element.
 *
 * @param {object} elementRef  A react ref
 * @param {HTMLElement} elementRef.current  The DOM elemnt to focus.
 * @param {boolean} autoFocus  Flag indicating if element need to be focused
 */
export default function useAutoFocus(elementRef, autoFocus) {
  const element = elementRef.current;

  useEffect(() => {
    if (autoFocus && element) {
      element.focus();
    }
  }, [element, autoFocus]);
}
