import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import Component, {acPropTypes, registerComponent} from '../Component/Component';

/**
 * Adaptive Cards ImageSet component
 * https://adaptivecards.io/explorer/ImageSet.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} props.inherited  Inherited data
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function ImageSet({
  data, className, inherited, style,
}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-image-set', className);

  return (
    <div className={cssClasses}>
      {data.images.map((image, index) => {
        const itemData = {size: data.imageSize, ...image};

        return (
          <Component data={itemData} inherited={inherited} key={index} style={style} />
        );
      })}
    </div>
  );
}

ImageSet.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  inherited: PropTypes.shape().isRequired,
  style: PropTypes.shape(),
};

ImageSet.defaultProps = {
  className: '',
  style: undefined,
};

ImageSet.acPropTypes = {
  fallback: acPropTypes.fallback,
  height: acPropTypes.height,
  images: acPropTypes.children,
  id: acPropTypes.id,
  imageSize: acPropTypes.defaultImageSize,
  isVisible: acPropTypes.isVisible,
  separator: acPropTypes.separator,
  spacing: acPropTypes.spacing,
  type: acPropTypes.type,
};

ImageSet.acDefaultProps = {
  isVisible: true,
};

registerComponent('ImageSet', ImageSet, 'horizontal');
