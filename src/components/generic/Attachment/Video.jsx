import React, {useState} from 'react';
import PropTypes from 'prop-types';

import webexComponentClasses from '../../helpers';
import Spinner from '../Spinner/Spinner';
import AttachmentError from './AttachmentError';

// eslint-disable-next-line no-unused-vars
import Button from '../Button/Button';
// eslint-disable-next-line no-unused-vars
import Icon from '../Icon/Icon';

const getMimeType = (str) => {
  let s = '';

  if (str) {
    [, s] = str.split('/');
  }

  return s;
};

/**
 * Component displays an video.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className Custom CSS class to apply
 * @param {string} props.displayName Name of video
 * @param {string} props.url URL of video
 * @param {string} props.mimeType mimeType of video
 * @param {boolean} props.controls default controls of video
 * @param {string} props.poster poster of video
 * @returns {object} JSX of the component
 */
export default function Video({
  className,
  displayName,
  mimeType,
  url,
  poster,
  controls,
}) {
  const [cssClasses, sc] = webexComponentClasses('activity-attachment', className, {video: true});
  const [hasError, setHasError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleLoad = () => {
    setHasError(false);
    setHasLoaded(true);
  };
  const handleError = () => {
    setHasError(true);
    setHasLoaded(true);
  };

  return (
    <div className={cssClasses} data-name={displayName}>
      <div className={sc('label')}>{getMimeType(mimeType)}</div>
      <div className={sc('content')}>
        {!hasLoaded && <Spinner className={sc('spinner')} />}
        {hasError && <AttachmentError className={sc('error')} />}
        {!hasError &&
          (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              controls={controls}
              poster={poster}
              autoPlay={false}
              onLoadedData={handleLoad}
              onError={handleError}
            >

              <source src={url} type={mimeType} />
              Sorry, your browser does not support embedded videos.
            </video>
          )}
        {/* <div className={sc('toolbar')}>
          <Button
            className={sc('play')}
            type="ghost"
            size={28}
            ariaLabel="Play video"
          >
            <Icon name="play" size={16} />
          </Button>
          <Button
            className={sc('download')}
            type="ghost"
            size={28}
            ariaLabel="Download video"
          >
            <Icon name="download" size={16} />
          </Button>
          </div> */}
      </div>
    </div>

  );
}

Video.propTypes = {
  displayName: PropTypes.string,
  url: PropTypes.string,
  mimeType: PropTypes.string,
  className: PropTypes.string,
  poster: PropTypes.string,
  controls: PropTypes.bool,
};

Video.defaultProps = {
  displayName: undefined,
  url: undefined,
  mimeType: undefined,
  controls: false,
  className: undefined,
  poster: 'https://assets.codepen.io/49212/placeholder.png',
};

Video.displayName = 'Video';
