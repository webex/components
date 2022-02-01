import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import webexComponentClasses from '../../helpers';
import {Icon} from '../../generic';

/**
 * Checkbox component
 *
 * @param {object} props  Data passed to the component
 * @param {string} [props.ariaLabel]  Aria-label for checkbox
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {boolean} [props.disabled]  Flag indicating whether checkbox is disabled
 * @param {Function} [props.onChange]  Action to perform on toggle change
 * @param {boolean} props.selected  Flag indicating whether checkbox is selected
 * @param {object} [props.style]  Custom style to apply
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
  title,
}) {
  const enabled = !disabled;
  const checked = selected === true;
  const unchecked = selected === false;
  const indeterminate = !checked && !unchecked;
  const SPACE_KEY = ' ';
  const ENTER_KEY = 'Enter';

  const [cssClasses, sc] = webexComponentClasses('checkbox', className);

  const handleClick = () => enabled && onChange(!selected);
  const handleKeyDown = (event) => {
    if (enabled && (event.key === SPACE_KEY || event.key === ENTER_KEY)) {
      event.preventDefault();
      onChange(!selected);
    }
  };

  return (
    // disabling label-has-associated-control as eslint does not see role="checkbox" as a nested control
    // disabling no-noninteractive-element-interactions because otherwise clicking the label does not activate the control
    // eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/no-noninteractive-element-interactions
    <label
      className={cssClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={style}
    >
      <div
        aria-checked={selected}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        className={classNames(sc('box'), {
          [sc('box--enabled')]: enabled, [sc('box--disabled')]: disabled, [sc('box--checked')]: checked, [sc('box--unchecked')]: unchecked, [sc('box--indeterminate')]: indeterminate,
        })}
        role="checkbox"
        tabIndex={0}
      >
        {(checked || indeterminate) && <Icon className={sc('checkmark')} name={checked ? 'check' : 'indeterminate'} />}
      </div>
      <span className={sc('title')}>{title}</span>
    </label>
  );
}

Checkbox.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  selected: PropTypes.bool,
  style: PropTypes.shape(),
  title: PropTypes.string,
};

Checkbox.defaultProps = {
  ariaLabel: undefined,
  className: undefined,
  disabled: false,
  onChange: null,
  selected: false,
  style: undefined,
  title: undefined,
};
