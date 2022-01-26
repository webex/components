import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import Component, {acPropTypes, registerComponent} from '../Component/Component';

/**
 * Adaptive Cards Container component
 * https://adaptivecards.io/explorer/Container.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function Container({data, className, style}) {
  const [cssClasses] = webexComponentClasses('container', className);

  return (
    <div className={cssClasses} style={style}>
      {/* eslint-disable react/no-array-index-key */}
      {data.items?.map((item, index) => (
        <Component data={item} key={index} />
      ))}
    </div>
  );
}

Container.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

Container.defaultProps = {
  className: '',
  style: undefined,
};

Container.acPropTypes = {
  backgroundImage: acPropTypes.backgroundImage,
  bleed: acPropTypes.bleed,
  fallback: acPropTypes.fallback,
  height: acPropTypes.height,
  id: acPropTypes.id,
  isVisible: acPropTypes.isVisible,
  items: acPropTypes.children,
  minHeight: acPropTypes.minHeight,
  rtl: acPropTypes.rtl,
  separator: acPropTypes.separator,
  spacing: acPropTypes.spacing,
  style: acPropTypes.containerStyle,
  type: acPropTypes.type,
  verticalContentAlignment: acPropTypes.verticalContentAlignment,
};

Container.acDefaultProps = {
  isVisible: true,
  verticalContentAlignment: 'top',
};

registerComponent('Container', Container, 'vertical');
