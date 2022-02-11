import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {acPropTypes, registerComponent} from '../Component/Component';
import AdaptiveCardContext from '../context/adaptive-card-context';
import {formatDateTime} from '../util';
import TimeInput from '../../inputs/TimeInput/TimeInput';

/**
 * Adaptive Cards Input.Time component
 * https://adaptivecards.io/explorer/Input.Time.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Inline style for the component
 * @returns {object} JSX of the component
 */
export default function InputTime({data, className, style}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-input-time', className);
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
    <TimeInput
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

InputTime.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

InputTime.defaultProps = {
  className: undefined,
  style: undefined,
};

InputTime.acPropTypes = {
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

InputTime.acDefaultProps = {
  isVisible: true,
};

registerComponent('Input.Time', InputTime);
