import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import {acPropTypes, registerComponent} from '../Component/Component';
import {formatDateTime} from '../util';
import Markdown from '../Markdown/Markdown';

/**
 * Adaptive Cards TextBlock component
 * https://adaptivecards.io/explorer/Input.Text.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function TextBlock({data, className, style}) {
  const {maxLines} = data;
  const [cssClasses] = webexComponentClasses('adaptive-cards-text-block', className, {'max-lines': maxLines});

  return (
    <div
      className={cssClasses}
      style={{...style, WebkitLineClamp: data.maxLines}}
      role={data.style === 'heading' ? 'heading' : undefined}
    >
      <Markdown>{formatDateTime(data.text)}</Markdown>
    </div>
  );
}

TextBlock.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

TextBlock.defaultProps = {
  className: undefined,
  style: undefined,
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
  maxLines: acPropTypes.maxLines,
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
