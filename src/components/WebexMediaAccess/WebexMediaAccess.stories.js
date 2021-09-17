import React from 'react';
import WebexMediaAccess from './WebexMediaAccess';

export default {
  title: 'Meetings/Webex Media Access',
  component: WebexMediaAccess,
};

const Template = (args) => {
  const style = {
    width: '100%',
    height: '100%',
    ...args.style,
  };
  const props = {...args, style};

  return <WebexMediaAccess {...props} />;
};

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
