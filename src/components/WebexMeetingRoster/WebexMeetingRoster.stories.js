import React from 'react';
import WebexMeetingRoster from './WebexMeetingRoster';

export default {
  title: 'Meetings/Webex Meeting Roster',
  component: WebexMeetingRoster,
};

const Template = (args) => {
  const style = {
    width: '23.25rem',
    maxHeight: '100%',
    ...args.style,
  };
  const props = {...args, style};

  return <WebexMeetingRoster {...props} />;
};

export const Meeting = Template.bind({});
Meeting.args = {
  meetingID: 'meeting2',
};
