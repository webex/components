import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';

/**
 * Loader component
 *
 * @param {object} props  Data passed to the component
 * @param {string} [props.className]  Additional className for the component
 * @param {object} [props.style]  Inline style object for the component
 *
 * @returns {object} JSX of the element
 */
export default function Loader({className, style}) {
  const cssClasses = webexComponentClasses('loader', className);

  return (
    <div className={cssClasses} style={style}>
      <div className="bullet" />
    </div>
  );
}

Loader.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(),
};

Loader.defaultProps = {
  className: undefined,
  style: undefined,
};
