import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';

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
  // eslint-disable-next-line no-unused-vars
  error,
  onChange,
}) {
  const [cssClasses] = webexComponentClasses('textbox', className);

  return (
    <textarea
      className={cssClasses}
      style={style}
      aria-label={name}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      onChange={(event) => onChange(event.target.value)}
    />
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
  onChange: PropTypes.func,
};

Textbox.defaultProps = {
  className: undefined,
  style: undefined,
  placeholder: undefined,
  disabled: false,
  required: false,
  error: null,
  onChange: null,
};
