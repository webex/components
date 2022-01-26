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
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function Image({data, className, style}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-image', className);

  return (
    <img
      src={data.url}
      className={cssClasses}
      alt={data.altText}
      style={{
        ...style,
        backgroundColor: data.backgroundColor,
        width: data.width,
      }}
    />
  );
}

Image.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

Image.defaultProps = {
  className: '',
  style: undefined,
};

Image.acPropTypes = {
  fallback: acPropTypes.fallback,
  height: acPropTypes.height,
  horizontalAlignment: acPropTypes.horizontalAlignment,
  id: acPropTypes.id,
  isVisible: acPropTypes.isVisible,
  type: acPropTypes.type,
  separator: acPropTypes.separator,
  size: acPropTypes.imageSize,
  spacing: acPropTypes.spacing,
  style: acPropTypes.imageStyle,
  width: acPropTypes.width,
};

Image.acDefaultProps = {
  horizontalAlignment: 'left',
  isVisible: true,
  size: 'medium',
};

registerComponent('Image', Image);
