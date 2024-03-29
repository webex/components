import React from 'react';
import PropTypes from 'prop-types';

/**
 * Recents presence SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function RecentsPresenceIcon({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>
      <path d="M16 2.5C13.33 2.5 10.7199 3.29176 8.49981 4.77516C6.27974 6.25856 4.54942 8.36697 3.52763 10.8338C2.50585 13.3006 2.2385 16.015 2.7594 18.6337C3.28031 21.2525 4.56606 23.6579 6.45406 25.5459C8.34207 27.434 10.7475 28.7197 13.3663 29.2406C15.985 29.7615 18.6994 29.4942 21.1662 28.4724C23.633 27.4506 25.7414 25.7203 27.2248 23.5002C28.7082 21.2801 29.5 18.67 29.5 16C29.496 12.4208 28.0724 8.98935 25.5415 6.45847C23.0107 3.9276 19.5792 2.504 16 2.5ZM21.707 21.707C21.6142 21.7999 21.504 21.8736 21.3827 21.9238C21.2613 21.9741 21.1313 22 21 22C20.8687 22 20.7387 21.9741 20.6174 21.9238C20.496 21.8736 20.3858 21.7999 20.293 21.707L15.293 16.707C15.2001 16.6142 15.1264 16.504 15.0761 16.3827C15.0259 16.2613 15 16.1313 15 16V8C15 7.73478 15.1054 7.48043 15.2929 7.29289C15.4804 7.10536 15.7348 7 16 7C16.2652 7 16.5196 7.10536 16.7071 7.29289C16.8946 7.48043 17 7.73478 17 8V15.586L21.707 20.293C21.7999 20.3858 21.8735 20.496 21.9238 20.6173C21.974 20.7386 21.9999 20.8686 21.9999 20.9998C21.9999 21.1311 21.974 21.2611 21.9238 21.3824C21.8735 21.5037 21.7999 21.6139 21.707 21.7067V21.707Z" />
    </svg>
  );
}

RecentsPresenceIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

RecentsPresenceIcon.defaultProps = {
  size: 24,
  className: '',
  style: {},
};
