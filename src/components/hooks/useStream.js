import {useEffect} from 'react';

/**
 * Custom hook that attaches a media stream to an html media element.
 *
 * @param {object} elementRef  A react ref
 * @param {HTMLMediaElement} elementRef.current  The reference to attach a media stream to.
 * @param {MediaStream} stream  Media stream instance to pass to the audio/video reference.
 */
export default function useStream(elementRef, stream) {
  const element = elementRef.current;

  useEffect(() => {
    if (element && stream instanceof MediaStream) {
      element.srcObject = stream;
    } else if (stream) {
      console.error('useStream: invalid media stream received', stream);
    }
  }, [element, stream]);
}
