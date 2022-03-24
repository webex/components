import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import webexComponentClasses from '../../helpers';
import {useRef, useAutoFocus} from '../../hooks';
import {uniqueId} from '../../../util';
import Label from '../../inputs/Label/Label';

/**
 * Generic input field component for building more specific components (text, date, number, etc.).
 * Should not be used directly in forms.
 *
 * @param {object} props  Data passed to the component
 * @param {string} [props.ariaLabel]  Aria label
 * @param {boolean} [props.autoFocus=false]  Flag indicating if the input should have autoFocus
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {boolean} [props.disabled=false]  Flag indicating input disabled
 * @param {string} [props.error]  Error text
 * @param {string} [props.id]  DOM id
 * @param {string} [props.label]  Label text
 * @param {number} [props.max]  Maximum value for the input element
 * @param {number} [props.maxLength]  Maximum number of characters allowed
 * @param {number} [props.min]  Minimum value for the input element
 * @param {string} [props.name]  Input name
 * @param {Function} [props.onChange]  Action to perform on input change
 * @param {string} [props.pattern]  Specifies a regular expression that the element's value is checked against
 * @param {string} [props.placeholder]  Input placeholder
 * @param {boolean} [props.required=false]  Flag indicating input required
 * @param {React.JSX.Element} [props.rightControls]  Controls to be displayed to the right of the input
 * @param {boolean|React.JSX.Element} [props.rightIcon]  Icon to be displayed on the right side of the input
 * @param {object} [props.style]  Custom style to apply
 * @param {number} [props.tabIndex]  Value of the tabIndex
 * @param {string} [props.type=text]  Input type
 * @param {(string|number)} [props.value]  Input value
 * @returns {object} JSX of the component
 */
export default function InputField({
  ariaLabel,
  autoFocus,
  className,
  disabled,
  error,
  id: domId,
  label,
  max,
  maxLength,
  min,
  name,
  onChange,
  pattern,
  placeholder,
  required,
  rightControls,
  rightIcon,
  style,
  tabIndex,
  type,
  value,
}) {
  const [cssClasses, sc] = webexComponentClasses('input-field', className, {
    error,
    'has-right-icon': rightIcon !== undefined,
    'has-right-controls': rightControls,
  });
  const inputRef = useRef();
  const handleChange = (event) => onChange(event.target.value);
  const id = domId || uniqueId();

  const onKeyDown = (event) => {
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    if (keys.includes(event.key)) {
      event.stopPropagation(); // prevent other navigation
    }
  };

  useAutoFocus(inputRef, autoFocus);

  return (
    <Label
      className={cssClasses}
      error={error}
      id={id}
      label={label}
      required={required}
      style={style}
    >
      <div className={sc('form-control')}>
        <input
          aria-errormessage={error && `${id}-error`}
          aria-invalid={error ? 'true' : 'false'}
          aria-label={ariaLabel}
          aria-labelledby={`${id}-label`}
          // disabling no-autofocus because otherwise this element cannot be autofocused depending on the autoFocus prop
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          className={classNames(sc('input'), {[sc('error')]: error})}
          disabled={disabled}
          id={`${id}-control`}
          max={max}
          maxLength={maxLength}
          min={min}
          name={name}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          pattern={pattern}
          placeholder={placeholder}
          ref={inputRef}
          required={required}
          tabIndex={tabIndex}
          type={type}
          value={value}
        />
        {!!rightIcon && (
          <span className={sc('right-icon')}>
            {rightIcon}
          </span>
        )}
        {rightControls && (
          <div className={sc('right-controls')}>
            {rightControls}
          </div>
        )}
      </div>
    </Label>
  );
}

InputField.propTypes = {
  ariaLabel: PropTypes.string,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  max: PropTypes.number,
  maxLength: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rightControls: PropTypes.node,
  rightIcon: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  style: PropTypes.shape(),
  tabIndex: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

InputField.defaultProps = {
  ariaLabel: undefined,
  autoFocus: false,
  className: undefined,
  disabled: false,
  error: undefined,
  id: undefined,
  label: undefined,
  max: undefined,
  maxLength: undefined,
  min: undefined,
  name: undefined,
  onChange: undefined,
  pattern: undefined,
  placeholder: undefined,
  required: false,
  rightControls: undefined,
  rightIcon: undefined,
  style: undefined,
  tabIndex: 0,
  type: 'text',
  value: undefined,
};
