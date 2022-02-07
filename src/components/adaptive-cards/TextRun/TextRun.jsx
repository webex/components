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
 * @param {object} props.data  Active cards definition
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function TextRun({data, className, style}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-text-run', className);

  return (
    <span className={cssClasses} style={style}>
      {formatDateTime(data.text)}
    </span>
  );
}

TextRun.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

TextRun.defaultProps = {
  className: '',
  style: undefined,
};

TextRun.acPropTypes = {
  color: acPropTypes.color,
  fontType: acPropTypes.fontType,
  highlight: acPropTypes.highlight,
  isSubtle: acPropTypes.isSubtle,
  italic: acPropTypes.italic,
  size: acPropTypes.size,
  strikethrough: acPropTypes.strikethrough,
  text: acPropTypes.text,
  type: acPropTypes.type,
  underline: acPropTypes.underline,
  weight: acPropTypes.weight,
};

registerComponent('TextRun', TextRun);
