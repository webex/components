import React from 'react';
import PropTypes from 'prop-types';

/**
 * Arrow Down SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function ArrowDown({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 14" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>
      <path d="M25.7075 0.293202C25.52 0.105701 25.2656 0.000366211 25.0004 0.000366211C24.7353 0.000366211 24.4809 0.105701 24.2934 0.293202L13 11.5862L1.70699 0.293202C1.51851 0.110381 1.26568 0.00902984 1.0031 0.0110359C0.740528 0.013042 0.489278 0.118244 0.303611 0.303925C0.117943 0.489605 0.0127584 0.740862 0.0107709 1.00344C0.00878336 1.26601 0.110153 1.51883 0.292988 1.7073L12.293 13.7073C12.4805 13.8948 12.7348 14.0001 13 14.0001C13.2652 14.0001 13.5195 13.8948 13.707 13.7073L25.707 1.7073C25.8946 1.51984 26 1.26555 26.0001 1.00036C26.0002 0.735168 25.8949 0.4808 25.7075 0.293202Z" />
    </svg>
  );
}

ArrowDown.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

ArrowDown.defaultProps = {
  size: 26,
  className: '',
  style: {},
};
