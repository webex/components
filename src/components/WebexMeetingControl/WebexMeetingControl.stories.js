import React from 'react';
import WebexMeetingControl from './WebexMeetingControl';
import WebexMeetingControls from './WebexMeetingControls';

export default {
  title: 'Meetings/Webex Meeting Control',
  component: WebexMeetingControl,
  decorators: [(Story) => <WebexMeetingControls meetingID="meeting1" centerControls={[<Story />]} />],
};

const Template = (args) => <WebexMeetingControl {...args} />;

export const ActiveIcon = Template.bind({});
ActiveIcon.args = {
  type: 'mute-audio',
};

// BUG: Snapshot test fails
export const InactiveIcon = Template.bind({});
InactiveIcon.args = {
  type: 'mute-audio',
};

export const DisabledIcon = Template.bind({});
DisabledIcon.args = {
  type: 'disabled-mute-audio',
};

export const Text = Template.bind({});
Text.args = {
  type: 'join-meeting',
};

export const DisabledText = Template.bind({});
DisabledText.args = {
  type: 'disabled-join-meeting',
};
