import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {acPropTypes, registerComponent} from '../Component/Component';
import {Select} from '../../generic';
import {range, pad2Zeros} from '../../../util';
import AdaptiveCardContext from '../context/adaptive-card-context';
import Label from '../../inputs/Label/Label';

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
  const [cssClasses, sc] = webexComponentClasses('adaptive-cards-input-time', className);
  const {
    setValue,
    getValue,
    setInput,
    getError,
  } = useContext(AdaptiveCardContext);
  const timeParts = getValue(data.id).split(':');
  const hours = (timeParts[0] || '').padStart(2, '0');
  const minutes = (timeParts[1] || '').padStart(2, '0');
  const hoursOptions = range(0, 23).map(pad2Zeros).map((hh) => ({value: hh, label: hh}));
  const minutesOptions = range(0, 59).map(pad2Zeros).map((mm) => ({value: mm, label: mm}));

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
    <Label
      className={cssClasses}
      error={getError(data.id)}
      label={data.label}
      required={data.isRequired}
      style={style}
    >
      <div className={sc('body')}>
        <Select
          ariaLabel={data.label ? `${data.label} - Hour` : 'Hour'}
          value={hours}
          onChange={(value) => setValue(data.id, `${value}:${minutes}`)}
          options={hoursOptions}
        />
        <span className={sc('separator')}>:</span>
        <Select
          ariaLabel={data.label ? `${data.label} - Minutes` : 'Minutes'}
          value={minutes}
          onChange={(value) => setValue(data.id, `${hours}:${value}`)}
          options={minutesOptions}
        />
      </div>
    </Label>
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
