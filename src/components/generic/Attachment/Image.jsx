import React, {useState} from 'react';
import PropTypes from 'prop-types';

import webexComponentClasses from '../../helpers';
import Spinner from '../Spinner/Spinner';
import AttachmentError from './AttachmentError';

const getMimeType = (str) => {
  let s = '';

  if (str) {
    [, s] = str.split('/');
  }

  return s;
};

/**
 * Component displays an image.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className Custom CSS class to apply
 * @param {string} props.displayName Name of image
 * @param {string} props.url URL of image
 * @param {string} props.mimeType mimeType of image
 * @returns {object} JSX of the component
 */
export default function Image({
  className,
  displayName,
  mimeType,
  url,
}) {
  const [cssClasses, sc] = webexComponentClasses('activity-attachment', className, {image: true});
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
    <div className={cssClasses}>
      <div className={sc('label')}>{getMimeType(mimeType)}</div>
      <div className={sc('content')}>
        {!hasLoaded && <Spinner className={sc('spinner')} />}
        {hasError && <AttachmentError className={sc('error')} />}
        {!hasError &&
          (
          <img
            onError={handleError}
            onLoad={handleLoad}
            className={sc('image')}
            src={url}
            alt={displayName}
          />
          )}
      </div>
    </div>

  );
}

Image.propTypes = {
  displayName: PropTypes.string,
  url: PropTypes.string,
  mimeType: PropTypes.string,
  className: PropTypes.string,
};

Image.defaultProps = {
  displayName: undefined,
  url: undefined,
  mimeType: undefined,
  className: undefined,
};

Image.displayName = 'Image';
