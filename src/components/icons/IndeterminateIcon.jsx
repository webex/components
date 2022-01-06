import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';

/**
 * Indeterminate SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Additional className for the component
 * @param {number} props.size  Width and height of the icon
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function IndeterminateIcon({className, size, style}) {
  const [cssClasses] = webexComponentClasses('line-icon', className);

  return (
    <svg width={size} height={size} viewBox="0 0 9 1" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${cssClasses}`} style={style}>
      <rect x="0.5" width="8" height="1" rx="0.5" fillOpacity="0.95" />
    </svg>
  );
}

IndeterminateIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.shape(),
};

IndeterminateIcon.defaultProps = {
  className: '',
  size: 24,
  style: {},
};
