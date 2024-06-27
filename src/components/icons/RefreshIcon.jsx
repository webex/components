import React from 'react';
import PropTypes from 'prop-types';

/**
 * Refresh SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function RefreshIcon({size, className, style}) {
  return (
    <svg width={size || 24} height={size || 24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`wxc-icon ${className}`} style={style}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M17.65 6.35A7.95 7.95 0 0 0 12 4a8 8 0 1 0 7.9 9.9h-2.1a6 6 0 1 1-1.45-6.45L13 11h7V4l-2.35 2.35z" fill="#FFFFFF" />
    </svg>
  );
}

RefreshIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

RefreshIcon.defaultProps = {
  size: 24,
  className: '',
  style: {},
};
