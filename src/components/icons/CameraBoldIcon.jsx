import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';

/**
 * Camera bold SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @param {string} props.ariaLabel  Aria label for accessibility
 * @returns {object} JSX of the icon
 *
 */
export default function CameraBoldIcon({
  size, className, style, ariaLabel,
}) {
  const [cssClasses] = webexComponentClasses('camera-bold-icon', className);

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${cssClasses}`} style={style} aria-label={ariaLabel}>
      <path d="M43.5779 13.9478C43.1434 13.6776 42.6468 13.5236 42.1358 13.5006C41.6247 13.4775 41.1162 13.5861 40.6592 13.8159C40.613 13.8394 40.5684 13.8643 40.5244 13.8921L36.0039 16.7672V15.001C36.0016 13.0126 35.2106 11.1063 33.8046 9.70026C32.3986 8.29424 30.4923 7.50331 28.5039 7.50098H10.5039C8.5155 7.50331 6.6092 8.29424 5.20319 9.70026C3.79717 11.1063 3.00624 13.0126 3.00391 15.001V33.001C3.00624 34.9894 3.79717 36.8957 5.20318 38.3017C6.6092 39.7077 8.5155 40.4986 10.5039 40.501H28.5039C30.4923 40.4986 32.3986 39.7077 33.8046 38.3017C35.2106 36.8957 36.0016 34.9894 36.0039 33.001V31.2338L40.5244 34.107C40.5676 34.1348 40.6123 34.1597 40.6577 34.1832C41.115 34.4121 41.6233 34.5203 42.1342 34.4975C42.6451 34.4747 43.1417 34.3217 43.5768 34.0529C44.012 33.7842 44.3711 33.4087 44.6203 32.962C44.8694 32.5154 45.0002 32.0125 45.0002 31.501V16.4995C45.002 15.9879 44.8722 15.4844 44.6231 15.0375C44.374 14.5906 44.014 14.2153 43.5779 13.9478ZM33.0039 33.001C33.0026 34.1941 32.5281 35.3379 31.6844 36.1815C30.8408 37.0252 29.697 37.4997 28.5039 37.501H10.5039C9.31083 37.4997 8.167 37.0252 7.32336 36.1815C6.47973 35.3379 6.00521 34.1941 6.00391 33.001V15.001C6.00521 13.8079 6.47973 12.6641 7.32336 11.8204C8.167 10.9768 9.31083 10.5023 10.5039 10.501H28.5039C29.697 10.5023 30.8408 10.9768 31.6844 11.8204C32.5281 12.6641 33.0026 13.8079 33.0039 15.001V33.001ZM36.0039 27.6794V20.3222L42.0002 16.5083L42.001 31.4907L36.0039 27.6794Z" />
    </svg>
  );
}

CameraBoldIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
  ariaLabel: PropTypes.string,
};

CameraBoldIcon.defaultProps = {
  size: 24,
  className: '',
  style: {},
  ariaLabel: undefined,
};
