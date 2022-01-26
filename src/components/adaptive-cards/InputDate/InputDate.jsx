import React from 'react';
import PropTypes from 'prop-types';
import {acPropTypes, registerComponent} from '../Component/Component';

/**
 * Adaptive Cards Input.Date component
 * https://adaptivecards.io/explorer/Input.Date.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @returns {object} JSX of the component
 */
export default function InputDate({data}) {
  const dateParts = data.value ? data.value.split('-') : [];
  const yyyy = dateParts[0] || '';
  const mm = dateParts[1] || '';
  const dd = dateParts[2] || '';

  return (
    <div>
      <input type="text" placeholder="dd" value={dd} />
      <input type="text" placeholder="mm" value={mm} />
      <input type="text" placeholder="yyyy" value={yyyy} />
    </div>
  );
}

InputDate.propTypes = {
  data: PropTypes.shape().isRequired,
};

InputDate.acPropTypes = {
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

InputDate.acDefaultProps = {
  isVisible: true,
};

registerComponent('Input.Date', InputDate);
