import React from 'react';
import PropTypes from 'prop-types';

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
