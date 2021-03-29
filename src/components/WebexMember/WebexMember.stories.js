import React from 'react';
import WebexMember from './WebexMember';

export default {
  title: 'Platform/Webex Member',
  component: WebexMember,
  decorators: [(Story) => <div style={{width: '20rem'}}><Story /></div>],
};

const Template = (args) => <WebexMember {...args} />;

export const Space = Template.bind({});
Space.args = {
  personID: 'user1',
};

export const StatusEnabled = Template.bind({});
StatusEnabled.args = {
  personID: 'user1',
  displayStatus: true,
};

export const Muted = Template.bind({});
Muted.args = {
  destinationType: 'meeting',
  destinationID: 'meeting2',
  personID: 'user2',
};

export const ScreenSharing = Template.bind({});
ScreenSharing.args = {
  destinationType: 'meeting',
  destinationID: 'meeting2',
  personID: 'user3',
};
