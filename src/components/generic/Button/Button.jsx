import React, {JSX} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {useRef, useAutoFocus} from '../../hooks';
import Tooltip from '../Tooltip/Tooltip';

/**
 * Button component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.ariaLabel  String that labels the current element
 * @param {boolean} props.autoFocus  Flag indicating if the button has autofocus
 * @param {JSX.Element} props.children  List of children
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {boolean} props.isDisabled  Flag indicating button disabled
 * @param {Function} props.onClick  OnClick callback
 * @param {boolean} [props.pressed=false]  Flag indicating if the button is pressed
 * @param {object} props.style  Inline style object for the component
 * @param {string|number} props.size  Button height
 * @param {number} props.tabIndex  Value of the tabIndex
 * @param {string} props.tooltip  Tooltip to be displayed
 * @param {'default'|'join'|'cancel'|'ghost'|'toggle'|'primary'} [props.type='default']  Button type
 * @returns {object}  JSX of the element
 */
export default function Button({
  ariaLabel,
  autoFocus,
  children,
  className,
  isDisabled,
  onClick,
  pressed,
  size,
  style,
  tabIndex,
  tooltip,
  type,
}) {
  const [cssClasses] = webexComponentClasses('button', className, {[`${type}`]: true, pressed});
  const buttonRef = useRef();

  useAutoFocus(buttonRef, autoFocus);

  return (
    <>
      <button
        className={cssClasses}
        disabled={isDisabled}
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        tabIndex={tabIndex}
        ref={buttonRef}
        style={{height: size, ...style}}
      >
        {children}
      </button>
      {tooltip && (
        <Tooltip target={buttonRef.current}>
          {tooltip}
        </Tooltip>
      )}
    </>
  );
}

Button.propTypes = {
  ariaLabel: PropTypes.string,
  autoFocus: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  pressed: PropTypes.bool,
  style: PropTypes.shape(),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  tabIndex: PropTypes.number,
  tooltip: PropTypes.string,
  type: PropTypes.oneOf(['default', 'join', 'cancel', 'ghost', 'toggle', 'primary']),
};

Button.defaultProps = {
  ariaLabel: undefined,
  autoFocus: false,
  className: '',
  isDisabled: false,
  onClick: undefined,
  pressed: false,
  style: {},
  size: 32,
  tabIndex: 0,
  tooltip: '',
  type: 'default',
};
