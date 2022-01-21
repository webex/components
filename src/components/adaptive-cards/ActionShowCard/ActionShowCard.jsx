import React from 'react';
import PropTypes from 'prop-types';
import {acPropTypes, registerComponent} from '../Component/Component';
import webexComponentClasses from '../../helpers';
import Action from '../Action/Action';

/**
 * Adaptive Cards Action.ShowCard component
 * https://adaptivecards.io/explorer/Action.ShowCard.html
 *
 * @param {object} props  React props passed to the component
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} props.data  Active cards definition
 * @param {Function} props.onClick  Callback function
 * @param {boolean} [props.pressed]  Flag indicating whether the button is pressed
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function ActionShowCard({
  className, data, onClick, pressed, style,
}) {
  const [cssClasses] = webexComponentClasses('ac-action-show-card', className);

  return (
    <Action
      className={cssClasses}
      data={data}
      onClick={onClick}
      pressed={pressed}
      rightIcon={pressed ? 'arrow-up' : 'arrow-down'}
      style={style}
    />
  );
}

ActionShowCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
  pressed: PropTypes.bool,
  style: PropTypes.shape(),
};

ActionShowCard.defaultProps = {
  className: undefined,
  pressed: false,
  style: undefined,
};

ActionShowCard.acPropTypes = {
  fallback: acPropTypes.fallback,
  iconUrl: acPropTypes.iconUrl,
  id: acPropTypes.id,
  isEnable: acPropTypes.isEnabled,
  mode: acPropTypes.mode,
  style: acPropTypes.actionStyle,
  title: acPropTypes.title,
  type: acPropTypes.type,
};

ActionShowCard.acDefaultProps = {
  style: 'default',
};

registerComponent('Action.ShowCard', ActionShowCard, 'horizontal');
