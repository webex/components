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
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function Column({data, className, style}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-column', className);

  return (
    <div className={cssClasses} style={style}>
      {/* eslint-disable react/no-array-index-key */}
      {data.items?.map((item, index) => <Component data={item} key={index} />)}
    </div>
  );
}

Column.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

Column.defaultProps = {
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
