import {useEffect, useState} from 'react';

/**
 * Custom hook that receives an element reference and returns the position of the element
 *
 * @param {object} elementRef  Reference to the element
 *
 * @returns {DOMRect} Element position
 */
export default function useElementPosition(elementRef) {
  const [position, setPosition] = useState(null);
  const target = elementRef.current;

  useEffect(() => {
    if (target) {
      const rect = target.getBoundingClientRect();

      if (
        !position ||
        rect.top !== position.top ||
        rect.right !== position.right ||
        rect.bottom !== position.bottom ||
        rect.left !== position.left ||
        rect.x !== position.x ||
        rect.y !== position.y ||
        rect.height !== position.height ||
        rect.width !== position.width
      ) {
        setPosition(rect);
      }
    }
  }, [target, position, setPosition]);

  useEffect(() => {
    let cleanup;

    if (target) {
      const onWindowResize = () => setPosition(target.getBoundingClientRect());

      window.addEventListener('resize', onWindowResize);
      cleanup = () => window.removeEventListener('resize', onWindowResize);
    }

    return cleanup;
  }, [target]);

  return position;
}
