import React from 'react';
import PropTypes from 'prop-types';

/**
 * Camera presence SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function CameraPresenceIcon({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>
      <path d="M28.7871 9.72433C28.562 9.58573 28.3044 9.50895 28.0402 9.50176C27.7759 9.49456 27.5145 9.55719 27.2822 9.68333L23.5 12.088V10.0007C23.4987 8.80766 23.0242 7.66382 22.1805 6.82018C21.3369 5.97655 20.1931 5.50203 19 5.50073H7C5.80692 5.50203 4.66308 5.97655 3.81945 6.82018C2.97582 7.66382 2.5013 8.80766 2.5 10.0007V22.0007C2.5013 23.1938 2.97582 24.3376 3.81945 25.1813C4.66308 26.0249 5.80692 26.4994 7 26.5007H19C20.1931 26.4994 21.3369 26.0249 22.1805 25.1813C23.0241 24.3376 23.4987 23.1938 23.5 22.0007V19.9107L27.3271 22.3413C27.5357 22.446 27.7657 22.5008 27.999 22.5013C28.3966 22.5 28.7775 22.3414 29.0584 22.06C29.3394 21.7787 29.4975 21.3976 29.4983 21V11C29.4992 10.7442 29.4343 10.4925 29.3097 10.2691C29.1852 10.0456 29.0052 9.85804 28.7871 9.72433Z" />
    </svg>
  );
}

CameraPresenceIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

CameraPresenceIcon.defaultProps = {
  size: 24,
  className: '',
  style: {},
};
