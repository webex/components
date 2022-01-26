import React from 'react';
import PropTypes from 'prop-types';
import Component, {acPropTypes, registerComponent} from '../Component/Component';
import webexComponentClasses from '../../helpers';

/**
 * Adaptive Cards ColumnSet component
 * https://adaptivecards.io/explorer/ColumnSet.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} props.data  Active cards definition
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function ColumnSet({data, className, style}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-column-set', className);

  return (
    <div className={cssClasses} style={style}>
      {/* eslint-disable react/no-array-index-key */}
      {data.columns.map((item, index) => {
        const itemData = {type: 'Column', ...item};

        return (
          <Component data={itemData} key={index} />
        );
      })}
    </div>
  );
}

ColumnSet.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
};

ColumnSet.defaultProps = {
  className: '',
  style: undefined,
};

ColumnSet.acPropTypes = {
  bleed: acPropTypes.bleed,
  columns: acPropTypes.children,
  fallback: acPropTypes.fallback,
  height: acPropTypes.height,
  horizontalAlignment: acPropTypes.horizontalAlignment,
  id: acPropTypes.id,
  isVisible: acPropTypes.isVisible,
  minHeight: acPropTypes.minHeight,
  separator: acPropTypes.separator,
  spacing: acPropTypes.spacing,
  style: acPropTypes.containerStyle,
  type: acPropTypes.type,
};

ColumnSet.acDefaultProps = {
  horizontalAlignment: 'left',
  isVisible: true,
};

registerComponent('ColumnSet', ColumnSet, 'horizontal');
