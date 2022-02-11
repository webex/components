import React from 'react';
import PropTypes from 'prop-types';
import {acPropTypes, registerComponent} from '../Component/Component';
import webexComponentClasses from '../../helpers';
import {formatDateTime} from '../util';

/**
 * Adaptive Cards TextRun component
 * https://adaptivecards.io/explorer/TextRun.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} [props.action]  A set of attributes to apply when the component behaves as an action
 * @param {object} props.data  Active cards definition
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function TextRun({
  action, data, className, style,
}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-text-run', className);

  return (
    <span className={cssClasses} {...action} style={style}>
      {formatDateTime(data.text)}
    </span>
  );
}

TextRun.propTypes = {
  action: PropTypes.shape(),
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

TextRun.defaultProps = {
  action: undefined,
  className: '',
  style: undefined,
};

TextRun.acPropTypes = {
  color: acPropTypes.color,
  fontType: acPropTypes.fontType,
  highlight: acPropTypes.highlight,
  isSubtle: acPropTypes.isSubtle,
  italic: acPropTypes.italic,
  selectAction: acPropTypes.selectAction,
  size: acPropTypes.size,
  strikethrough: acPropTypes.strikethrough,
  text: acPropTypes.text,
  type: acPropTypes.type,
  underline: acPropTypes.underline,
  weight: acPropTypes.weight,
};

registerComponent('TextRun', TextRun);
