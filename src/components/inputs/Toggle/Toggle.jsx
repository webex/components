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
 * @param {Function} props.onChange  Action to perform on toggle change
 * @param {boolean} [props.selected=false]  Flag indicating whether toggle is selected
 * @param {object} [props.style]  Custom style to apply
 * @param {number} [props.tabIndex]  Value of the tabIndex
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
  tabIndex,
  title,
}) {
  const enabled = !disabled;
  const SPACE_KEY = ' ';
  const ENTER_KEY = 'Enter';
  const safeSelected = selected === true;

  const [cssClasses, sc] = webexComponentClasses('toggle', className);

  const handleClick = () => enabled && onChange(!selected);
  const handleKeyDown = (event) => {
    if (enabled && (event.key === SPACE_KEY || event.key === ENTER_KEY)) {
      event.preventDefault();
      onChange(!selected);
    }
  };

  return (
    <div
      aria-checked={safeSelected ? 'true' : 'false'}
      aria-disabled={disabled ? 'true' : 'false'}
      aria-label={ariaLabel}
      className={cssClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="switch"
      style={style}
      tabIndex={tabIndex}
    >
      <div
        className={classNames(sc('switch'), {
          [sc('switch--enabled')]: enabled,
          [sc('switch--disabled')]: disabled,
          [sc('switch--on')]: safeSelected,
          [sc('switch--off')]: !safeSelected,
        })}
      >
        <span className={sc('slider')} />
      </div>
      <span className={sc('title')}>{title}</span>
    </div>
  );
}

Toggle.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  style: PropTypes.shape(),
  tabIndex: PropTypes.number,
  title: PropTypes.string,
};

Toggle.defaultProps = {
  ariaLabel: undefined,
  className: undefined,
  disabled: false,
  selected: false,
  style: undefined,
  tabIndex: 0,
  title: undefined,
};
