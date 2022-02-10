import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {formatDateTime} from '../util';
import AdaptiveCardContext from '../context/adaptive-card-context';
import {acPropTypes, registerComponent} from '../Component/Component';
import DateInput from '../../inputs/DateInput/DateInput';

/**
 * Adaptive Cards Input.Date component
 * https://adaptivecards.io/explorer/Input.Date.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Inline style for the component
 * @returns {object} JSX of the component
 */
export default function InputDate({data, className, style}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-input-date', className);
  const {
    setValue,
    getValue,
    setInput,
    getError,
  } = useContext(AdaptiveCardContext);

  useEffect(() => {
    setInput({
      id: data.id,
      max: data.max,
      min: data.min,
      value: data.value,
      errorMessage: data.errorMessage,
      isRequired: data.isRequired,
    });
  }, [
    data.id,
    data.max,
    data.min,
    data.value,
    data.errorMessage,
    data.isRequired,
    setInput,
  ]);

  return (
    <DateInput
      className={cssClasses}
      style={style}
      max={data.max}
      min={data.min}
      value={getValue(data.id)}
      error={getError(data.id)}
      required={data.isRequired}
      label={formatDateTime(data.label)}
      onChange={(value) => setValue(data.id, value)}
    />
  );
}

InputDate.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

InputDate.defaultProps = {
  className: undefined,
  style: undefined,
};

InputDate.acPropTypes = {
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

InputDate.acDefaultProps = {
  isVisible: true,
};

registerComponent('Input.Date', InputDate);
