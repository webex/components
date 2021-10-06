import React from 'react';
import WebexMeetingAuthentication from './WebexMeetingAuthentication';

export default {
  title: 'Meetings/Webex Meeting Authentication',
  component: WebexMeetingAuthentication,
};

const Template = (args) => {
  const style = {
    width: '31.25rem',
    height: '25rem',
    ...args.style,
  };

  const props = {...args, style};

  return <WebexMeetingAuthentication {...props} />;
};

export const Authentication = Template.bind({});
