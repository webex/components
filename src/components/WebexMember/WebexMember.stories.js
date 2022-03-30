import React from 'react';
import WebexMember from './WebexMember';

export default {
  title: 'Messaging/Webex Member',
  component: WebexMember,
  decorators: [(Story) => <div style={{width: '20rem'}}><Story /></div>],
};

const Template = (args) => <WebexMember {...args} />;

export const Space = Template.bind({});
Space.args = {
  roomID: 'room1',
  personID: 'user1',
};

export const StatusEnabled = Template.bind({});
StatusEnabled.args = {
  roomID: 'room1',
  personID: 'user1',
  displayStatus: true,
};

export const ExternalOrganization = Template.bind({});
ExternalOrganization.args = {
  roomID: 'room2',
  personID: 'user5',
};
