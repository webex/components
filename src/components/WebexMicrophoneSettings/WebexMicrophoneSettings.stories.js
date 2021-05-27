import React from 'react';
import WebexMicrophoneSettings from './WebexMicrophoneSettings';

export default {
  title: 'Platform/Webex Audio Settings',
  component: WebexMicrophoneSettings,
};

const Template = (args) => <WebexMicrophoneSettings {...args} />;

export const microphoneSettings = Template.bind({});
microphoneSettings.args = {
  meetingID: 'meeting3',
};
