import React, {JSX} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';

/**
 * Button component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.ariaLabel  String that labels the current element
 * @param {JSX.Element} props.children  List of children
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {boolean} props.isDisabled  Flag indicating button disabled
 * @param {Function} props.onClick  OnClick callback
 * @param {object} props.style  Inline style object for the component
 * @param {string} props.title  Tooltip to be displayed
 * @param {'default'|'join'|'cancel'|'ghost'} [props.type='default']  Button type
 * @returns {object}  JSX of the element
 */
export default function Button({
  ariaLabel,
  children,
  className,
  isDisabled,
  onClick,
  title,
  style,
  type,
}) {
  const [cssClasses] = webexComponentClasses('button', className, {[`${type}`]: true});

  return (
    <button className={cssClasses} disabled={isDisabled} title={title} type="button" onClick={onClick} style={style} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

Button.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  style: PropTypes.shape(),
  type: PropTypes.string,
};

Button.defaultProps = {
  ariaLabel: undefined,
  className: '',
  isDisabled: false,
  title: '',
  style: {},
  type: 'default',
};
