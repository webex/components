import React from 'react';
import PropTypes from 'prop-types';
import Component, {registerComponent} from '../Component/Component';
import webexComponentClasses from '../../helpers';

/**
 * Adaptive Cards Column component
 * https://adaptivecards.io/explorer/Column.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @returns {object} JSX of the component
 */
export default function Column({data}) {
  const [cssClasses, sc] = webexComponentClasses('column');
  const classes = [];
  const getClass = (key, value) => sc(`${key}--${value}`);

  for (const [key, value] of Object.entries(data)) {
    switch (key) {
      case 'items': break;
      case 'bleed':
      case 'rtl':
      case 'style':
        classes.push(getClass(key, value));
        break;
      default:
        console.log('[Column]', 'Unknown property:', key, value);
    }
  }

  return (
    <div className={`${cssClasses} ${classes.join(' ')}`}>
      {/* eslint-disable react/no-array-index-key */}
      {data.items?.map((item, index) => <Component data={item} key={index} />)}
    </div>
  );
}

Column.propTypes = {
  data: PropTypes.shape().isRequired,
};

registerComponent('Column', Column);
