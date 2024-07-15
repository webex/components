import React from 'react';
import WebexMeetingHostAuthentication from './WebexMeetingHostAuthentication';

export default {
  title: 'Meetings/Webex Host Authentication',
  component: WebexMeetingHostAuthentication,
};

const Template = (...args) => {
  const style = {
    width: '31.25rem',
    height: '25rem',
    ...args.style,
  };

  const props = {...args, style};

  return <WebexMeetingHostAuthentication {...props} />;
};

export const Authentication = Template.bind({});
Authentication.args = {
  meetingID: 'meeting10',
};
