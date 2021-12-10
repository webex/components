import React from 'react';
import PropTypes from 'prop-types';

/**
 * Adaptive Cards Input.Number component
 * https://adaptivecards.io/explorer/Input.Number.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @returns {object} JSX of the component
 */
export default function InputNumber({data}) {
  return (
    <input type="number" placeholder={data.placeholder} value={data.value} />
  );
}

InputNumber.propTypes = {
  data: PropTypes.shape().isRequired,
};
