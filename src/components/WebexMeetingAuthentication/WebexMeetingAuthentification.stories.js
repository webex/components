import React from 'react';
import WebexMeetingAuthentification from './WebexMeetingAuthentication';

export default {
  title: 'Meetings/WebexMeetingAuthentification',
  component: WebexMeetingAuthentification,
};

const Template = (args) => <WebexMeetingAuthentification {...args} />;

export const MeetingAuthentification = Template.bind({});
MeetingAuthentification.args = {
  meetingID: 'meeting1',
};
