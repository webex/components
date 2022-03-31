import React from 'react';
import PropTypes from 'prop-types';

/**
 * Download SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function DownloadIcon({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>

      <path d="M13.5 13.5005H2.5C2.36739 13.5005 2.24021 13.5532 2.14645 13.6469C2.05268 13.7407 2 13.8679 2 14.0005C2 14.1331 2.05268 14.2603 2.14645 14.354C2.24021 14.4478 2.36739 14.5005 2.5 14.5005H13.5C13.6326 14.5005 13.7598 14.4478 13.8536 14.354C13.9473 14.2603 14 14.1331 14 14.0005C14 13.8679 13.9473 13.7407 13.8536 13.6469C13.7598 13.5532 13.6326 13.5005 13.5 13.5005Z" fill="white" fillOpacity="0.95" />
      <path d="M7.6465 10.3535C7.69292 10.4 7.74803 10.4368 7.80868 10.4619C7.86934 10.4871 7.93436 10.5 8.00002 10.5C8.06567 10.5 8.13069 10.4871 8.19135 10.4619C8.252 10.4368 8.30711 10.4 8.35353 10.3535L11.3535 7.35352C11.4 7.30709 11.4368 7.25198 11.4619 7.19132C11.487 7.13066 11.5 7.06565 11.5 7C11.5 6.93435 11.487 6.86934 11.4619 6.80868C11.4368 6.74802 11.4 6.69291 11.3535 6.64648C11.3071 6.60006 11.252 6.56323 11.1913 6.53811C11.1307 6.51299 11.0657 6.50005 11 6.50005C10.9344 6.50005 10.8694 6.51299 10.8087 6.53811C10.748 6.56323 10.6929 6.60006 10.6465 6.64648L8.5 8.79297V2C8.5 1.86739 8.44732 1.74021 8.35355 1.64645C8.25979 1.55268 8.13261 1.5 8 1.5C7.86739 1.5 7.74022 1.55268 7.64645 1.64645C7.55268 1.74021 7.5 1.86739 7.5 2V8.79297L5.3535 6.64647C5.2596 6.55338 5.13265 6.50128 5.00043 6.50156C4.86821 6.50185 4.74148 6.55451 4.64799 6.64801C4.5545 6.7415 4.50185 6.86823 4.50157 7.00045C4.50129 7.13267 4.5534 7.25962 4.6465 7.35352L7.6465 10.3535Z" fill="white" fillOpacity="0.95" />

    </svg>
  );
}

DownloadIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

DownloadIcon.defaultProps = {
  size: 24,
  className: '',
  style: {},
};
