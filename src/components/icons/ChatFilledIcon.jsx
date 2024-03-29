import React from 'react';
import PropTypes from 'prop-types';

/**
 * Chat filled SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function ChatFilledIcon({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>
      <path d="M15.9989 3.5C13.7548 3.5003 11.552 4.1047 9.62198 5.24976C7.69191 6.39481 6.10565 8.03831 5.02971 10.0077C3.95376 11.9772 3.4278 14.1999 3.50702 16.4427C3.58624 18.6855 4.26772 20.8656 5.47995 22.7542C5.33614 23.4793 5.0456 24.1674 4.62617 24.7762C4.20675 25.3849 3.66729 25.9015 3.04095 26.2942C2.42715 26.6975 2.41695 27.1965 2.61225 27.5295C2.98135 28.1604 4.35685 28.51 6.02095 28.51C7.73977 28.5206 9.44103 28.164 11.0109 27.4641C12.7145 28.2053 14.5618 28.5575 16.4185 28.4951C18.2752 28.4328 20.0947 27.9573 21.7446 27.1034C23.3945 26.2495 24.8334 25.0386 25.9565 23.5587C27.0797 22.0789 27.8589 20.3673 28.2374 18.5485C28.616 16.7297 28.5844 14.8494 28.145 13.0443C27.7056 11.2393 26.8695 9.55483 25.6973 8.11351C24.5251 6.6722 23.0464 5.51027 21.3688 4.71221C19.6912 3.91415 17.8567 3.50004 15.9989 3.5Z" />
    </svg>
  );
}

ChatFilledIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

ChatFilledIcon.defaultProps = {
  size: 24,
  className: undefined,
  style: undefined,
};
