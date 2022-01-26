import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {acPropTypes, registerComponent} from '../Component/Component';

/**
 * Adaptive Cards TextBlock component
 * https://adaptivecards.io/explorer/Input.Text.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {string} [props.className]  Custom CSS class to apply
 * @returns {object} JSX of the component
 */
export default function TextBlock({data, className}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-text-block', className);

  return (
    <div
      className={cssClasses}
      role={data.style === 'heading' ? 'heading' : undefined}
    >
      {data.text}
    </div>
  );
}

TextBlock.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

TextBlock.defaultProps = {
  className: '',
};

TextBlock.acPropTypes = {
  color: acPropTypes.color,
  fallback: acPropTypes.fallback,
  fontType: acPropTypes.fontType,
  height: acPropTypes.height,
  horizontalAlignment: acPropTypes.horizontalAlignment,
  id: acPropTypes.id,
  isSubtle: acPropTypes.isSubtle,
  isVisible: acPropTypes.isVisible,
  separator: acPropTypes.separator,
  size: acPropTypes.size,
  spacing: acPropTypes.spacing,
  style: acPropTypes.containerStyle,
  text: acPropTypes.text,
  type: acPropTypes.type,
  weight: acPropTypes.weight,
  wrap: acPropTypes.wrap,
};

TextBlock.acDefaultProps = {
  horizontalAlignment: 'left',
  isVisible: true,
};

registerComponent('TextBlock', TextBlock);
