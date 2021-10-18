import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';

/**
 * Displays a title
 *
 * @param {object} props  Data passed to the component
 * @param {React.ReactNode[]} props.children  List of children
 * @param {string} props.className  Additional className for the component
 * @param {string} props.style  Inline style for the component
 * @returns {object} JSX of the element
 */
export default function Title({children, className, style}) {
  const [cssClasses] = webexComponentClasses('title', className);

  return (
    <h5 className={cssClasses} style={style}>{children}</h5>
  );
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

Title.defaultProps = {
  className: '',
  style: {},
};
