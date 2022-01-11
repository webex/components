import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import Label from '../Label/Label';

/**
 * Textbox component
 *
 * @param {object} props  Data passed to the component
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]   Inline style for the component
 * @param {string} props.name  Textbox name
 * @param {string} [props.placeholder]  Textbox placeholder
 * @param {boolean} [props.disabled=false]  Flag indicating whether textbox is disabled
 * @param {boolean} [props.required=false]  Flag indicating whether textbox is required
 * @param {string} [props.error]  Error text
 * @param {string} [props.label]  Label text
 * @param {Function} [props.onChange]  Action to perform on textbox change
 * @returns {object}  JSX of the element
 */
export default function Textbox({
  className,
  style,
  name,
  placeholder = name,
  disabled,
  required,
  error,
  label,
  onChange,
}) {
  const [cssClasses, sc] = webexComponentClasses('textbox', className);

  return (
    <Label className={cssClasses} style={style} required={required} label={label} error={error}>
      <textarea
        className={sc('control')}
        aria-label={name}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      />
    </Label>
  );
}

Textbox.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

Textbox.defaultProps = {
  className: undefined,
  style: undefined,
  placeholder: undefined,
  disabled: false,
  required: false,
  error: null,
  label: undefined,
  onChange: null,
};
