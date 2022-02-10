import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {InputField} from '../../generic';

/**
 * DateInput component
 *
 * @param {object} props  Data passed to the component
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Custom style to apply
 * @param {string} [props.name]  Input name
 * @param {string} [props.value]  Input value in YYYY-MM-DD format
 * @param {boolean} [props.disabled=false]  Flag indicating input disabled
 * @param {boolean} [props.required=false]  Flag indicating input required
 * @param {string} [props.error]  Error text
 * @param {string} [props.label]  Label text
 * @param {Function} props.onChange  Action to perform on input change
 * @returns {object} JSX of the component
 */
export default function DateInput({
  className,
  style,
  name,
  value,
  disabled,
  required,
  error,
  label,
  onChange,
}) {
  const [cssClasses] = webexComponentClasses('date-input', className);

  return (
    <InputField
      className={cssClasses}
      style={style}
      type="date"
      name={name}
      disabled={disabled}
      required={required}
      error={error}
      onChange={onChange}
      value={value}
      label={label}
    />
  );
}

DateInput.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(),
  name: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

DateInput.defaultProps = {
  className: undefined,
  style: undefined,
  name: undefined,
  value: undefined,
  disabled: false,
  required: false,
  error: undefined,
  label: undefined,
};
