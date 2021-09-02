import React from 'react';
import PropTypes from 'prop-types';
import {Button as MomentumButton} from '@momentum-ui/react';
import {MeetingControlState} from '@webex/component-adapter-interfaces';

import webexComponentClasses from '../helpers';
import {useMeetingControl} from '../hooks';
import Button from '../generic/Button/Button';
import Icon from '../generic/Icon/Icon';
import Select from '../generic/Select/Select';

const controlTypeToButtonType = {
  JOIN: 'join',
  CANCEL: 'cancel',
  CLOSE: 'ghost',
  TOGGLE: 'default',
};

/**
 * renderButton renders a control button
 *
 * @param {Function} action  Adapter control callback
 * @param {object} display  Display data of the control
 * @param {string} cssClasses  Custom CSS class to apply
 * @param {object} style  Custom style to apply
 * @param {boolean} showText  Flag that indicates whether to display text on control buttons
 * @param {boolean} asItem  Render control as an item in a list
 * @returns {object} JSX of the component
 */
function renderButton(action, display, cssClasses, style, showText, asItem) {
  const {
    icon,
    type,
    text,
    tooltip,
  } = display;
  const isDisabled = display.state === MeetingControlState.DISABLED;
  const iconColor = type === 'CANCEL' || display.state === MeetingControlState.ACTIVE ? 'red' : '';

  let output;

  if (asItem) {
    output = (
      /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */
      <div className={cssClasses} onClick={action} title={tooltip} role="button" tabIndex="0">
        {icon && <Icon name={icon} size={14} className="item-button-icon" />}
        <span className="item-button-text">{text}</span>
      </div>
    );
  } else {
    output = (
      <>
        <Button
          className={cssClasses}
          type={controlTypeToButtonType[type] || 'default'}
          isDisabled={isDisabled}
          onClick={action}
          title={tooltip}
        >
          {icon && <Icon name={icon} size={24} />}
          {showText && text && <span className="button-text">{text}</span>}
        </Button>
        <MomentumButton
          circle={icon && (!showText || !text)}
          color={type === 'JOIN' ? 'green' : iconColor}
          size={!icon || (showText && text) ? 52 : 56}
          ariaLabel={tooltip}
          onClick={action}
          disabled={isDisabled}
          className={`${cssClasses} wxc-old-button`}
          style={style}
        >
          {icon && <Icon name={icon} size={28} />}
          {(!icon || (showText && text)) && <span className="button-text">{text}</span>}
        </MomentumButton>
      </>
    );
  }

  return output;
}

/**
 * renderDropdown renders controls dropdown
 *
 * @param {Function} action  Adapter control callback
 * @param {object} display  Display data of the control
 * @param {string} cssClasses  Custom CSS class to apply
 * @param {object} style  Custom style to apply
 * @returns {object} JSX of the component
 */
function renderDropdown(action, display, cssClasses, style) {
  const {options, noOptionsMessage, selected} = display;

  return (
    <Select
      className={cssClasses}
      style={style}
      value={selected || ''}
      onChange={(id) => action(id)}
      options={options?.length === 0 ? [{value: '', label: noOptionsMessage}] : options}
      disabled={!options?.length}
    />
  );
}

/**
 * WebexMeetingControl component represents an action that can
 * be taken in a meeting.
 *
 * @param {object} props  Data passed to the component
 * @param {boolean} [props.asItem=false]  Render control as an itemin a list
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting
 * @param {boolean} [props.showText=true]  Flag that indicates whether to display text on control buttons
 * @param {object} [props.style]  Custom style to apply
 * @param {string} props.type  Name of the control as defined in adapter
 * @returns {object} JSX of the component
 */
export default function WebexMeetingControl({
  asItem,
  className,
  meetingID,
  showText,
  style,
  type,
}) {
  const [action, display] = useMeetingControl(type, meetingID);
  const cssClasses = webexComponentClasses(
    'meeting-control',
    className,
    null,
    {'as-item': asItem},
  );

  let output;

  if (!display || Object.keys(display).length === 0) {
    output = '';
  } else if (display.type === 'MULTISELECT') {
    output = renderDropdown(action, display, cssClasses, style);
  } else {
    output = renderButton(action, display, cssClasses, style, showText, asItem);
  }

  return output;
}

WebexMeetingControl.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  showText: PropTypes.bool,
  style: PropTypes.shape(),
  type: PropTypes.string.isRequired,
};

WebexMeetingControl.defaultProps = {
  className: '',
  showText: true,
  style: undefined,
};
