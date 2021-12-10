import React from 'react';
import PropTypes from 'prop-types';

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
