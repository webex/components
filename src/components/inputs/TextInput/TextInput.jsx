import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {Button, Icon, InputField} from '../../generic';

/**
 * TextInput component
 *
 * @param {object} props  Data passed to the component
 * @param {string} [props.ariaLabel]  Aria label
 * @param {boolean} [props.autoFocus=false]  Flag indicating whether the input should have autoFocus
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {string} [props.error]  Error text
 * @param {string} [props.label]  Label text
 * @param {number} [props.maxLength]  Maximum number of characters allowed
 * @param {string} [props.name]  Input name
 * @param {Function} props.onChange  Action to perform on input change
 * @param {string} [props.pattern]  Specifies a regular expression that the element's value is checked against
 * @param {string} [props.placeholder]  Input placeholder
 * @param {boolean} [props.required=false]  Flag indicating input required
 * @param {object} [props.style]  Custom style to apply
 * @param {number} [props.tabIndex]  Value of the tabIndex
 * @param {string} [props.type=text]  Input type
 * @param {string} [props.value]  Input value
 * @returns {object} JSX of the component
 */
export default function TextInput({
  ariaLabel,
  autoFocus,
  className,
  error,
  label,
  maxLength,
  name,
  onChange,
  pattern,
  placeholder,
  required,
  style,
  tabIndex,
  type,
  value,
}) {
  const [cssClasses] = webexComponentClasses('text-input', className);
  const clearInput = () => onChange('');

  const clearButton = (
    <Button type="ghost" size={28} onClick={clearInput} tabIndex={tabIndex}>
      <Icon name="cancel" size={16} />
    </Button>
  );

  return (
    <InputField
      ariaLabel={ariaLabel}
      autoFocus={autoFocus}
      className={cssClasses}
      error={error}
      label={label}
      maxLength={maxLength}
      name={name}
      onChange={onChange}
      pattern={pattern}
      placeholder={placeholder}
      required={required}
      rightIcon={value ? clearButton : false}
      style={style}
      tabIndex={tabIndex}
      type={type}
      value={value}
    />
  );
}

TextInput.propTypes = {
  ariaLabel: PropTypes.string,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.shape(),
  tabIndex: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.string,
};

TextInput.defaultProps = {
  ariaLabel: undefined,
  autoFocus: false,
  className: undefined,
  error: undefined,
  label: undefined,
  maxLength: undefined,
  name: undefined,
  pattern: undefined,
  placeholder: undefined,
  required: false,
  style: undefined,
  tabIndex: 0,
  type: 'text',
  value: undefined,
};
