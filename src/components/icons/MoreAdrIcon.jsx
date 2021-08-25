import React from 'react';
import PropTypes from 'prop-types';

/**
 * More-adr SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function MoreAdrIcon({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 4 14" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>
      <path d="M2 8.125C2.62132 8.125 3.125 7.62132 3.125 7C3.125 6.37868 2.62132 5.875 2 5.875C1.37868 5.875 0.875 6.37868 0.875 7C0.875 7.62132 1.37868 8.125 2 8.125Z" fillOpacity="0.95" />
      <path d="M2 13.75C2.62132 13.75 3.125 13.2463 3.125 12.625C3.125 12.0037 2.62132 11.5 2 11.5C1.37868 11.5 0.875 12.0037 0.875 12.625C0.875 13.2463 1.37868 13.75 2 13.75Z" fillOpacity="0.95" />
      <path d="M2 2.5C2.62132 2.5 3.125 1.99632 3.125 1.375C3.125 0.75368 2.62132 0.25 2 0.25C1.37868 0.25 0.875 0.75368 0.875 1.375C0.875 1.99632 1.37868 2.5 2 2.5Z" fillOpacity="0.95" />
    </svg>
  );
}

MoreAdrIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

MoreAdrIcon.defaultProps = {
  size: 24,
  className: '',
  style: {},
};
