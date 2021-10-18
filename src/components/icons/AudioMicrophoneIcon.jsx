import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';

/**
 * Audio microphone SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function AudioMicrophoneIcon({
  size,
  className,
  style,
}) {
  const [cssClasses] = webexComponentClasses('audio-microphone-icon', className);

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${cssClasses}`} style={style}>
      <path d="M18 21.0002H16.5154C15.6304 21.0221 14.7675 20.7223 14.0868 20.1563C13.4061 19.5903 12.9539 18.7966 12.814 17.9224C13.8476 17.7311 14.7818 17.1843 15.4547 16.3766C16.1276 15.569 16.4969 14.5515 16.4985 13.5002V6.00024C16.4985 4.80677 16.0244 3.66218 15.1805 2.81826C14.3366 1.97435 13.192 1.50024 11.9985 1.50024C10.8051 1.50024 9.66047 1.97435 8.81656 2.81826C7.97264 3.66218 7.49854 4.80677 7.49854 6.00024V13.5002C7.5004 14.5713 7.88398 15.6066 8.58042 16.4204C9.27685 17.2341 10.2405 17.773 11.2985 17.9402C11.4397 19.1001 11.9685 20.1783 12.799 21.0002H6C5.80109 21.0002 5.61032 21.0793 5.46967 21.2199C5.32902 21.3606 5.25 21.5513 5.25 21.7502C5.25 21.9492 5.32902 22.1399 5.46967 22.2806C5.61032 22.4212 5.80109 22.5002 6 22.5002H18C18.1989 22.5002 18.3897 22.4212 18.5303 22.2806C18.671 22.1399 18.75 21.9492 18.75 21.7502C18.75 21.5513 18.671 21.3606 18.5303 21.2199C18.3897 21.0793 18.1989 21.0002 18 21.0002ZM8.99854 11.2412V9.75024H14.9985V11.2412H8.99854ZM11.9985 3.00024C12.7939 3.00104 13.5565 3.31736 14.119 3.8798C14.6814 4.44224 14.9977 5.20484 14.9985 6.00024V8.25024H8.99854V6.00024C8.99933 5.20484 9.31566 4.44224 9.87809 3.8798C10.4405 3.31736 11.2031 3.00104 11.9985 3.00024Z" />
      <path className="accent" d="M9 11.25H15V13.5C15 15.1569 13.6569 16.5 12 16.5C10.3431 16.5 9 15.1569 9 13.5V11.25Z" />
      <rect className="accent" x="9" y="8.25" width="6" height="1.5" />
    </svg>
  );
}

AudioMicrophoneIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

AudioMicrophoneIcon.defaultProps = {
  size: 24,
  className: '',
  style: {},
};
