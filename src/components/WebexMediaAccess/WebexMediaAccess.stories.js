import React from 'react';
import WebexMediaAccess from './WebexMediaAccess';

export default {
  title: 'Meetings/Webex Media Access',
  component: WebexMediaAccess,
};

const Template = (args) => <WebexMediaAccess {...args} />;

export const Camera = Template.bind({});
Camera.args = {
  meetingID: 'meeting1',
  media: 'camera',
};

export const Microphone = Template.bind({});
Microphone.args = {
  meetingID: 'meeting1',
  media: 'microphone',
};
