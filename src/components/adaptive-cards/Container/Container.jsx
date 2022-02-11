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
 * @param {object} [props.action]  A set of attributes to apply when the component behaves as an action
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} props.inherited  Inherited data
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function Container({
  action, data, className, inherited, style,
}) {
  const [cssClasses] = webexComponentClasses('container', className);

  return (
    <div className={cssClasses} {...action} style={style}>
      {data.items?.map((item, index) => (
        <Component data={item} inherited={inherited} key={index} />
      ))}
    </div>
  );
}

Container.propTypes = {
  action: PropTypes.shape(),
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  inherited: PropTypes.shape().isRequired,
  style: PropTypes.shape(),
};

Container.defaultProps = {
  action: undefined,
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
  selectAction: acPropTypes.selectAction,
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
