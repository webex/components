import React from 'react';
import WebexSettings from './WebexSettings';

export default {
  title: 'Meetings/Webex Settings',
  component: WebexSettings,
};

const Template = (args) => <WebexSettings {...args} />;

export const Settings = Template.bind({});
Settings.args = {
  meetingID: 'meeting1',
};
