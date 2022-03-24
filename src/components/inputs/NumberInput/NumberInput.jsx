import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {clamp} from '../../../util';
import {InputField} from '../../generic';
import Button from '../../generic/Button/Button';
import Icon from '../../generic/Icon/Icon';

const HINTS = {
  clearButton: 'Clear input',
  increaseButton: 'Increase value',
  decreaseButton: 'Decrease value',
};

/**
 * NumberInput component
 *
 * @param {object} props  Data passed to the component
 * @param {string} [props.ariaLabel]  Aria label
 * @param {boolean} [props.autoFocus=false]  Flag indicating if the input should have autoFocus
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {string} [props.error]  Error text
 * @param {string} [props.label]  Label text
 * @param {number} [props.max]  Maximum value for the input element
 * @param {number} [props.min]  Minimum value for the input element
 * @param {string} [props.name]  Input name
 * @param {Function} props.onChange  Action to perform on input change
 * @param {string} [props.placeholder]  Input placeholder
 * @param {boolean} [props.required=false]  Flag indicating input required
 * @param {object} [props.style]  Custom style to apply
 * @param {number} [props.tabIndex]  Value of the tabIndex
 * @param {number|string} [props.value]  Input value
 * @returns {object} JSX of the component
 */
export default function NumberInput({
  ariaLabel,
  autoFocus,
  className,
  error,
  label,
  max,
  min,
  name,
  onChange,
  placeholder,
  required,
  style,
  tabIndex,
  value,
}) {
  const [cssClasses, sc] = webexComponentClasses('number-input', className);
  const handleIncrement = () => onChange(clamp(Number(value) + 1, min, max));
  const handleDecrement = () => onChange(clamp(Number(value) - 1, min, max));
  const clearInput = () => onChange('');

  const clearButton = (
    <Button ariaLabel={HINTS.clearButton} type="ghost" size={28} onClick={clearInput} tabIndex={tabIndex}>
      <Icon name="cancel" size={16} />
    </Button>
  );

  const rightControls = (
    <div className={sc('controls')}>
      <Button
        ariaLabel={HINTS.increaseButton}
        className={sc('increment-button')}
        onClick={handleIncrement}
        onMouseDown={(event) => event.stopPropagation()}
        type="ghost"
      >
        <Icon name="control-up" size={13} />
      </Button>
      <Button
        ariaLabel={HINTS.decreaseButton}
        className={sc('decrement-button')}
        onClick={handleDecrement}
        onMouseDown={(event) => event.stopPropagation()}
        type="ghost"
      >
        <Icon name="control-down" size={13} />
      </Button>
    </div>
  );

  return (
    <InputField
      ariaLabel={ariaLabel}
      autoFocus={autoFocus}
      className={cssClasses}
      error={error}
      label={label}
      min={min}
      max={max}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rightControls={rightControls}
      rightIcon={value || value === 0 ? clearButton : false}
      tabIndex={tabIndex}
      style={style}
      type="number"
      value={value}
    />
  );
}

NumberInput.propTypes = {
  ariaLabel: PropTypes.string,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.shape(),
  tabIndex: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

NumberInput.defaultProps = {
  ariaLabel: undefined,
  autoFocus: false,
  className: undefined,
  error: undefined,
  label: undefined,
  max: undefined,
  min: undefined,
  name: undefined,
  placeholder: undefined,
  required: false,
  style: undefined,
  tabIndex: 0,
  value: undefined,
};
