import React from 'react';
import WebexActivityStream from './WebexActivityStream';

export default {
  title: 'Messaging/Webex Activity Stream',
  component: WebexActivityStream,
};

const Template = (args) => <WebexActivityStream {...args} />;

export const Conversation = Template.bind({});
Conversation.args = {
  roomID: 'default',
};

export const NewDirect = Template.bind({});
NewDirect.args = {
  roomID: 'empty-direct',
};

export const NewSpace = Template.bind({});
NewSpace.args = {
  roomID: 'empty-space',
};

export const WithTimeRuler = Template.bind({});
WithTimeRuler.args = {
  roomID: 'time-rulers',
};
