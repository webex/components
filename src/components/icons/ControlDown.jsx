import React from 'react';
import PropTypes from 'prop-types';

/**
 * Control Down SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function ControlDown({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 7" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>
      <path d="M0.776062 3.44715L6.77631 6.44715C6.84576 6.48183 6.92232 6.49988 6.99994 6.49988C7.07756 6.49988 7.15412 6.48183 7.22356 6.44715L13.2236 3.44715C13.3422 3.38784 13.4324 3.28384 13.4743 3.15802C13.4951 3.09572 13.5034 3.02994 13.4987 2.96444C13.4941 2.89894 13.4766 2.83499 13.4472 2.77625C13.4178 2.71752 13.3772 2.66514 13.3276 2.62211C13.278 2.57908 13.2204 2.54625 13.1581 2.52548C13.0323 2.48354 12.8949 2.49329 12.7763 2.5526L6.99991 5.4408L1.22331 2.5526C1.10469 2.4933 0.967361 2.48354 0.841543 2.52548C0.779244 2.54625 0.721645 2.57908 0.672036 2.62211C0.622427 2.66514 0.581778 2.71752 0.552412 2.77625C0.523045 2.83499 0.505535 2.89894 0.500881 2.96444C0.496227 3.02995 0.504521 3.09572 0.525289 3.15802C0.546057 3.22032 0.578891 3.27792 0.621919 3.32753C0.664947 3.37714 0.717325 3.41779 0.776062 3.44715Z" />
    </svg>
  );
}

ControlDown.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

ControlDown.defaultProps = {
  size: 26,
  className: '',
  style: {},
};
