import {useEffect} from 'react';

/**
 * Custom hook that sets a media element reference with given stream object attached to it.
 *
 * @param {HTMLMediaElement} elementRef The reference to the HTML media element
 * @param {MediaStream} stream  Media stream instance to pass to the audio/video reference.
 */
export default function useStream(elementRef, stream) {
  useEffect(() => {
    const element = elementRef.current;

    if (element && stream instanceof MediaStream) {
      element.srcObject = stream;
    } else if (stream) {
      console.error('useStream: invalid media stream received', stream);
    }
  }, [elementRef, stream]);
}
