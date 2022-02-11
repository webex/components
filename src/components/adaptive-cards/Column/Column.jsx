import React from 'react';
import PropTypes from 'prop-types';
import Component, {acPropTypes, registerComponent} from '../Component/Component';
import webexComponentClasses from '../../helpers';

/**
 * Adaptive Cards Column component
 * https://adaptivecards.io/explorer/Column.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {object} [props.action]  A set of attributes to apply when the component behaves as an action
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} props.inherited  Inherited data
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function Column({
  action, data, className, inherited, style,
}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-column', className);

  return (
    <div className={cssClasses} {...action} style={style}>
      {data.items?.map(
        (item, index) => <Component data={item} inherited={inherited} key={index} />,
      )}
    </div>
  );
}

Column.propTypes = {
  action: PropTypes.shape(),
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  inherited: PropTypes.shape().isRequired,
  style: PropTypes.shape(),
};

Column.defaultProps = {
  action: undefined,
  className: '',
  style: undefined,
};

Column.acPropTypes = {
  backgroundImage: acPropTypes.backgroundImage,
  bleed: acPropTypes.bleed,
  fallback: acPropTypes.fallback,
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
  width: acPropTypes.width,
};

Column.acDefaultProps = {
  isVisible: true,
  verticalContentAlignment: 'top',
};

registerComponent('Column', Column, 'vertical');
