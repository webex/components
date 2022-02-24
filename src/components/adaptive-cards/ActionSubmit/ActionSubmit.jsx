import React from 'react';
import PropTypes from 'prop-types';
import {acPropTypes, registerComponent} from '../Component/Component';
import webexComponentClasses from '../../helpers';
import Action from '../Action/Action';
import useActionSubmit from '../hooks/useActionSubmit';

/**
 * Adaptive Cards Action.Submit component
 * https://adaptivecards.io/explorer/Action.Submit.html
 *
 * @param {object} props  React props passed to the component
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} props.data  Active cards definition
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function ActionSubmit({className, data, style}) {
  const [cssClasses] = webexComponentClasses('ac-action-submit', className);

  return (
    <Action
      className={cssClasses}
      style={style}
      data={data}
      onClick={useActionSubmit(data).onClick}
    />
  );
}

ActionSubmit.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape().isRequired,
  style: PropTypes.shape(),
};

ActionSubmit.defaultProps = {
  className: undefined,
  style: undefined,
};

ActionSubmit.acPropTypes = {
  associatedInputs: acPropTypes.associatedInputs,
  data: acPropTypes.data,
  fallback: acPropTypes.fallback,
  iconUrl: acPropTypes.iconUrl,
  id: acPropTypes.id,
  isEnabled: acPropTypes.isEnabled,
  style: acPropTypes.actionStyle,
  title: acPropTypes.title,
  tooltip: acPropTypes.tooltip,
  type: acPropTypes.type,
};

ActionSubmit.acDefaultProps = {
  associatedInputs: 'auto',
  style: 'default',
};

registerComponent('Action.Submit', ActionSubmit);
registerComponent('Action.Execute', ActionSubmit);// make Action.Execute an alias of Action.Submit
