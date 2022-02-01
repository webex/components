import React, {useState} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import Button from '../Button/Button';
import {useRef, useAutoFocus} from '../../hooks';
import {clamp} from '../../../util';
import Icon from '../Icon/Icon';
import Label from '../../inputs/Label/Label';

const HINTS = {
  hiddenPasswordButton: 'Show password',
  showedPasswordButton: 'Hide password',
};

/**
 * Input Field component.
 *
 * @param {object} props  Data passed to the component
 * @param {boolean} [props.autoFocus=false]  Flag indicating if the input should have autoFocus
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Custom style to apply
 * @param {string} [props.type=text]  Input type
 * @param {string} [props.name]  Input name
 * @param {(string|number)} [props.value]  Input value
 * @param {string} [props.placeholder]  Input placeholder
 * @param {number} [props.max]  Maximum value for the input element
 * @param {number} [props.min]  Minimum value for the input element
 * @param {number} [props.maxLength]  Maximum number of characters allowed
 * @param {string} [props.pattern]  Specifies a regular expression that the element's value is checked against
 * @param {Function} [props.onChange]  Action to perform on input change
 * @param {boolean} [props.disabled=false]  Flag indicating input disabled
 * @param {string} [props.error]  Error text
 * @param {string} [props.label]  Label text
 * @param {string} [props.ariaLabel]  Hint to be displayed as aria-label
 * @param {boolean} [props.required=false]  Flag indicating input required
 * @param {number} [props.tabIndex]  Value of the tabIndex
 * @returns {object} JSX of the component
 */
export default function InputField({
  className,
  style,
  type,
  name,
  value,
  placeholder,
  maxLength,
  pattern,
  onChange,
  max,
  min,
  disabled,
  error,
  label,
  ariaLabel,
  required,
  autoFocus,
  tabIndex,
}) {
  const [cssClasses, sc] = webexComponentClasses('input-field', className, {error});
  const [isPwdRevealed, setIsPwdRevealed] = useState(false);
  const inputRef = useRef();

  const handleChange = (event) => onChange(event.target.value);
  const handleIncrement = () => onChange(clamp(Number(value) + 1, min, max));
  const handleDecrement = () => onChange(clamp(Number(value) - 1, min, max));
  const clearInput = () => onChange('');

  const toggleIsPwdRevealed = () => {
    setIsPwdRevealed((revealed) => !revealed);
  };

  useAutoFocus(inputRef, autoFocus);

  return (
    <Label
      className={cssClasses}
      error={error}
      label={label}
      required={required}
      style={style}
    >
      <div className={sc('form-control')}>
        <input
          type={isPwdRevealed ? 'text' : type}
          value={value}
          name={name}
          className={sc('input')}
          placeholder={placeholder}
          max={max}
          min={min}
          maxLength={maxLength}
          pattern={pattern}
          onChange={handleChange}
          disabled={disabled}
          aria-label={ariaLabel}
          required={required}
          // disabling no-autofocus because otherwise this element cannot be autofocused depending on the autoFocus prop
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          tabIndex={tabIndex}
          ref={inputRef}
        />
        {type === 'password' && value && (
          <Button
            type="ghost"
            className={sc('input-field-right-icon')}
            size={28}
            onClick={toggleIsPwdRevealed}
            tabIndex={tabIndex}
            ariaLabel={isPwdRevealed ? HINTS.showedPasswordButton : HINTS.hiddenPasswordButton}
          >
            <Icon name={isPwdRevealed ? 'hide-password' : 'show-password'} />
          </Button>
        )}
        {type !== 'password' && value !== undefined && (
          <Button type="ghost" className={sc('input-field-right-icon')} size={28} onClick={clearInput}>
            <Icon name="cancel" size={16} />
          </Button>
        )}
        {type === 'number' && (
          <div className={sc('input-controls')}>
            <Button type="ghost" className={sc('input-increment-button')} onClick={handleIncrement}>
              <Icon name="control-up" size={13} />
            </Button>
            <Button type="ghost" className={sc('input-decrement-button')} onClick={handleDecrement}>
              <Icon name="control-down" size={13} />
            </Button>
          </div>
        )}
      </div>
    </Label>
  );
}

InputField.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.shape(),
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  pattern: PropTypes.string,
  onChange: PropTypes.func,
  max: PropTypes.number,
  min: PropTypes.number,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  ariaLabel: PropTypes.string,
  required: PropTypes.bool,
  tabIndex: PropTypes.number,
};

InputField.defaultProps = {
  autoFocus: false,
  className: undefined,
  style: undefined,
  type: 'text',
  value: undefined,
  name: undefined,
  placeholder: undefined,
  maxLength: undefined,
  pattern: undefined,
  onChange: undefined,
  max: undefined,
  min: undefined,
  disabled: false,
  error: undefined,
  label: undefined,
  ariaLabel: undefined,
  required: false,
  tabIndex: 0,
};
