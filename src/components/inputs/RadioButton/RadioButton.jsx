import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {useRef} from '../../hooks';

/**
 * RadioButton component.
 *
 * @param {object} props  React props passed to the component
 * @param {string} [props.ariaLabel]  Radio button aria label
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {boolean} [props.disabled=false]  Flag indicating whether radio button is disabled
 * @param {string} [props.error]  Error text
 * @param {Function} props.onChange  Action to perform on radio button change
 * @param {boolean} [props.selected=false]  Flag indicating whether radio button is selected
 * @param {number} [props.tabIndex]  Value of the tabIndex
 * @param {string} [props.title]  Radio button title
 * @returns {object} JSX of the component
 */
export default function RadioButton({
  ariaLabel,
  className,
  disabled,
  error,
  onChange,
  selected,
  tabIndex,
  title,
}) {
  const enabled = !disabled;
  const SPACE_KEY = ' ';
  const ENTER_KEY = 'Enter';
  const ref = useRef();

  const [cssClasses, sc] = webexComponentClasses('radio-button', className, {
    enabled,
    disabled,
    error,
  });

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
      role="radio"
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
  error: undefined,
  onChange: undefined,
  tabIndex: 0,
  title: undefined,
};
