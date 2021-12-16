import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {registerComponent} from '../Component/Component';

/**
 * Adaptive Cards Image component
 * https://adaptivecards.io/explorer/ImageSet.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {object} props.parentData  Parent card definition
 * @returns {object} JSX of the component
 */
export default function Image({data, parentData}) {
  const [, sc] = webexComponentClasses('adaptive-cards-image');
  const classes = [];

  const getClass = (key, value) => sc(`${key}--${value}`);

  for (const [key, value] of Object.entries(data)) {
    switch (key) {
      case 'type':
      case 'url':
      case 'altText':
      case 'backgroundColor':
      case 'size':
        break;
      case 'horizontalAlignment':
      case 'isVisible':
      case 'separator':
      case 'spacing':
      case 'style':
        classes.push(getClass(key, value));
        break;
      default:
        console.log('[Image]', 'Unknown property', key, value);
    }
  }

  classes.push(getClass('size', data.size || parentData.size || 'medium'));

  const [cssClasses] = webexComponentClasses('adaptive-cards-image', classes.join(' '));

  return (
    <img
      src={data.url}
      className={cssClasses}
      alt={data.altText}
      style={{
        backgroundColor: data.backgroundColor,
        width: data.width,
        height: data.height,
      }}
    />
  );
}

Image.propTypes = {
  data: PropTypes.shape().isRequired,
  parentData: PropTypes.shape(),
};

Image.defaultProps = {
  parentData: {},
};

registerComponent('Image', Image);
