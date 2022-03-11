import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';

/**
 * WebexMessaging component displays messaging content.
 *
 * @param {string} props.className  Custom CSS class to apply
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexMessaging({
  className,
  style,
}) {
  const [cssClasses, sc] = webexComponentClasses('messaging', className);

  return (
    <div className={cssClasses} style={style}>
      <div className={sc('loading-logo')} />
    </div>
  );
}

WebexMessaging.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(),
};

WebexMessaging.defaultProps = {
  className: '',
  style: undefined,
};
