import React from 'react';
import WebexRemoteMedia from './WebexRemoteMedia';

export default {
  title: 'Meetings/Webex Remote Media',
  component: WebexRemoteMedia,
};

const Template = (args) => <WebexRemoteMedia {...args} />;

export const Loading = Template.bind({});
Loading.args = {
  meetingID: 'meeting7',
};

export const WaitingForOthers = Template.bind({});
WaitingForOthers.args = {
  meetingID: 'meeting4',
};

export const RemoteAudioOnly = Template.bind({});
RemoteAudioOnly.args = {
  meetingID: 'meeting5',
};

export const RemoteVideoOnly = Template.bind({});
RemoteVideoOnly.args = {
  meetingID: 'meeting6',
};

export const AllRemoteMedia = Template.bind({});
AllRemoteMedia.args = {
  meetingID: 'meeting2',
};

export const Error = Template.bind({});
Error.args = {
  meetingID: 'meeting8',
};
