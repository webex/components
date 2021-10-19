import {useState} from 'react';

/**
 * Custom hook that triggers a re-render.
 *
 * @returns {Function} A function that forces a re-render
 */
export default function useForceUpdate() {
  const [value, setValue] = useState(0);

  return () => setValue(value + 1);
}
