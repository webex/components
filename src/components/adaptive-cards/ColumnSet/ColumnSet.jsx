import React from 'react';
import PropTypes from 'prop-types';
import Component, {registerComponent} from '../Component/Component';
import webexComponentClasses from '../../helpers';

/**
 * Adaptive Cards ColumnSet component
 * https://adaptivecards.io/explorer/ColumnSet.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {string} props.className  Custom CSS class to apply
 * @returns {object} JSX of the component
 */
export default function ColumnSet({data, className}) {
  const [cssClasses, sc] = webexComponentClasses('adaptive-cards-column-set', className);
  const classes = [];
  const getClass = (key, value) => sc(`${key}--${value}`);

  for (const [key, value] of Object.entries(data)) {
    switch (key) {
      case 'columns': break;
      case 'style':
        classes.push(getClass(key, value));
        break;
      default:
        console.log('[ColumnSet]', 'Unknown property:', key, value);
    }
  }

  return (
    <div className={`${cssClasses} ${classes.join(' ')}`}>
      {/* eslint-disable react/no-array-index-key */}
      {data.columns.map((item, index) => (
        <Component data={item} type="Column" key={index} style={{minHeight: data.minHeight}} />
      ))}
    </div>
  );
}

ColumnSet.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

ColumnSet.defaultProps = {
  className: '',
};

registerComponent('ColumnSet', ColumnSet, 'vertical');
