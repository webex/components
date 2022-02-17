import React, {useState} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {Button, Icon, InputField} from '../../generic';

const HINTS = {
  hiddenPasswordButton: 'Show password',
  showedPasswordButton: 'Hide password',
};

/**
 * PasswordInput component
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
 * @param {string} [props.value]  Input value
 * @returns {object} JSX of the component
 */
export default function PasswordInput({
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
  value,
}) {
  const [cssClasses] = webexComponentClasses('password-input', className);
  const [isPwdRevealed, setIsPwdRevealed] = useState(false);
  const toggleIsPwdRevealed = () => {
    setIsPwdRevealed((revealed) => !revealed);
  };

  const showPasswordButton = (
    <Button
      ariaLabel={isPwdRevealed ? HINTS.showedPasswordButton : HINTS.hiddenPasswordButton}
      onClick={toggleIsPwdRevealed}
      size={28}
      tabIndex={tabIndex}
      type="ghost"
    >
      <Icon name={isPwdRevealed ? 'hide-password' : 'show-password'} />
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
      rightIcon={value ? showPasswordButton : false}
      style={style}
      tabIndex={tabIndex}
      type={isPwdRevealed ? 'text' : 'password'}
      value={value}
    />
  );
}

PasswordInput.propTypes = {
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
  value: PropTypes.string,
};

PasswordInput.defaultProps = {
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
  value: undefined,
};
