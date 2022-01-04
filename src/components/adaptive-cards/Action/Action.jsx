import React from 'react';
import PropTypes from 'prop-types';
import {acPropTypes} from '../Component/Component';
import webexComponentClasses from '../../helpers';
import {Button, Icon} from '../../generic';
import {isValidUrl} from '../../../util';

/**
 * Adaptive Cards generic Action component
 *
 * @param {object} props  React props passed to the component
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {object} props.data  Active cards definition
 * @param {Function} props.onClick  Callback function
 * @param {boolean} [props.pressed]  Flag indicating whether the button is pressed
 * @param {string} [props.rightIcon]  Icon to be displayed on the right side of the button
 * @param {object} [props.style]  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function Action({
  className, data, onClick, pressed, rightIcon, style,
}) {
  const isDisabled = data.isEnabled === false;

  const [cssClasses, sc] = webexComponentClasses('ac-action', className, {
    disabled: isDisabled,
  });

  const actionStyleToButtonType = {
    positive: 'join',
    destructive: 'cancel',
  };

  const buttonType = actionStyleToButtonType[data.style] || 'primary';
  const isValidIconUrl = isValidUrl(data.iconUrl, ['http:', 'https:', 'data:']);

  return (
    <Button
      className={cssClasses}
      isDisabled={isDisabled}
      onClick={onClick}
      pressed={pressed}
      style={style}
      type={buttonType}
    >
      {data.iconUrl && isValidIconUrl && <img className={sc('icon')} src={data.iconUrl} alt="" />}
      <span>{data.title}</span>
      {rightIcon && <Icon className={sc('right-icon')} name={rightIcon} size={10} />}
    </Button>
  );
}

Action.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
  pressed: PropTypes.bool,
  rightIcon: PropTypes.string,
  style: PropTypes.shape(),
};

Action.defaultProps = {
  className: undefined,
  pressed: false,
  rightIcon: undefined,
  style: undefined,
};

Action.acPropTypes = {
  iconUrl: acPropTypes.iconUrl,
  id: acPropTypes.id,
  isEnabled: acPropTypes.isEnabled,
  mode: acPropTypes.mode,
  style: acPropTypes.actionStyle,
  title: acPropTypes.title,
  tooltip: acPropTypes.tooltip,
  type: acPropTypes.type,
  url: acPropTypes.url,
};

Action.acDefaultProps = {
  style: 'default',
};
