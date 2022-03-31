import React from 'react';
import PropTypes from 'prop-types';

import webexComponentClasses from '../../helpers';
import Icon from '../Icon/Icon';

/**
 * Component displays a file.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className Custom CSS class to apply
 * @param {string} props.displayName Name of attachment
 * @param {number} props.fileSize Size of attachment
 * @param {string} props.url URL of attachment
 * @returns {object} JSX of the component
 */
const File = ({
  className, displayName, fileSize, url,
}) => {
  const [classNames, sc] = webexComponentClasses('activity-attachment', className, {file: true});

  return (
    <div className={classNames}>
      <div className={sc('icon')}>
        <Icon name="file-code" />
      </div>
      <div className={sc('content')}>
        <span className={sc('content-name')}>{displayName}</span>
        <span className={sc('content-size')}>{fileSize}</span>
      </div>
      <div className={sc('action')} data-url={url}>
        <Icon name="download" />
      </div>
    </div>
  );
};

File.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
  fileSize: PropTypes.number,
  displayName: PropTypes.string,
};

File.defaultProps = {
  className: undefined,
  url: undefined,
  fileSize: undefined,
  displayName: undefined,
};

File.displayName = 'File';

export default File;
