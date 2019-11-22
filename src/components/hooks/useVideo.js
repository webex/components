import {useEffect, useRef} from 'react';

/**
 * Custom hook that returns a video reference with given stream object attached to it.
 *
 * @param {MediaStream} stream  Media stream instance to pass to the video reference.
 * @returns {Element} Video element reference
 */
export default function useVideo(stream) {
  const videoRef = useRef({});

  useEffect(() => {
    const video = videoRef.current;

    if (stream instanceof MediaStream) {
      video.srcObject = stream;
      video.play();
    }

    return () => {
      video.srcObject = undefined;
    };
  }, [stream]);

  return videoRef;
}
