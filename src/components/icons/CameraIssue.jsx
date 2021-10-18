import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';

/**
 * Camera issue SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {string} [props.className]  Additional className for the component
 * @param {object} [props.style]  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function CameraIssueIcon({
  className,
  style,
}) {
  const [cssClasses] = webexComponentClasses('camera-issue-icon', className);

  return (
    <svg width="96" height="88" viewBox="0 0 96 88" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${cssClasses}`} style={style}>
      <path d="M21.8643 54.3002V64.2002M5.86426 51.2002V10.2002C5.86426 5.8002 9.46426 2.2002 13.8643 2.2002H61.8643C66.2643 2.2002 69.8643 5.8002 69.8643 10.2002V21.3002C69.8643 22.1002 70.7643 22.6002 71.4643 22.1002L90.6643 9.3002C91.9643 8.4002 93.7643 9.4002 93.7643 11.0002V57.5002C93.7643 59.1002 91.9643 60.1002 90.6643 59.2002L71.3643 46.3002C70.6643 45.9002 69.7643 46.3002 69.7643 47.1002V58.2002C69.7643 62.6002 66.1643 66.2002 61.7643 66.2002H39.0643C38.3643 66.2002 37.6643 65.8002 37.2643 65.1002L27.0643 45.9002C24.7643 41.7002 18.7643 41.7002 16.5643 45.9002L2.66426 71.4002C0.46426 75.4002 3.36426 80.3002 7.96426 80.3002H36.8643C39.0643 80.3002 40.8643 78.5002 40.8643 76.3002C40.8643 74.1002 39.0643 72.3002 36.8643 72.3002C28.8643 72.3002 21.8643 86.3002 21.8643 86.3002" stroke="url(#wxc-icon--camera-issue)" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="wxc-icon--camera-issue" x1="47.8392" y1="2.2002" x2="47.8392" y2="86.3002" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--wxc-icon--error--gradient-start-color)" />
          <stop offset="1" stopColor="var(--wxc-icon--error--gradient-stop-color)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

CameraIssueIcon.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(),
};

CameraIssueIcon.defaultProps = {
  className: undefined,
  style: undefined,
};
