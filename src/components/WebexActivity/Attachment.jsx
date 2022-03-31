import React from 'react';
import PropTypes from 'prop-types';

import webexComponentClasses from '../helpers';

/**
 * Component displays an attachment.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.id ID of attachment
 * @param {number} props.fileSize Size of attachment
 * @param {string} props.displayName Name of attachment
 * @param {string} props.url URL of attachment
 * @param {string} props.mimeType Mime type of attachment
 * @param {string} props.type Type of attachment
 * @param {string} props.className Custom CSS class to apply
 * @returns {object} JSX of the component
 */
export default function Attachment({
  id, fileSize, displayName, url, mimeType, type, className,
}) {
  const [cssClasses, sc] = webexComponentClasses('activity-attachment', className);

  return (
    <div className={cssClasses} data-id={id} data-size={fileSize} data-mime={mimeType}>
      <div className={sc('content')}>
        {type === 'file' && <div className={sc('name')}>{displayName}</div>}
        {type === 'images' && <img className={sc('image')} src={url} alt={displayName} />}
      </div>
    </div>
  );
}

Attachment.propTypes = {
  id: PropTypes.string,
  fileSize: PropTypes.number,
  displayName: PropTypes.string,
  url: PropTypes.string,
  mimeType: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

Attachment.defaultProps = {
  id: undefined,
  fileSize: undefined,
  displayName: undefined,
  url: undefined,
  mimeType: undefined,
  type: undefined,
  className: undefined,
};

Attachment.displayName = 'Attachment';