import {useEffect, useRef, useState} from 'react';
import {ResizeObserver as Polyfill} from '@juggle/resize-observer';

/**
 * Custom hook that returns an element reference and the dimensions of the
 * element it refers to.
 *
 * @returns {Array} Element reference and dimensions in pixels
 */
export default function useElementDimensions() {
  const elementRef = useRef();
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let cleanup;

    if (elementRef.current) {
      // Use native implementation when available, otherwise use polyfill
      const ResizeObserver = window.ResizeObserver || Polyfill;
      const observer = new ResizeObserver((entries) => {
        // Get the first DOM element (our ref) and look at the border box dimensions
        const [entry] = entries;
        const {contentRect} = entry;

        // Update height only if there has been height change
        if (height !== contentRect.height) {
          setHeight(contentRect.height);
        }

        // Update width only if there has been width change
        if (width !== contentRect.width) {
          setWidth(contentRect.width);
        }
      });

      observer.observe(elementRef.current);

      cleanup = () => {
        observer.disconnect();
      };
    }

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef.current]);

  return [elementRef, {height, width}];
}
