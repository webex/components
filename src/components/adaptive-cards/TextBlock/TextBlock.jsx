import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';

/**
 * Adaptive Cards TextBlock component
 * https://adaptivecards.io/explorer/Input.Text.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @returns {object} JSX of the component
 */
export default function TextBlock({data}) {
  const [cssClasses, sc] = webexComponentClasses('text-block', undefined);
  const classes = [];
  const getClass = (key, value) => sc(`${key}--${value}`);

  for (const [key, value] of Object.entries(data)) {
    switch (key) {
      case 'type': break;
      case 'text': break;
      case 'fontType':
      case 'horizontalAlignment':
      case 'size':
      case 'weight':
      case 'wrap':
      case 'style':
        classes.push(getClass(key, value));
        break;
      default:
        console.log('[TextBlock]', 'Unknown property:', key, value);
    }
  }

  return (
    <div
      className={`${cssClasses} ${classes.join(' ')}`}
      role={data.style === 'heading' ? 'heading' : undefined}
    >
      {data.text}
    </div>
  );
}

TextBlock.propTypes = {
  data: PropTypes.shape().isRequired,
};
