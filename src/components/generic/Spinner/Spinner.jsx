import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';

/**
 * Spinner component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Additional className for the component
 * @param {string} props.style  Inline style for the component
 * @param {number} props.size  Inline size for the component
 * @returns {object} JSX of the element
 */
export default function Spinner({className, size, style}) {
  const [cssClasses] = webexComponentClasses('spinner', className);
  const cssStyle = {...style};

  if (size) {
    cssStyle.width = size;
    cssStyle.height = size;
  }

  return (
    <div className={cssClasses} style={cssStyle} />
  );
}

Spinner.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.shape(),
};

Spinner.defaultProps = {
  className: '',
  size: 30,
  style: {},
};
