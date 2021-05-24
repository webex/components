import React from 'react';
import WebexVideoSettings from './WebexVideoSettings';

export default {
  title: 'Meetings/Webex Video Settings',
  component: WebexVideoSettings,
};

const Template = (args) => <WebexVideoSettings {...args} />;

export const VideoSettings = Template.bind({});
VideoSettings.args = {
  meetingID: 'meeting3',
};
