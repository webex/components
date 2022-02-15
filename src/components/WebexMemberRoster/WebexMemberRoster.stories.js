import React from 'react';
import WebexMemberRoster from './WebexMemberRoster';

export default {
  title: 'Platform/Webex Member Roster',
  component: WebexMemberRoster,
};

const Template = (args) => {
  const style = {
    width: '23.25rem',
    maxHeight: '100%',
    ...args.style,
  };
  const props = {...args, style};

  return <WebexMemberRoster {...props} />;
};

export const Space = Template.bind({});
Space.args = {
  destinationID: 'room1',
  destinationType: 'room',
};

export const Meeting = Template.bind({});
Meeting.args = {
  destinationID: 'meeting2',
  destinationType: 'meeting',
};

export const ExternalMember = Template.bind({});
ExternalMember.args = {
  destinationID: 'room2',
  destinationType: 'room',
};
