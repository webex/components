import React from 'react';

import WebexInMeeting from './WebexInMeeting';

export default {
  title: 'Meetings/Webex In-Meeting',
  component: WebexInMeeting,
};

const Template = (args) => <WebexInMeeting {...args} />;

export const VideoOnly = Template.bind({});
VideoOnly.args = {
  meetingID: 'meeting6',
};

export const Connecting = Template.bind({});
Connecting.args = {
  meetingID: 'meeting3',
};

export const AudioOnly = Template.bind({});
AudioOnly.args = {
  meetingID: 'meeting5',
};

export const AllMedia = Template.bind({});
AllMedia.args = {
  meetingID: 'meeting2',
};

export const LocalShare = Template.bind({});
LocalShare.args = {
  meetingID: 'meeting1',
};

export const RemoteShare = Template.bind({});
RemoteShare.args = {
  meetingID: 'meeting2',
};
