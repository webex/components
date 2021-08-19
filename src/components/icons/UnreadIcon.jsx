import React from 'react';
import PropTypes from 'prop-types';

/**
 * Unread SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function UnreadIcon({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>
      <path d="M16 2.5C13.33 2.5 10.7199 3.29176 8.49981 4.77516C6.27974 6.25856 4.54942 8.36697 3.52763 10.8338C2.50585 13.3006 2.2385 16.015 2.7594 18.6337C3.28031 21.2525 4.56606 23.6579 6.45406 25.5459C8.34207 27.434 10.7475 28.7197 13.3663 29.2406C15.985 29.7615 18.6994 29.4942 21.1662 28.4724C23.633 27.4506 25.7414 25.7203 27.2248 23.5002C28.7082 21.2801 29.5 18.67 29.5 16C29.496 12.4208 28.0724 8.98935 25.5415 6.45847C23.0107 3.9276 19.5792 2.504 16 2.5Z" />
    </svg>
  );
}

UnreadIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

UnreadIcon.defaultProps = {
  size: 24,
  className: '',
  style: {},
};
