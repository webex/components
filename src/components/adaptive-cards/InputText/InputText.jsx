import React from 'react';
import PropTypes from 'prop-types';

/**
 * Adaptive Cards Input.Text component
 * https://adaptivecards.io/explorer/Input.Text.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @returns {object} JSX of the component
 */
export default function InputText({data}) {
  return (
    <input type="text" placeholder={data.placeholder} value={data.value} />
  );
}

InputText.propTypes = {
  data: PropTypes.shape().isRequired,
};
