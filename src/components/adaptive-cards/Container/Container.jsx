import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import Component, {registerComponent} from '../Component/Component';

/**
 * Adaptive Cards Container component
 * https://adaptivecards.io/explorer/Container.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @returns {object} JSX of the component
 */
export default function Container({data}) {
  const [, sc] = webexComponentClasses('container');
  const classes = [];

  const getClass = (key, value) => sc(`${key}--${value}`);

  for (const [key, value] of Object.entries(data)) {
    switch (key) {
      case 'backgroundImage':
      case 'bleed':
      case 'items':
      case 'minHeight':
      case 'verticalContentAlignment':
      case 'type':
        break;
      case 'style':
        classes.push(getClass(key, value));
        break;
      default:
        console.log('[Container]', 'Unknown property', key, value);
    }
  }

  const [cssClasses] = webexComponentClasses('container', classes.join(' '));

  return (
    <div className={cssClasses}>
      {/* eslint-disable-next-line react/no-array-index-key */}
      {data.items.map((item, index) => <Component data={item} key={index} />)}
    </div>
  );
}

Container.propTypes = {
  data: PropTypes.shape().isRequired,
};

registerComponent('Container', Container, 'vertical');
