import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';

/**
 * RadioButton component.
 *
 * @param {object} props  React props passed to the component
 * @param {string} [props.ariaLabel]  Radio button aria label
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {boolean} [props.selected=false]  Flag indicating whether radio button is selected
 * @param {boolean} [props.disabled=false]  Flag indicating whether radio button is disabled
 * @param {boolean} [props.required=false]  Flag indicating whether radio button is required
 * @param {string} [props.error]  Error text
 * @param {number} [props.tabIndex]  Value of the tabIndex
 * @param {string} [props.title]  Radio button title
 * @param {Function} [props.onChange]  Action to perform on radio button change
 * @returns {object} JSX of the component
 */
export default function RadioButton({
  ariaLabel,
  className,
  selected,
  disabled,
  required,
  error,
  onChange,
  tabIndex,
  title,
}) {
  const enabled = !disabled;
  const SPACE_KEY = ' ';
  const ENTER_KEY = 'Enter';

  const [cssClasses, sc] = webexComponentClasses('radio-button', className, {
    enabled,
    disabled,
    error,
  });

  const handleClick = () => enabled && onChange(!selected);
  const handleKeyDown = (event) => {
    if (enabled && (event.key === SPACE_KEY || event.key === ENTER_KEY)) {
      event.preventDefault();
      onChange(!selected);
    }
  };

  return (
    <div
      className={cssClasses}
      role="radio"
      aria-checked={selected}
      aria-label={ariaLabel}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      required={required}
      aria-disabled={disabled}
      tabIndex={tabIndex}
    >
      <div className={sc('background')}>
        {selected && <div className={sc('foreground')} />}
      </div>
      {title && <span className={sc('title')}>{title}</span>}
    </div>
  );
}

RadioButton.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
  title: PropTypes.string,
};

RadioButton.defaultProps = {
  ariaLabel: undefined,
  className: undefined,
  selected: false,
  disabled: false,
  required: false,
  error: undefined,
  onChange: undefined,
  tabIndex: 0,
  title: undefined,
};
