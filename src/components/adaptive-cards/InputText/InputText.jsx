import React, {useState} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {acPropTypes, registerComponent} from '../Component/Component';
import InputField from '../../generic/InputField/InputField';

/**
 * Adaptive Cards Input.Text component
 * https://adaptivecards.io/explorer/Input.Text.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Inline style for the component
 * @returns {object} JSX of the component
 */
export default function InputText({data, className, style}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-input-text', className);
  const [inputValue, setInputValue] = useState(data.value);
  const handleInputChange = (value) => setInputValue(value);

  return (
    <InputField
      className={cssClasses}
      style={style}
      maxLength={data.maxLength}
      placeholder={data.placeholder}
      pattern={data.regex}
      type={data.style}
      value={inputValue}
      error={data.errorMessage}
      required={data.isRequired}
      label={data.label}
      onChange={handleInputChange}
    />
  );
}

InputText.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

InputText.defaultProps = {
  className: undefined,
  style: undefined,
};

InputText.acPropTypes = {
  errorMessage: acPropTypes.errorMessage,
  height: acPropTypes.height,
  id: acPropTypes.id,
  isRequired: acPropTypes.isRequired,
  isVisible: acPropTypes.isVisible,
  label: acPropTypes.label,
  maxLength: acPropTypes.maxLength,
  placeholder: acPropTypes.placeholder,
  regex: acPropTypes.regex,
  separator: acPropTypes.separator,
  spacing: acPropTypes.spacing,
  style: acPropTypes.inputStyle,
  type: acPropTypes.type,
  value: acPropTypes.value,
};

registerComponent('Input.Text', InputText);
