import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import AdaptiveCardContext from '../context/adaptive-card-context';
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
  const {setValue, getValue, setInput} = useContext(AdaptiveCardContext);
  const [cssClasses] = webexComponentClasses('adaptive-cards-input-text', className);

  useEffect(() => {
    setInput({
      id: data.id,
      value: data.value,
      isRequired: data.isRequired,
      errorMessage: data.errorMessage,
      maxLength: data.maxLength,
      regex: data.regex,
    });
  }, [
    data.id,
    data.value,
    data.isRequired,
    data.errorMessage,
    data.maxLength,
    data.regex,
    setInput,
  ]);

  return (
    <InputField
      className={cssClasses}
      style={style}
      maxLength={data.maxLength}
      placeholder={data.placeholder}
      pattern={data.regex}
      type={data.style}
      value={getValue(data.id)}
      error={data.errorMessage}
      required={data.isRequired}
      label={data.label}
      onChange={(value) => setValue(data.id, value)}
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
