import React from 'react';
import WebexMemberRoster from './WebexMemberRoster';

export default {
  title: 'Platform/Webex Member Roster',
  component: WebexMemberRoster,
};

const Template = (args) => <WebexMemberRoster {...args} />;

export const Space = Template.bind({});
Space.args = {
  destinationID: 'room1',
  destinationType: 'room',
};

export const Meeting = Template.bind({});
Meeting.args = {
  destinationID: 'meeting1',
  destinationType: 'meeting',
};

export const ExternalMember = Template.bind({});
ExternalMember.args = {
  destinationID: 'room2',
  destinationType: 'room',
};
