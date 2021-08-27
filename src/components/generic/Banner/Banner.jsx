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
 * @param {'top' | 'bottom'} [props.type='top']  Type of the banner, indicating the position
 * @returns {object} JSX of the component
 */
export default function Banner({
  children,
  className,
  style,
  type,
}) {
  const cssClasses = webexComponentClasses('banner', className, {[`-${type}`]: true});

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
  type: PropTypes.oneOf(['top', 'bottom']),
};

Banner.defaultProps = {
  className: '',
  style: undefined,
  type: 'top',
};
