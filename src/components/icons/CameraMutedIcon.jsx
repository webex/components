import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';

/**
 * Camera muted SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function CameraMutedIcon({size, className, style}) {
  const [cssClasses] = webexComponentClasses('camera-muted-icon', className);

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${cssClasses}`} style={style}>
      <path d="M21.787 6.97387C21.5698 6.8388 21.3215 6.76181 21.0659 6.75027C20.8104 6.73872 20.5562 6.79302 20.3276 6.90795C20.3046 6.91967 20.2822 6.93212 20.2603 6.94603L18 8.38359V7.50048C17.9988 6.50627 17.6034 5.55313 16.9004 4.85012C16.1974 4.14711 15.2442 3.75165 14.25 3.75048H5.25C5.11281 3.75275 4.97587 3.7629 4.83985 3.78087L3.52846 2.46947C3.38783 2.32883 3.19708 2.24982 2.99819 2.24982C2.79929 2.24982 2.60855 2.32882 2.46791 2.46946C2.32727 2.6101 2.24825 2.80085 2.24825 2.99974C2.24825 3.19863 2.32726 3.38938 2.4679 3.53002L20.4683 21.53C20.6089 21.6707 20.7996 21.7497 20.9985 21.7497C21.1974 21.7497 21.3882 21.6707 21.5288 21.53C21.6694 21.3894 21.7485 21.1986 21.7485 20.9997C21.7485 20.8009 21.6694 20.6101 21.5288 20.4695L17.9696 16.9104C17.9876 16.7745 17.9977 16.6376 18 16.5005V15.6169L20.2603 17.0535C20.2819 17.0674 20.3042 17.0799 20.3269 17.0916C20.5556 17.206 20.8097 17.2601 21.0651 17.2488C21.3206 17.2374 21.5689 17.1608 21.7865 17.0265C22.004 16.8921 22.1836 16.7043 22.3082 16.481C22.4327 16.2577 22.4981 16.0062 22.4982 15.7505V8.24976C22.4991 7.99393 22.4341 7.74218 22.3096 7.51872C22.185 7.29527 22.0051 7.10763 21.787 6.97387ZM6.30947 5.25048H14.25C14.8465 5.25113 15.4185 5.48839 15.8403 5.91021C16.2621 6.33202 16.4993 6.90394 16.5 7.50048V15.4407L6.30947 5.25048ZM18 13.8397V10.1611L20.9982 8.25414L20.9985 15.7454L18 13.8397Z" />
      <path d="M14.25 18.7505H5.25C4.65346 18.7498 4.08154 18.5126 3.65973 18.0907C3.23791 17.6689 3.00065 17.097 3 16.5005V7.50048C3.00255 7.13381 3.09586 6.77347 3.27159 6.45165L2.17928 5.35933C1.73774 5.98606 1.50051 6.73384 1.5 7.50048V16.5005C1.50117 17.4947 1.89663 18.4478 2.59964 19.1508C3.30265 19.8538 4.2558 20.2493 5.25 20.2505H14.25C15.0167 20.2499 15.7645 20.0126 16.3912 19.5711L15.299 18.4788C14.9771 18.6546 14.6167 18.7479 14.25 18.7505Z" />
    </svg>
  );
}

CameraMutedIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

CameraMutedIcon.defaultProps = {
  size: 24,
  className: '',
  style: {},
};