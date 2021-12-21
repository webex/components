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
 * @param {string} props.className  Custom CSS class to apply
 * @returns {object} JSX of the component
 */
export default function Container({data, className}) {
  const [cssClasses] = webexComponentClasses('container', className);

  return (
    <div className={cssClasses}>
      {/* eslint-disable react/no-array-index-key */}
      {data.items.map((item, index) => (
        <Component data={item} key={index} />
      ))}
    </div>
  );
}

Container.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

Container.defaultProps = {
  className: '',
};

Container.acPropTypes = {
  bleed: acPropTypes.bleed,
  id: acPropTypes.id,
  isVisible: acPropTypes.isVisible,
  items: acPropTypes.children,
  rtl: acPropTypes.rtl,
  separator: acPropTypes.separator,
  spacing: acPropTypes.spacing,
  style: acPropTypes.containerStyle,
  type: acPropTypes.type,
};

registerComponent('Container', Container, 'vertical');
