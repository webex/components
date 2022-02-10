import React from 'react';
import PropTypes from 'prop-types';
import {acPropTypes, registerComponent} from '../Component/Component';
import webexComponentClasses from '../../helpers';
import Action from '../Action/Action';
import useActionToggleVisibility from '../hooks/useActionToggleVisibility';

/**
 * Adaptive Cards Action.ToggleVisibility component
 * https://adaptivecards.io/explorer/Action.ToggleVisibility.html
 *
 * @param {object} props  React props passed to the component
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} props.data  Active cards definition
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function ActionToggleVisibility({className, data, style}) {
  const [cssClasses] = webexComponentClasses('ac-action-toggle-visibility', className);

  return (
    <Action
      className={cssClasses}
      data={data}
      onClick={useActionToggleVisibility(data).onClick}
      style={style}
    />
  );
}

ActionToggleVisibility.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape().isRequired,
  style: PropTypes.shape(),
};

ActionToggleVisibility.defaultProps = {
  className: undefined,
  style: undefined,
};

ActionToggleVisibility.acPropTypes = {
  fallback: acPropTypes.fallback,
  iconUrl: acPropTypes.iconUrl,
  id: acPropTypes.id,
  isEnabled: acPropTypes.isEnabled,
  style: acPropTypes.actionStyle,
  title: acPropTypes.title,
  tooltip: acPropTypes.tooltip,
  targetElements: acPropTypes.targetElements,
  type: acPropTypes.type,
};

ActionToggleVisibility.acDefaultProps = {
  style: 'default',
};

registerComponent('Action.ToggleVisibility', ActionToggleVisibility);
