import React from 'react';
import PropTypes from 'prop-types';

import File from './File';
import Image from './Image';
import Video from './Video';

/**
 * Component displays an attachment.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.id ID of attachment
 * @param {number} props.fileSize Size of attachment
 * @param {string} props.displayName Name of attachment
 * @param {string} props.url URL of attachment
 * @param {string} props.mimeType Mime type of attachment
 * @param {string} props.className Custom CSS class to apply
 * @returns {object} JSX of the component
 */
export default function Attachment({
  fileSize, displayName, url, mimeType, className,
}) {
  const isVideo = mimeType.includes('video');
  const isImage = mimeType.includes('image');
  const isFile = (!isImage && !isVideo);

  if (isFile) {
    return (
      <File
        displayName={displayName}
        mimeType={mimeType}
        url={url}
        fileSize={fileSize}
        className={className}
      />
    );
  }

  if (isImage) {
    return (
      <Image
        displayName={displayName}
        url={url}
        mimeType={mimeType}
        className={className}
      />
    );
  }

  if (isVideo) {
    return (
      <Video
        displayName={displayName}
        url={url}
        mimeType={mimeType}
        className={className}
      />
    );
  }
}

Attachment.propTypes = {
  id: PropTypes.string,
  fileSize: PropTypes.number,
  displayName: PropTypes.string,
  url: PropTypes.string,
  mimeType: PropTypes.string,
  className: PropTypes.string,
};

Attachment.defaultProps = {
  id: undefined,
  fileSize: undefined,
  displayName: undefined,
  url: undefined,
  mimeType: undefined,
  className: undefined,
};

Attachment.displayName = 'Attachment';
