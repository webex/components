import React from 'react';
import PropTypes from 'prop-types';

/**
 * Meetings presence meeting SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function MeetingsPresenceIcon({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>
      <path d="M4.5 13.75V24.75C4.50132 25.9431 4.97585 27.0869 5.81948 27.9305C6.66311 28.7741 7.80693 29.2487 9 29.25H23C24.1931 29.2487 25.3369 28.7742 26.1805 27.9305C27.0242 27.0869 27.4987 25.9431 27.5 24.75V13.75H4.5Z" />
      <path d="M23 6.25V3.75C23 3.48478 22.8946 3.23043 22.7071 3.04289C22.5196 2.85536 22.2652 2.75 22 2.75C21.7348 2.75 21.4804 2.85536 21.2929 3.04289C21.1054 3.23043 21 3.48478 21 3.75V6.25H11V3.75C11 3.48478 10.8946 3.23043 10.7071 3.04289C10.5196 2.85536 10.2652 2.75 10 2.75C9.73478 2.75 9.48043 2.85536 9.29289 3.04289C9.10536 3.23043 9 3.48478 9 3.75V6.25C7.80692 6.2513 6.66308 6.72582 5.81945 7.56945C4.97582 8.41308 4.5013 9.55692 4.5 10.75V11.75H27.5V10.75C27.4987 9.55692 27.0242 8.41308 26.1805 7.56945C25.3369 6.72582 24.1931 6.2513 23 6.25Z" />
    </svg>
  );
}

MeetingsPresenceIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

MeetingsPresenceIcon.defaultProps = {
  size: 24,
  className: '',
  style: {},
};
