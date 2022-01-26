import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';
import Component, {acPropTypes, registerComponent} from '../Component/Component';

/**
 * Adaptive Cards RichTextBlock component
 * https://adaptivecards.io/explorer/RichTextBlock.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {string} props.className  Custom CSS class to apply
 * @returns {object} JSX of the component
 */
export default function RichTextBlock({data, className}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-rich-text-block', className);

  return (
    <div className={cssClasses}>
      {data.inlines.map(
        (inline, index) => {
          let inlineData = typeof inline === 'string' ? {text: inline} : inline;

          inlineData = {type: 'TextRun', ...inlineData};

          // eslint-disable-next-line react/no-array-index-key
          return <Component data={inlineData} key={index} />;
        },
      )}
    </div>
  );
}

RichTextBlock.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

RichTextBlock.defaultProps = {
  className: '',
};

RichTextBlock.acPropTypes = {
  fallback: acPropTypes.fallback,
  horizontalAlignment: acPropTypes.horizontalAlignment,
  id: acPropTypes.id,
  inlines: acPropTypes.children,
  isVisible: acPropTypes.isVisible,
  separator: acPropTypes.separator,
  spacing: acPropTypes.spacing,
  type: acPropTypes.type,
};

RichTextBlock.acDefaultProps = {
  horizontalAlignment: 'left',
  isVisible: true,
};

registerComponent('RichTextBlock', RichTextBlock);
