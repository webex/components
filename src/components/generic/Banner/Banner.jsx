import React, {JSX} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';

/**
 * Banner component.
 *
 * @param {object} props  Data passed to the component
 * @param {JSX.Element} props.children  List of children
 * @param {string} props.className  Custom CSS class to apply
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function Banner({children, className, style}) {
  const cssClasses = webexComponentClasses('banner', className);

  return (
    <div className={cssClasses} style={style}>
      {children}
    </div>
  );
}

Banner.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

Banner.defaultProps = {
  className: '',
  style: undefined,
};
