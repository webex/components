import {useCallback} from 'react';

/**
 * Custom hook that returns a media element reference with given stream object attached to it.
 *
 * @param {MediaStream} stream  Media stream instance to pass to the audio/video reference.
 * @returns {Element} Video element reference
 */
export default function useStream(stream) {
  const streamRef = useCallback((node) => {
    if (node !== null && stream instanceof MediaStream) {
      // eslint-disable-next-line no-param-reassign
      node.srcObject = stream;
    }
  }, [stream]);

  return streamRef;
}
