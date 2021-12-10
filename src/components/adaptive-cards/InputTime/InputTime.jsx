import React from 'react';
import PropTypes from 'prop-types';

/**
 * Adaptive Cards Input.Time component
 * https://adaptivecards.io/explorer/Input.Time.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @returns {object} JSX of the component
 */
export default function InputTime({data}) {
  const timeParts = data.value ? data.value.split(':') : [];
  const hh = timeParts[0] || '';
  const mm = timeParts[1] || '';

  return (
    <div>
      <input type="text" placeholder="hh" value={hh} />
      <input type="text" placeholder="mm" value={mm} />
    </div>
  );
}

InputTime.propTypes = {
  data: PropTypes.shape().isRequired,
};
