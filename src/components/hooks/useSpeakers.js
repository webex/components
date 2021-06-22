import {useEffect} from 'react';

/**
 * Custom hook that sets a media element reference with given speaker device id attached to it.
 *
 * @param {HTMLMediaElement} elementRef The reference to the HTML media element
 * @param {string} speakerID The ID of the speaker in use
 */
export default function useSpeakers(elementRef, speakerID) {
  useEffect(() => {
    const element = elementRef.current;

    if (element && speakerID) {
      element.setSinkId(speakerID);
    }
  }, [elementRef, speakerID]);
}
