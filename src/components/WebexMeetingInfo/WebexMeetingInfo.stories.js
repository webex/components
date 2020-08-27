import React from 'react';
import WebexMeetingInfo from './WebexMeetingInfo';

export default {
  title: 'Meetings/Webex Meeting Info',
  component: WebexMeetingInfo,
};

const Template = (args) => <WebexMeetingInfo {...args} />;

export const Loading = Template.bind({});
Loading.args = {
  meetingID: 'meeting8',
};

export const Error = Template.bind({});
Error.args = {
  meetingID: 'meeting7',
};

export const Direct = Template.bind({});
Direct.args = {
  meetingID: 'meeting5',
};

export const Space = Template.bind({});
Space.args = {
  meetingID: 'meeting1',
};
