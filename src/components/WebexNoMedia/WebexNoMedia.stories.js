import React from 'react';
import WebexNoMedia from './WebexNoMedia';

export default {
  title: 'Meetings/Webex No Media',
  component: WebexNoMedia,
};

const Template = (args) => <WebexNoMedia {...args} />;

export const Camera = Template.bind({});
Camera.args = {
  media: 'camera',
};

export const Microphone = Template.bind({});
Microphone.args = {
  media: 'microphone',
};
