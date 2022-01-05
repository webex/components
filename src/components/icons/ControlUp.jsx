import React from 'react';
import PropTypes from 'prop-types';

/**
 * Control Up SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function ControlUp({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 7" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>
      <path d="M0.552614 4.2235C0.581975 4.28225 0.62262 4.33463 0.672228 4.37766C0.721836 4.42069 0.779435 4.45353 0.841736 4.4743C0.904037 4.49507 0.969819 4.50336 1.03533 4.4987C1.10083 4.49405 1.16478 4.47653 1.22351 4.44715L6.99996 1.55895L12.7762 4.44715C12.8948 4.50647 13.0322 4.51623 13.158 4.47429C13.2838 4.43235 13.3878 4.34215 13.4471 4.22353C13.5065 4.1049 13.5162 3.96757 13.4743 3.84175C13.4323 3.71593 13.3421 3.61192 13.2235 3.5526L7.22351 0.552603C7.15406 0.517913 7.07749 0.499854 6.99986 0.499854C6.92223 0.499854 6.84566 0.517913 6.77621 0.552603L0.776214 3.5526C0.717475 3.58197 0.665097 3.62262 0.622069 3.67223C0.579042 3.72184 0.546209 3.77944 0.525445 3.84174C0.504681 3.90404 0.496394 3.96982 0.501056 4.03532C0.505717 4.10083 0.523237 4.16477 0.552614 4.2235Z" />
    </svg>

  );
}

ControlUp.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

ControlUp.defaultProps = {
  size: 26,
  className: '',
  style: {},
};
