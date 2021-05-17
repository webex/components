import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon} from '@momentum-ui/react';
import {MeetingControlState} from '@webex/component-adapter-interfaces';

import webexComponentClasses from '../helpers';
import {useMeetingControl} from '../hooks';

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
  const {icon, text, tooltip} = display;
  const isDisabled = display.state === MeetingControlState.DISABLED;
  const iconColor = display.state === MeetingControlState.ACTIVE ? 'red' : '';
  const cssClasses = webexComponentClasses('meeting-control', className);
  let button = (
    <Button
      color="green"
      size={52}
      ariaLabel={tooltip}
      onClick={action}
      disabled={isDisabled}
      className={cssClasses}
      style={style}
    >
      {text}
    </Button>
  );

  if (icon) {
    button = (
      <Button
        className={cssClasses}
        style={style}
        circle
        color={iconColor}
        size={56}
        ariaLabel={tooltip}
        onClick={action}
        disabled={isDisabled}
      >
        <Icon name={icon} size={28} />
      </Button>
    );
  }

  return button;
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
