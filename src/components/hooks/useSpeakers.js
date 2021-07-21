import {useEffect} from 'react';

/**
 * Custom hook that sets the output of an html media element to the specified speaker device.
 *
 * @param {object} elementRef  A react ref
 * @param {HTMLMediaElement} elementRef.curent  The HTML media element to attach the speakers to
 * @param {string} speakerID  The ID of the speaker in use
 */
export default function useSpeakers(elementRef, speakerID) {
  const element = elementRef.current;

  useEffect(() => {
    if (element) {
      if (element.setSinkId) {
        element.setSinkId(speakerID);
      } else {
        console.error('useSpeakers: setSinkId() not supported on this element', element);
      }
    }
  }, [element, speakerID]);
}
