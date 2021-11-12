import React from 'react';
import PropTypes from 'prop-types';

/**
 * Hide SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function HidePwdIcon({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>
      <path d="M6.99995 9.99994C4.5268 9.99994 2.3725 7.81782 1.65229 6.99994C2.15704 6.42834 2.71634 5.90733 3.32224 5.44431L2.60636 4.72843C1.86421 5.30392 1.19185 5.96417 0.602972 6.69575C0.536227 6.78311 0.500068 6.89 0.500068 6.99995C0.500068 7.10989 0.536227 7.21678 0.602972 7.30414C0.718697 7.45502 3.47407 10.9999 6.99997 10.9999C7.55129 10.995 8.09898 10.9102 8.62592 10.7479L7.80012 9.92219C7.53627 9.9721 7.26847 9.99812 6.99995 9.99994Z" />
      <path d="M13.3535 12.6464L10.5634 9.85639C11.6385 9.16289 12.5952 8.30116 13.3969 7.30414C13.4637 7.21678 13.4998 7.10989 13.4998 6.99995C13.4998 6.89 13.4637 6.78311 13.3969 6.69575C13.2812 6.54487 10.5249 2.99994 6.99995 2.99994C6.08 3.0149 5.17496 3.23482 4.35072 3.64369L1.35346 0.64643C1.30704 0.600006 1.25192 0.56318 1.19127 0.538056C1.13061 0.512931 1.0656 0.5 0.999946 0.5C0.934292 0.5 0.869281 0.512932 0.808624 0.538057C0.747968 0.563182 0.692854 0.600008 0.64643 0.646433C0.552672 0.740191 0.5 0.867355 0.5 0.999949C0.5 1.13254 0.552674 1.25971 0.646432 1.35347L3.43632 4.14335L3.43571 4.14371L4.16773 4.87571L4.16834 4.87535L8.89176 9.59877L8.89109 9.59907L9.64836 10.3564L9.64904 10.3561L12.6464 13.3535C12.6928 13.3999 12.748 13.4367 12.8086 13.4618C12.8693 13.487 12.9343 13.4999 12.9999 13.4999C13.0656 13.4999 13.1306 13.487 13.1913 13.4618C13.2519 13.4367 13.307 13.3999 13.3534 13.3535C13.3999 13.307 13.4367 13.2519 13.4618 13.1913C13.4869 13.1306 13.4999 13.0656 13.4999 12.9999C13.4999 12.9343 13.4869 12.8693 13.4618 12.8086C13.4367 12.748 13.3999 12.6929 13.3535 12.6464ZM5.1092 4.40219C5.70715 4.14599 6.34949 4.00935 6.99995 3.99996C9.47358 3.99996 11.6279 6.18307 12.3481 7.00046C11.6206 7.83062 10.7728 8.5471 9.83305 9.12604L5.1092 4.40219Z" />
    </svg>
  );
}

HidePwdIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

HidePwdIcon.defaultProps = {
  size: 16,
  className: '',
  style: {},
};