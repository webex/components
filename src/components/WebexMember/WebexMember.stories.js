import React from 'react';
import WebexMember from './WebexMember';

export default {
  title: 'Platform/Webex Member',
  component: WebexMember,
};

const Template = (args) => <WebexMember {...args} />;

export const Space = Template.bind({});
Space.args = {
  id: 'user1',
};

export const StatusEnabled = Template.bind({});
StatusEnabled.args = {
  id: 'user1',
  displayStatus: true,
};

export const Muted = Template.bind({});
Muted.args = {
  destinationType: 'meeting',
  destinationID: 'meeting2',
  id: 'user2',
};
