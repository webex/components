import React from 'react';
import PropTypes from 'prop-types';

/**
 * More SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function MoreIcon({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 4" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>
      <path d="M7 3.125C7.62132 3.125 8.125 2.62132 8.125 2C8.125 1.37868 7.62132 0.875 7 0.875C6.37868 0.875 5.875 1.37868 5.875 2C5.875 2.62132 6.37868 3.125 7 3.125Z" fillOpacity="0.95" />
      <path d="M1.375 3.125C1.99632 3.125 2.5 2.62132 2.5 2C2.5 1.37868 1.99632 0.875 1.375 0.875C0.75368 0.875 0.25 1.37868 0.25 2C0.25 2.62132 0.75368 3.125 1.375 3.125Z" fillOpacity="0.95" />
      <path d="M12.625 3.125C13.2463 3.125 13.75 2.62132 13.75 2C13.75 1.37868 13.2463 0.875 12.625 0.875C12.0037 0.875 11.5 1.37868 11.5 2C11.5 2.62132 12.0037 3.125 12.625 3.125Z" fillOpacity="0.95" />
    </svg>
  );
}

MoreIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

MoreIcon.defaultProps = {
  size: 24,
  className: '',
  style: {},
};
