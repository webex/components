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
