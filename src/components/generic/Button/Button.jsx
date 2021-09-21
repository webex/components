import React, {JSX, useRef} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import Tooltip from '../Tooltip/Tooltip';

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
 * @param {string} props.tooltip  Tooltip to be displayed
 * @param {'default'|'join'|'cancel'|'ghost'} [props.type='default']  Button type
 * @returns {object}  JSX of the element
 */
export default function Button({
  ariaLabel,
  children,
  className,
  isDisabled,
  onClick,
  tooltip,
  style,
  type,
}) {
  const [cssClasses] = webexComponentClasses('button', className, {[`${type}`]: true});
  const buttonRef = useRef(null);

  return (
    <>
      <button
        className={cssClasses}
        disabled={isDisabled}
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        ref={buttonRef}
        style={style}
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
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  tooltip: PropTypes.string,
  style: PropTypes.shape(),
  type: PropTypes.string,
};

Button.defaultProps = {
  ariaLabel: undefined,
  className: '',
  isDisabled: false,
  tooltip: '',
  style: {},
  type: 'default',
};
