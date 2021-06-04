import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon} from '@momentum-ui/react';
import {MeetingControlState} from '@webex/component-adapter-interfaces';

import webexComponentClasses from '../helpers';
import {useMeetingControl} from '../hooks';
import Select from '../WebexSettings/Select';

/**
 * renderButton renders a control button
 *
 * @param {Function} action  Adapter control callback
 * @param {object} display  Display data of the control
 * @param {string} cssClasses  Custom CSS class to apply
 * @param {object} style  Custom style to apply
 * @returns {object} JSX of the component
 */
function renderButton(action, display, cssClasses, style) {
  const {icon, text, tooltip} = display;
  const isDisabled = display.state === MeetingControlState.DISABLED;
  const iconColor = display.state === MeetingControlState.ACTIVE ? 'red' : '';

  return icon
    ? (
      <Button
        circle
        color={iconColor}
        size={56}
        ariaLabel={tooltip}
        onClick={action}
        disabled={isDisabled}
        className={cssClasses}
        style={style}
      >
        <Icon name={icon} size={28} />
      </Button>
    )
    : (
      <Button color="green" size={52} ariaLabel={tooltip} onClick={action} disabled={isDisabled} className={cssClasses} style={style}>
        {text}
      </Button>
    );
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
  const {options, selected} = display;

  return (
    <Select
      className={cssClasses}
      style={style}
      onChange={(event) => action(event.target.value)}
      value={selected || ''}
      options={options}
    />
  );
}

/**
 * WebexMeetingControl component represents an action that can
 * be taken in a meeting.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting
 * @param {object} props.style  Custom style to apply
 * @param {string} props.type  Name of the control as defined in adapter
 * @returns {object} JSX of the component
 */
export default function WebexMeetingControl({
  className,
  meetingID,
  style,
  type,
}) {
  const [action, display] = useMeetingControl(type, meetingID);
  const cssClasses = webexComponentClasses('meeting-control', className);

  let output;

  if (!display || Object.keys(display).length === 0) {
    output = '';
  } else if ('options' in display) {
    output = renderDropdown(action, display, cssClasses, style);
  } else {
    output = renderButton(action, display, cssClasses, style);
  }

  return output;
}

WebexMeetingControl.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
  type: PropTypes.string.isRequired,
};

WebexMeetingControl.defaultProps = {
  className: '',
  style: undefined,
};
