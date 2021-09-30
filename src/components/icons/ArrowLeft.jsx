import React from 'react';
import PropTypes from 'prop-types';

/**
 * Left Arrow SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function ArrowLeft({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>
      <path d="M1.70721 6.99987L7.35366 1.35352C7.44508 1.25928 7.49577 1.13287 7.49477 1.00159C7.49378 0.870299 7.44119 0.74467 7.34835 0.65183C7.25552 0.55899 7.12989 0.506389 6.99861 0.505386C6.86732 0.504383 6.7409 0.555058 6.64666 0.646469L0.646662 6.64647C0.552911 6.74023 0.500244 6.8674 0.500244 6.99999C0.500244 7.13259 0.552911 7.25975 0.646662 7.35352L6.64666 13.3535C6.69283 13.4011 6.748 13.439 6.80896 13.4651C6.86992 13.4912 6.93546 13.5049 7.00176 13.5054C7.06806 13.5059 7.13379 13.4932 7.19514 13.468C7.25649 13.4429 7.31223 13.4058 7.35911 13.3589C7.40599 13.312 7.44307 13.2563 7.46821 13.1949C7.49335 13.1336 7.50603 13.0679 7.50553 13.0016C7.50502 12.9353 7.49133 12.8697 7.46526 12.8088C7.43919 12.7478 7.40125 12.6926 7.35366 12.6465L1.70721 6.99987Z" />
    </svg>
  );
}

ArrowLeft.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

ArrowLeft.defaultProps = {
  size: 16,
  className: '',
  style: {},
};
