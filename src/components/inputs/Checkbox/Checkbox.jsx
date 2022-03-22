import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import webexComponentClasses from '../../helpers';
import {Icon} from '../../generic';
import {useRef} from '../../hooks';

/**
 * Checkbox component
 *
 * @param {object} props  Data passed to the component
 * @param {string} [props.ariaLabel]  Aria-label for checkbox
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {boolean} [props.disabled]  Flag indicating whether checkbox is disabled
 * @param {Function} props.onChange  Action to perform on toggle change
 * @param {boolean} [props.selected]  Flag indicating whether checkbox is selected
 * @param {object} [props.style]  Custom style to apply
 * @param {number} [props.tabIndex]  Value of the tabIndex
 * @param {string} [props.title]  Title for checkbox
 * @returns {object} JSX of the element
 */
export default function Checkbox({
  ariaLabel,
  className,
  disabled,
  onChange,
  selected,
  style,
  tabIndex,
  title,
}) {
  const enabled = !disabled;
  const checked = selected === true;
  const unchecked = selected === false;
  const indeterminate = !checked && !unchecked;
  const SPACE_KEY = ' ';
  const ENTER_KEY = 'Enter';
  const ref = useRef();

  const [cssClasses, sc] = webexComponentClasses('checkbox', className);

  const handleClick = () => enabled && onChange(!selected);
  const handleKeyDown = (event) => {
    let toFocus;

    if (enabled && (event.key === SPACE_KEY || event.key === ENTER_KEY)) {
      event.preventDefault();
      onChange(!selected);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault(); // prevent page scrolling
      event.stopPropagation(); // prevent other navigation
      toFocus = ref.current.previousElementSibling;
    } else if (event.key === 'ArrowDown') {
      event.preventDefault(); // prevent page scrolling
      event.stopPropagation(); // prevent other navigation
      toFocus = ref.current.nextElementSibling;
    }

    if (toFocus) {
      toFocus.focus();
    }
  };

  return (
    <div
      aria-checked={selected}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      className={cssClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={ref}
      role="checkbox"
      style={style}
      tabIndex={tabIndex}
    >
      <div
        className={classNames(sc('box'), {
          [sc('box--enabled')]: enabled,
          [sc('box--disabled')]: disabled,
          [sc('box--checked')]: checked,
          [sc('box--unchecked')]: unchecked,
          [sc('box--indeterminate')]: indeterminate,
        })}
      >
        {(checked || indeterminate) && <Icon className={sc('checkmark')} name={checked ? 'check' : 'indeterminate'} />}
      </div>
      <span className={sc('title')}>{title}</span>
    </div>
  );
}

Checkbox.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  style: PropTypes.shape(),
  tabIndex: PropTypes.number,
  title: PropTypes.string,
};

Checkbox.defaultProps = {
  ariaLabel: undefined,
  className: undefined,
  disabled: false,
  selected: false,
  style: undefined,
  tabIndex: 0,
  title: undefined,
};
