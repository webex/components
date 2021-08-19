import React from 'react';
import PropTypes from 'prop-types';

/**
 * Dnd SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function DndPresenceIcon({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>
      <path fillRule="evenodd" clipRule="evenodd" d="M16 29.5C23.4558 29.5 29.5 23.4558 29.5 16C29.5 8.54416 23.4558 2.5 16 2.5C8.54416 2.5 2.5 8.54416 2.5 16C2.5 23.4558 8.54416 29.5 16 29.5ZM10 15C9.44772 15 9 15.4477 9 16C9 16.5523 9.44772 17 10 17H22C22.5523 17 23 16.5523 23 16C23 15.4477 22.5523 15 22 15H10Z" />
    </svg>
  );
}

DndPresenceIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

DndPresenceIcon.defaultProps = {
  size: 24,
  className: '',
  style: {},
};
