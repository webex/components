import React from 'react';
import PropTypes from 'prop-types';
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
 * @param {object} style  Custom style to apply
 * @param {boolean} showText  Flag that indicates whether to display text on control buttons
 * @param {boolean} asItem  Render control as an item in a list
 * @returns {object} JSX of the component
 */
function renderButton(action, display, style, showText, asItem) {
  const {
    icon,
    type,
    text,
    tooltip,
  } = display;
  const isDisabled = display.state === MeetingControlState.DISABLED;

  let output;

  if (asItem) {
    output = (
      /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */
      <div onClick={action} title={tooltip} role="button" tabIndex="0" style={style}>
        {icon && <Icon name={icon} size={14} className="item-button-icon" />}
        <span className="item-button-text">{text}</span>
      </div>
    );
  } else {
    output = (
      <Button
        className="control-button"
        type={controlTypeToButtonType[type] || 'default'}
        isDisabled={isDisabled}
        onClick={action}
        title={tooltip}
      >
        {icon && <Icon name={icon} size={24} />}
        {(showText || !icon) && text && <span className="button-text">{text}</span>}
      </Button>
    );
  }

  return output;
}

/**
 * renderDropdown renders controls dropdown
 *
 * @param {Function} action  Adapter control callback
 * @param {object} display  Display data of the control
 * @param {object} style  Custom style to apply
 * @param {string} type  Name of the control as defined in adapter
 * @returns {object} JSX of the component
 */
function renderDropdown(action, display, style, type) {
  const {noOptionsMessage} = display;
  let {options, selected} = display;
  // The browser api setSinkId() does not work properly on Firefox and Safari browsers so we need to treat them separately by resetting the options we receive with a default no media label.
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId
  const isFirefox = navigator.userAgent.indexOf('Firefox') !== -1; // detect Firefox browser
  const isSafari = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1; // detect Safari browser
  const noSpeaker = (isFirefox || isSafari) && type === 'switch-speaker';

  if (noSpeaker) {
    options = [{value: '', label: noOptionsMessage}];
    selected = noOptionsMessage;
  }

  return (
    <Select
      className="control-select"
      style={style}
      value={selected || ''}
      onChange={(id) => action(id)}
      options={options}
      disabled={noSpeaker || !options?.length}
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
    output = renderDropdown(action, display, style, type);
  } else {
    output = renderButton(action, display, style, showText, asItem);
  }

  return <div className={cssClasses}>{output}</div>;
}

WebexMeetingControl.propTypes = {
  asItem: PropTypes.bool,
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  showText: PropTypes.bool,
  style: PropTypes.shape(),
  type: PropTypes.string.isRequired,
};

WebexMeetingControl.defaultProps = {
  asItem: false,
  className: '',
  showText: true,
  style: undefined,
};
