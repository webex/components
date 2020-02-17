import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon} from '@momentum-ui/react';
import {MeetingControlState} from '@webex/component-adapter-interfaces';

import {useMeetingControl} from '../hooks';

/**
 * WebexMeetingControl component represents an action that can
 * be taken in a meeting.
 *
 * @param {string} props.type  Name of the control as defined in adapter
 * @returns {object} JSX of the component
 */
export default function WebexMeetingControl({type}) {
  const [action, display] = useMeetingControl(type);
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
      <Button circle color={iconColor} size={56} ariaLabel={tooltip} onClick={action} disabled={isDisabled}>
        <Icon name={`${icon}_28`} />
      </Button>
    );
  }

  return button;
}

WebexMeetingControl.propTypes = {
  type: PropTypes.string.isRequired,
};
