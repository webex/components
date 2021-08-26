import React from 'react';
import PropTypes from 'prop-types';

/**
 * Arrow Up SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function ArrowUp({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 14" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>
      <path d="M26.7071 12.2932L14.7071 0.293202C14.5196 0.105701 14.2652 0.000366211 14 0.000366211C13.7349 0.000366211 13.4805 0.105701 13.293 0.293202L1.293 12.2932C1.19821 12.3856 1.12271 12.4959 1.07089 12.6178C1.01907 12.7396 0.991948 12.8705 0.991109 13.0029C0.99027 13.1353 1.01573 13.2665 1.066 13.389C1.11628 13.5114 1.19037 13.6227 1.28398 13.7163C1.37759 13.8099 1.48886 13.884 1.61133 13.9343C1.73381 13.9846 1.86504 14.01 1.99743 14.0092C2.12981 14.0084 2.26071 13.9812 2.38254 13.9294C2.50436 13.8776 2.61468 13.8021 2.7071 13.7073L14 2.4143L25.293 13.7073C25.3854 13.8021 25.4957 13.8776 25.6176 13.9294C25.7394 13.9812 25.8703 14.0084 26.0027 14.0092C26.1351 14.01 26.2663 13.9846 26.3888 13.9343C26.5112 13.884 26.6225 13.8099 26.7161 13.7163C26.8097 13.6227 26.8838 13.5114 26.9341 13.389C26.9844 13.2665 27.0098 13.1353 27.009 13.0029C27.0082 12.8705 26.981 12.7396 26.9292 12.6178C26.8774 12.4959 26.8019 12.3856 26.7071 12.2932Z" />
    </svg>
  );
}

ArrowUp.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

ArrowUp.defaultProps = {
  size: 26,
  className: '',
  style: {},
};
