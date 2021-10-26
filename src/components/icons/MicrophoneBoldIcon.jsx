import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';

/**
 * Microphone bold SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function MicrophoneBoldIcon({size, className, style}) {
  const [cssClasses] = webexComponentClasses('microphone-bold-icon', className);

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${cssClasses}`} style={style}>
      <path d="M36.0039 41.9996H33.0354C31.2654 42.0434 29.5395 41.4436 28.178 40.3117C26.8165 39.1797 25.9119 37.5923 25.6318 35.844C27.699 35.4611 29.5672 34.3674 30.9128 32.7522C32.2585 31.1369 32.9969 29.102 33.0002 26.9996V11.9996C33.0002 9.61269 32.052 7.3235 30.3642 5.63567C28.6764 3.94785 26.3872 2.99963 24.0002 2.99963C21.6133 2.99963 19.3241 3.94785 17.6363 5.63567C15.9485 7.3235 15.0002 9.61269 15.0002 11.9996V26.9996C15.0039 29.1419 15.7712 31.2126 17.1642 32.8401C18.5572 34.4676 20.4847 35.5452 22.6007 35.8795C22.8833 38.1993 23.9408 40.3558 25.6018 41.9996H12.0039C11.6061 41.9996 11.2246 42.1577 10.9432 42.439C10.6619 42.7203 10.5039 43.1018 10.5039 43.4996C10.5039 43.8975 10.6619 44.279 10.9432 44.5603C11.2246 44.8416 11.6061 44.9996 12.0039 44.9996H36.0039C36.4017 44.9996 36.7833 44.8416 37.0646 44.5603C37.3459 44.279 37.5039 43.8975 37.5039 43.4996C37.5039 43.1018 37.3459 42.7203 37.0646 42.439C36.7833 42.1577 36.4017 41.9996 36.0039 41.9996ZM18.0002 26.9996V11.9996C18.0002 10.4083 18.6324 8.88217 19.7576 7.75695C20.8828 6.63173 22.4089 5.99959 24.0002 5.99959C25.5915 5.99959 27.1177 6.63173 28.2429 7.75695C29.3681 8.88217 30.0002 10.4083 30.0002 11.9996V26.9996C30.0002 28.5909 29.3681 30.117 28.2429 31.2422C27.1177 32.3674 25.5915 32.9996 24.0002 32.9996C22.4089 32.9996 20.8828 32.3674 19.7576 31.2422C18.6324 30.117 18.0002 28.5909 18.0002 26.9996Z" />
    </svg>
  );
}

MicrophoneBoldIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

MicrophoneBoldIcon.defaultProps = {
  size: 24,
  className: '',
  style: {},
};
