import React from 'react';
import WebexMeetingGuestAuthentication from './WebexMeetingGuestAuthentication';

export default {
  title: 'Meetings/Webex Guest Authentication',
  component: WebexMeetingGuestAuthentication,
};

const Template = (...args) => {
  const style = {
    width: '31.25rem',
    height: '25rem',
    ...args.style,
  };

  const props = {...args, style};

  return <WebexMeetingGuestAuthentication {...props} />;
};

export const Authentication = Template.bind({});
Authentication.args = {
  meetingID: 'meeting10',
};
