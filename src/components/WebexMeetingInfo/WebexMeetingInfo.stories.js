import React from 'react';
import WebexMeetingInfo from './WebexMeetingInfo';

export default {
  title: 'Meetings/Webex Meeting Info',
  component: WebexMeetingInfo,
};

const Template = (args) => <WebexMeetingInfo {...args} />;

export const Loading = Template.bind({});
Loading.args = {
  meetingID: '',
};

export const Error = Template.bind({});
Error.args = {
  meetingID: 'noMeetingTitle',
};

export const Direct = Template.bind({});
Direct.args = {
  meetingID: 'oneOnOneMeeting',
};

export const Space = Template.bind({});
Space.args = {
  meetingID: 'spaceMeeting',
};
