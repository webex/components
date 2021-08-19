import React from 'react';
import PropTypes from 'prop-types';

/**
 * Pto presence SVG Icon
 *
 * @param {object} props  Data passed to the component
 * @param {number} props.size  Width and height of the icon
 * @param {string} props.className  Additional className for the component
 * @param {object} props.style  Inline style object for the component
 * @returns {object} JSX of the icon
 *
 */
export default function PtoPresenceIcon({size, className, style}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`wxc-icon ${className}`} style={style}>
      <path d="M28.9659 6.89408C28.4825 6.14577 27.7229 5.61887 26.8527 5.42827C25.9825 5.23767 25.0722 5.39882 24.3204 5.87658L17.8424 10.0135L11.4942 5.90098C11.0818 5.66915 10.6006 5.59112 10.1361 5.68076C9.67159 5.77041 9.25397 6.02193 8.95751 6.39057C8.66104 6.7592 8.50497 7.22106 8.51704 7.69396C8.52912 8.16687 8.70856 8.62016 9.02345 8.97318L12.4289 13.4705L9.52835 15.3227C8.39717 14.4846 7.10631 13.887 5.73535 13.5669C4.94483 13.4124 4.1251 13.5483 3.42675 13.9497C2.44435 14.5806 2.37885 15.2797 2.62495 15.6929L5.38675 20.1929L6.52135 22.1451C6.69097 22.4363 6.91768 22.6903 7.18787 22.8917C7.45807 23.0931 7.76618 23.2379 8.09371 23.3172C8.42124 23.3966 8.76143 23.409 9.09387 23.3537C9.4263 23.2983 9.74413 23.1763 10.0283 22.9951L16.5673 18.8184L17.0283 24.9619C17.0959 25.4311 17.332 25.8596 17.6924 26.1675C18.0529 26.4753 18.5132 26.6415 18.9872 26.6348H19.0019C19.4756 26.644 19.9366 26.4808 20.2991 26.1756C20.6616 25.8704 20.9009 25.444 20.9726 24.9756L22.4626 15.0556L27.9441 11.5556C28.3177 11.3171 28.6406 11.0071 28.8942 10.6436C29.1479 10.28 29.3273 9.87 29.4222 9.43699C29.5171 9.00397 29.5256 8.55649 29.4472 8.12018C29.3689 7.68387 29.2055 7.26702 28.9659 6.89408Z" />
    </svg>
  );
}

PtoPresenceIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

PtoPresenceIcon.defaultProps = {
  size: 24,
  className: '',
  style: {},
};
