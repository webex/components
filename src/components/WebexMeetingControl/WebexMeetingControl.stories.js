import React from 'react';
import WebexMeetingControl from './WebexMeetingControl';

export default {
  title: 'Meetings/Webex Meeting Control',
  component: WebexMeetingControl,
};

const Template = (args) => <WebexMeetingControl {...args} />;

export const ActiveIcon = Template.bind({});
ActiveIcon.args = {
  type: 'mute-audio',
  meetingID: 'meeting3',
};

// BUG: Snapshot test fails
export const InactiveIcon = Template.bind({});
InactiveIcon.args = {
  type: 'mute-audio',
  meetingID: 'meeting2',
};

export const DisabledIcon = Template.bind({});
DisabledIcon.args = {
  type: 'disabled-mute-audio',
  meetingID: 'meeting1',
};

export const Text = Template.bind({});
Text.args = {
  type: 'join-meeting',
  meetingID: 'meeting2',
};

export const DisabledText = Template.bind({});
DisabledText.args = {
  type: 'join-meeting',
  meetingID: 'meeting1',
};

export const Dropdown = Template.bind({});
Dropdown.args = {
  type: 'switch-camera',
  meetingID: 'meeting3',
};
