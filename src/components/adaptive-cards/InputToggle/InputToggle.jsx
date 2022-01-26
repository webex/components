import React from 'react';
import PropTypes from 'prop-types';
import {acPropTypes, registerComponent} from '../Component/Component';

/**
 * Adaptive Cards Input.Toggle component
 * https://adaptivecards.io/explorer/Input.Toggle.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @returns {object} JSX of the component
 */
export default function InputToggle({data}) {
  return (
    <input type="checkbox" value={'value' in data ? data.value : 'true'} />
  );
}

InputToggle.propTypes = {
  data: PropTypes.shape().isRequired,
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
  wrap: acPropTypes.wrap,
};

InputToggle.acDefaultProps = {
  isVisible: true,
};

registerComponent('Input.Toggle', InputToggle);
