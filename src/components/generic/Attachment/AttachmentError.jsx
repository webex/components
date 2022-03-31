import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';

const AttachmentError = ({
  className,
  message,
}) => (
  <div className={className}>
    <Icon name="warning" size={32} />
    <span>{message}</span>
  </div>
);

AttachmentError.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
};

AttachmentError.defaultProps = {
  className: undefined,
  message: 'Failed to load preview.',
};

export default AttachmentError;
