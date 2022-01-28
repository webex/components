import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {acPropTypes, registerComponent} from '../Component/Component';
import webexComponentClasses from '../../helpers';
import Action from '../Action/Action';
import AdaptiveCardContext from '../context/adaptive-card-context';

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
  const {
    getAllValues,
    validate,
    submit,
  } = useContext(AdaptiveCardContext);

  const handleSubmit = () => {
    if (data.associatedInputs?.toLowerCase() !== 'none') {
      if (validate()) {
        let values = getAllValues();

        if (typeof data.data === 'object') {
          values = {...values, ...data.data};
        }
        submit(values);
      }
    } else {
      submit(data.data);
    }
  };

  return (
    <Action
      className={cssClasses}
      style={style}
      data={data}
      onClick={handleSubmit}
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

Action.acPropTypes = {
  associatedInputs: acPropTypes.associatedInputs,
  data: acPropTypes.data,
  iconUrl: acPropTypes.iconUrl,
  id: acPropTypes.id,
  isEnabled: acPropTypes.isEnabled,
  mode: acPropTypes.mode,
  style: acPropTypes.actionStyle,
  title: acPropTypes.title,
  tooltip: acPropTypes.tooltip,
  type: acPropTypes.type,
};

Action.acDefaultProps = {
  associatedInputs: 'auto',
  style: 'default',
};

registerComponent('Action.Submit', ActionSubmit);
