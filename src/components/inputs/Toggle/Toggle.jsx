import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import webexComponentClasses from '../../helpers';

/**
 * Toggle component
 *
 * @param {object} props  Data passed to the component
 * @param {string} [props.ariaLabel]  Aria-label for toggle
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {boolean} [props.disabled]  Flag indicating whether toggle is disabled
 * @param {Function} [props.onChange]  Action to perform on toggle change
 * @param {boolean} props.selected  Flag indicating whether toggle is selected
 * @param {object} [props.style]  Custom style to apply
 * @param {string} [props.title]  Title for toggle
 * @returns {object} JSX of the element
 */
export default function Toggle({
  ariaLabel,
  className,
  disabled,
  onChange,
  selected,
  style,
  title,
}) {
  const enabled = !disabled;
  const SPACE_KEY = ' ';
  const ENTER_KEY = 'Enter';
  const safeSelected = selected === true;

  const [cssClasses, sc] = webexComponentClasses('toggle', className);

  const handleClick = () => enabled && onChange(!selected);
  const handleKeyDown = (event) => {
    event.preventDefault();
    if (enabled && (event.key === SPACE_KEY || event.key === ENTER_KEY)) {
      onChange(!selected);
    }
  };

  return (
    // disabling label-has-associated-control as eslint does not see role="switch" as a nested control
    // disabling no-noninteractive-element-interactions because otherwise clicking the label does not activate the control
    // eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/no-noninteractive-element-interactions
    <label
      className={cssClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={style}
    >
      <div
        aria-checked={safeSelected ? 'true' : 'false'}
        aria-disabled={disabled ? 'true' : 'false'}
        aria-label={ariaLabel}
        className={classNames(sc('switch'), {
          [sc('switch--enabled')]: enabled,
          [sc('switch--disabled')]: disabled,
          [sc('switch--on')]: safeSelected,
          [sc('switch--off')]: !safeSelected,
        })}
        role="switch"
        tabIndex={0}
      >
        <span className={sc('slider')} />
      </div>
      <span className={sc('title')}>{title}</span>
    </label>
  );
}

Toggle.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  selected: PropTypes.bool,
  style: PropTypes.shape(),
  title: PropTypes.string,
};

Toggle.defaultProps = {
  ariaLabel: undefined,
  className: undefined,
  disabled: false,
  onChange: null,
  selected: false,
  style: undefined,
  title: undefined,
};
