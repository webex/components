import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {acPropTypes, registerComponent} from '../Component/Component';

/**
 * Adaptive Cards Image component
 * https://adaptivecards.io/explorer/ImageSet.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {string} props.className  Custom CSS class to apply
 * @returns {object} JSX of the component
 */
export default function Image({data, className}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-image', className);

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
  className: PropTypes.string,
};

Image.defaultProps = {
  className: '',
};

Image.acPropTypes = {
  horizontalAlignment: acPropTypes.horizontalAlignment,
  id: acPropTypes.id,
  isVisible: acPropTypes.isVisible,
  type: acPropTypes.type,
  separator: acPropTypes.separator,
  size: acPropTypes.imageSize,
  spacing: acPropTypes.spacing,
  style: acPropTypes.imageStyle,
};

registerComponent('Image', Image);
