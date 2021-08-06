import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';

/**
 * Badge component
 *
 * @param {object} props  Data passed to the component
 * @param {React.ReactNode[]} props.children  List of children
 * @param {string} [props.className]  Additional className for the component
 * @param {object} [props.style]  Inline style object for the component
 *
 * @returns {object}  JSX of the element
 */
export default function Badge({children, className, style}) {
  const cssClasses = webexComponentClasses('badge', className);

  return (
    <div className={cssClasses} style={style}>
      {children}
    </div>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

Badge.defaultProps = {
  className: '',
  style: {},
};
