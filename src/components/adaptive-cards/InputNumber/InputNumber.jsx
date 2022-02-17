import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import AdaptiveCardContext from '../context/adaptive-card-context';
import {acPropTypes, registerComponent} from '../Component/Component';
import {formatDateTime} from '../util';
import NumberInput from '../../inputs/NumberInput/NumberInput';

/**
 * Adaptive Cards Input.Number component
 * https://adaptivecards.io/explorer/Input.Number.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Inline style for the component
 * @returns {object} JSX of the component
 */
export default function InputNumber({data, className, style}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-input-number', className);
  const {
    setValue,
    getValue,
    setInput,
    getError,
  } = useContext(AdaptiveCardContext);

  useEffect(() => {
    setInput({
      id: data.id,
      value: data.value,
      isRequired: data.isRequired,
      max: data.max,
      min: data.min,
      errorMessage: data.errorMessage,
    });
  }, [
    data.id,
    data.value,
    data.isRequired,
    data.errorMessage,
    data.max,
    data.min,
    setInput,
  ]);

  return (
    <NumberInput
      className={cssClasses}
      error={getError(data.id)}
      label={formatDateTime(data.label)}
      max={data.max}
      min={data.min}
      onChange={(value) => setValue(data.id, value)}
      placeholder={data.placeholder}
      required={data.isRequired}
      style={style}
      value={getValue(data.id)}
    />
  );
}

InputNumber.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

InputNumber.defaultProps = {
  className: '',
  style: undefined,
};

InputNumber.acPropTypes = {
  errorMessage: acPropTypes.errorMessage,
  fallback: acPropTypes.fallback,
  height: acPropTypes.height,
  id: acPropTypes.id,
  isRequired: acPropTypes.isRequired,
  isVisible: acPropTypes.isVisible,
  label: acPropTypes.label,
  max: acPropTypes.maxValue,
  min: acPropTypes.minValue,
  placeholder: acPropTypes.placeholder,
  separator: acPropTypes.separator,
  spacing: acPropTypes.spacing,
  type: acPropTypes.type,
  value: acPropTypes.value,
};
InputNumber.acDefaultProps = {
  isVisible: true,
};

registerComponent('Input.Number', InputNumber);
