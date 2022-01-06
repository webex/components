import React, {useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import AdaptiveCardContext from '../context/adaptive-card-context';
import {acPropTypes, registerComponent} from '../Component/Component';
import Toggle from '../../inputs/Toggle/Toggle';

/**
 * Adaptive Cards Input.Toggle component
 * https://adaptivecards.io/explorer/Input.Toggle.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Inline style for the component
 * @returns {object} JSX of the component
 */
export default function InputToggle({data, className, style}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-input-toggle', className);
  const {getValue, setInput, setValue} = useContext(AdaptiveCardContext);
  const value = getValue(data.id);
  const checked = value === data.valueOn;
  const handleInputChange = () => {
    setValue(data.id, checked ? data.valueOff : data.valueOn);
  };

  useEffect(() => (
    setInput({
      id: data.id,
      value: data.value === data.valueOn ? data.valueOn : data.valueOff,
    })
  ), [data.id, data.value, data.valueOn, data.valueOff, setInput]);

  return (
    <Toggle
      className={cssClasses}
      style={style}
      selected={checked}
      required={data.isRequired}
      onChange={handleInputChange}
      title={data.title}
    />
  );
}

InputToggle.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

InputToggle.defaultProps = {
  className: undefined,
  style: undefined,
};

InputToggle.acPropTypes = {
  errorMessage: acPropTypes.errorMessage,
  height: acPropTypes.height,
  id: acPropTypes.id,
  isRequired: acPropTypes.isRequired,
  isVisible: acPropTypes.isVisible,
  label: acPropTypes.label,
  separator: acPropTypes.separator,
  spacing: acPropTypes.spacing,
  title: acPropTypes.title,
  type: acPropTypes.type,
  value: acPropTypes.value,
  valueOff: acPropTypes.valueOff,
  valueOn: acPropTypes.valueOn,
  wrap: acPropTypes.wrap,
};

InputToggle.acPropTypes = {
  errorMessage: acPropTypes.errorMessage,
  fallback: acPropTypes.fallback,
  height: acPropTypes.height,
  id: acPropTypes.id,
  isRequired: acPropTypes.isRequired,
  isVisible: acPropTypes.isVisible,
  label: acPropTypes.label,
  separator: acPropTypes.separator,
  spacing: acPropTypes.spacing,
  title: acPropTypes.title,
  type: acPropTypes.type,
  value: acPropTypes.value,
  valueOff: acPropTypes.valueOff,
  valueOn: acPropTypes.valueOn,
  wrap: acPropTypes.wrap,
};

InputToggle.acDefaultProps = {
  isVisible: true,
  value: 'false',
  valueOff: 'false',
  valueOn: 'true',
};

registerComponent('Input.Toggle', InputToggle);
