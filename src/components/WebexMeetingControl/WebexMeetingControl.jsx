import React from 'react';
import PropTypes from 'prop-types';
import {MeetingControlState} from '@webex/component-adapter-interfaces';

import webexComponentClasses from '../helpers';
import {useMeetingControl} from '../hooks';
import Button from '../generic/Button/Button';
import Icon from '../generic/Icon/Icon';
import Dropdown from '../inputs/Dropdown/Dropdown';

const controlTypeToButtonType = {
  JOIN: 'join',
  CANCEL: 'cancel',
  CLOSE: 'ghost',
  BUTTON: 'default',
  TOGGLE: 'toggle',
};

/**
 * renderButton renders a control button
 *
 * @param {Function} sc  CSS subclass function
 * @param {Function} action  Adapter control callback
 * @param {object} display  Display data of the control
 * @param {object} style  Custom style to apply
 * @param {boolean} showText  Flag that indicates whether to display text on control buttons
 * @param {boolean} asItem  Render control as an item in a list
 * @param {boolean} autoFocus  Flag indicating whether to add autofocus on a control
 * @param {number} tabIndex  TabIndex value
 * @returns {object} JSX of the component
 */
function renderButton(sc, action, display, style, showText, asItem, autoFocus, tabIndex) {
  const {
    icon,
    type,
    text,
    tooltip,
    hint,
  } = display;
  const isDisabled = display.state === MeetingControlState.DISABLED;
  const isActive = display.state === MeetingControlState.ACTIVE;

  let output;

  if (asItem) {
    output = (
      <Button
        type="ghost"
        style={style}
        size={24}
        className={sc('as-item')}
        tooltip={tooltip}
        ariaLabel={hint || text}
      >
        {icon && <Icon name={icon} size={14} className={sc('item-button-icon')} />}
        <span className={sc('item-button-text')}>{text}</span>
      </Button>
    );
  } else {
    output = (
      <Button
        className={sc('control-button')}
        type={controlTypeToButtonType[type] || 'default'}
        size={48}
        isDisabled={isDisabled}
        onClick={action}
        ariaLabel={hint || text}
        pressed={isActive && type === 'TOGGLE'}
        tooltip={tooltip}
        autoFocus={autoFocus}
        tabIndex={tabIndex}
      >
        {icon && <Icon name={icon} size={24} />}
        {(showText || !icon) && text && <span className={sc('button-text')}>{text}</span>}
      </Button>
    );
  }

  return output;
}

/**
 * renderDropdown renders controls dropdown
 *
 * @param {Function} sc  CSS subclass function
 * @param {Function} action  Adapter control callback
 * @param {object} display  Display data of the control
 * @param {object} style  Custom style to apply
 * @param {number} tabIndex  Value of the tabIndex attribute
 * @returns {object} JSX of the component
 */
function renderDropdown(sc, action, display, style, tabIndex) {
  const {
    options, noOptionsMessage, selected, tooltip, hint,
  } = display;

  return (
    <Dropdown
      className={sc('control-select')}
      style={style}
      value={selected || ''}
      onChange={(id) => action(id)}
      options={options?.length === 0 ? [{value: '', label: noOptionsMessage}] : options}
      disabled={!options?.length}
      tooltip={tooltip}
      ariaLabel={hint}
      tabIndex={tabIndex}
    />
  );
}

/**
 * WebexMeetingControl component represents an action that can
 * be taken in a meeting.
 *
 * @param {object} props  Data passed to the component
 * @param {boolean} [props.asItem=false]  Render control as an itemin a list
 * @param {boolean} [props.autoFocus=false]  Flag indicating if the control should have autoFocus
 * @param {string} [props.className]  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting
 * @param {boolean} [props.showText=true]  Flag that indicates whether to display text on control buttons
 * @param {object} [props.style]  Custom style to apply
 * @param {number} props.tabIndex  Value of the tabIndex attribute
 * @param {string} props.type  Name of the control as defined in adapter
 * @returns {object} JSX of the component
 */
export default function WebexMeetingControl({
  asItem,
  autoFocus,
  className,
  meetingID,
  showText,
  style,
  tabIndex,
  type,
}) {
  const [action, display] = useMeetingControl(type, meetingID);

  const [cssClasses, sc] = webexComponentClasses(
    'meeting-control',
    className,
    {'as-item': asItem},
  );

  let output;

  if (!display || Object.keys(display).length === 0) {
    output = '';
  } else if (display.type === 'MULTISELECT') {
    output = renderDropdown(sc, action, display, style, tabIndex);
  } else {
    output = renderButton(sc, action, display, style, showText, asItem, autoFocus, tabIndex);
  }

  return <div className={cssClasses}>{output}</div>;
}

WebexMeetingControl.propTypes = {
  asItem: PropTypes.bool,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  showText: PropTypes.bool,
  style: PropTypes.shape(),
  tabIndex: PropTypes.number,
  type: PropTypes.string.isRequired,
};

WebexMeetingControl.defaultProps = {
  asItem: false,
  autoFocus: false,
  className: '',
  showText: true,
  style: undefined,
  tabIndex: 0,
};
