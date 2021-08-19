import React from 'react';
import PropTypes from 'prop-types';

/**
 * Quiet hours SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function QuietHoursPresenceIcon({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>
      <path d="M29.2414 21.8688C29.0733 21.6091 28.8269 21.4095 28.5379 21.2989C28.2489 21.1883 27.9322 21.1725 27.6335 21.2536C25.6693 21.7741 23.6177 21.8763 21.6115 21.5536C18.8294 21.0615 16.2658 19.726 14.268 17.7282C12.2702 15.7303 10.9348 13.1667 10.4426 10.3845C10.1229 8.37678 10.2287 6.32425 10.7531 4.36002C10.8332 4.06235 10.8167 3.74696 10.7062 3.45921C10.5957 3.17145 10.3968 2.92614 10.1381 2.75852C9.87432 2.57925 9.5604 2.48834 9.2416 2.49887C8.9228 2.5094 8.61557 2.62083 8.36415 2.81712C6.17827 4.51982 4.49968 6.78789 3.51 9.37589C2.52032 11.9639 2.25724 14.7733 2.74925 17.5C3.33601 20.5329 4.85556 23.3068 7.09559 25.434C9.33561 27.5612 12.1842 28.9355 15.2433 29.3649C17.8666 29.7183 20.5366 29.3739 22.9843 28.3665C25.432 27.3591 27.5708 25.7242 29.1852 23.6266C29.3793 23.3772 29.4893 23.0727 29.4994 22.7569C29.5095 22.441 29.4192 22.1301 29.2414 21.8688Z" />
    </svg>
  );
}

QuietHoursPresenceIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

QuietHoursPresenceIcon.defaultProps = {
  size: 24,
  className: '',
  style: {},
};
