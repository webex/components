import React from 'react';
import PropTypes from 'prop-types';

/**
 * Check SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function CheckIcon({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 18" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>
      <path d="M8.20046 17.1999C8.06863 17.2002 7.93805 17.1743 7.81633 17.1236C7.69461 17.073 7.58418 16.9987 7.49146 16.905L0.291276 9.66962C0.198683 9.57651 0.125336 9.46608 0.0754228 9.34463C0.0255091 9.22317 6.0504e-06 9.09308 0.000370053 8.96177C0.000734056 8.83046 0.026958 8.70051 0.0775442 8.57933C0.12813 8.45816 0.202088 8.34813 0.295196 8.25554C0.388303 8.16295 0.498736 8.0896 0.620189 8.03969C0.741643 7.98977 0.871738 7.96427 1.00305 7.96463C1.13436 7.965 1.26431 7.99122 1.38548 8.04181C1.50666 8.09239 1.61668 8.16635 1.70928 8.25946L8.2542 14.8366L24.3499 1.04169C24.5511 0.869196 24.8126 0.783711 25.0769 0.80404C25.3412 0.824369 25.5866 0.948847 25.759 1.15009C25.9315 1.35133 26.017 1.61286 25.9967 1.87713C25.9764 2.1414 25.8519 2.38678 25.6506 2.55927L8.85085 16.9587C8.67 17.1145 8.43917 17.2001 8.20046 17.1999Z" />
    </svg>
  );
}

CheckIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

CheckIcon.defaultProps = {
  size: 26,
  className: '',
  style: {},
};
