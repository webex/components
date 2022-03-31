import React from 'react';
import WebexMemberRoster from './WebexMemberRoster';

export default {
  title: 'Messaging/Webex Member Roster',
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
  roomID: 'room1',
};

export const ExternalMember = Template.bind({});
ExternalMember.args = {
  roomID: 'room2',
};
