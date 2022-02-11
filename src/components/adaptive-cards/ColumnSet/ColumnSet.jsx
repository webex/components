import React from 'react';
import PropTypes from 'prop-types';
import Component, {acPropTypes, registerComponent} from '../Component/Component';
import webexComponentClasses from '../../helpers';

/**
 * Adaptive Cards ColumnSet component
 * https://adaptivecards.io/explorer/ColumnSet.html
 *
 * @param {object} props  React props passed to the component
 * @param {object} [props.action]  A set of attributes to apply when the component behaves as an action
 * @param {object} props.data  Active cards definition
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} props.inherited  Inherited data
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function ColumnSet({
  action, data, className, inherited, style,
}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-column-set', className);

  return (
    <div className={cssClasses} {...action} style={style}>
      {data.columns.map((item, index) => {
        const itemData = {type: 'Column', ...item};

        return (
          <Component data={itemData} inherited={inherited} key={index} />
        );
      })}
    </div>
  );
}

ColumnSet.propTypes = {
  action: PropTypes.shape(),
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
  inherited: PropTypes.shape().isRequired,
  style: PropTypes.shape(),
};

ColumnSet.defaultProps = {
  action: undefined,
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
  selectAction: acPropTypes.selectAction,
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
