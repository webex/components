import {useCallback, useState} from 'react';

/**
 * Custom hook that creates a ref callback that forces a re-render
 * when the inner value (current) is set
 *
 * @returns {Function} A callback ref that forces a re-render
 */
export default function useRef() {
  const [, setState] = useState();

  const callback = useCallback((current) => {
    callback.current = current;
    setState(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return callback;
}
