import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon} from '@momentum-ui/react';
import {MeetingControlState} from '@webex/component-adapter-interfaces';

import {useMeetingControl} from '../hooks';

/**
 * WebexMeetingControl component represents an action that can
 * be taken in a meeting.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.type  Name of the control as defined in adapter
 * @param {string} props.meetingID  ID of the meeting
 * @returns {object} JSX of the component
 */
export default function WebexMeetingControl({type, meetingID}) {
  const [action, display] = useMeetingControl(type, meetingID);
  const {icon, text, tooltip} = display;
  const isDisabled = display.state === MeetingControlState.DISABLED;
  const iconColor = display.state === MeetingControlState.ACTIVE ? 'red' : '';
  let button = (
    <Button color="green" size={52} ariaLabel={tooltip} onClick={action} disabled={isDisabled}>
      {text}
    </Button>
  );

  if (icon) {
    button = (
      <Button
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
  type: PropTypes.string.isRequired,
  meetingID: PropTypes.string.isRequired,
};
