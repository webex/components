import React from 'react';
import PropTypes from 'prop-types';

/**
 * Share screen filled SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function ShareScreenFilledIcon({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>
      <path d="M25 5.5H7C5.80692 5.5013 4.66308 5.97582 3.81945 6.81945C2.97582 7.66308 2.5013 8.80692 2.5 10V21.7839C2.50124 23.0343 2.99853 24.2332 3.88272 25.1173C4.76692 26.0015 5.96578 26.4988 7.2162 26.5H24.7836C26.034 26.4986 27.2328 26.0013 28.1169 25.1172C29.0011 24.233 29.4985 23.0343 29.5 21.7839V10C29.4987 8.80693 29.0241 7.66311 28.1805 6.81948C27.3369 5.97585 26.1931 5.50132 25 5.5ZM20.707 16.707C20.5195 16.8945 20.2651 16.9998 20 16.9998C19.7348 16.9998 19.4804 16.8945 19.2929 16.707L17 14.4138V20.0007C17 20.2659 16.8946 20.5203 16.7071 20.7078C16.5196 20.8953 16.2652 21.0007 16 21.0007C15.7348 21.0007 15.4804 20.8953 15.2929 20.7078C15.1054 20.5203 15 20.2659 15 20.0007V14.4138L12.707 16.7067C12.5185 16.8895 12.2657 16.9909 12.0031 16.9889C11.7406 16.9869 11.4893 16.8817 11.3036 16.6961C11.1179 16.5104 11.0127 16.2592 11.0107 15.9966C11.0087 15.734 11.1101 15.4812 11.2929 15.2927L15.2929 11.2927C15.4804 11.1052 15.7348 10.9999 16 10.9999C16.2651 10.9999 16.5195 11.1052 16.707 11.2927L20.707 15.2927C20.8945 15.4802 20.9999 15.7345 21 15.9996C21.0001 16.2648 20.8948 16.5191 20.7074 16.7067L20.707 16.707Z" />
    </svg>
  );
}

ShareScreenFilledIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

ShareScreenFilledIcon.defaultProps = {
  size: 24,
  className: '',
  style: {},
};
