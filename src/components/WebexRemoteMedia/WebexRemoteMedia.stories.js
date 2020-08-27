import React from 'react';
import WebexRemoteMedia from './WebexRemoteMedia';

export default {
  title: 'Meetings/Webex Remote Media',
  component: WebexRemoteMedia,
};

const Template = (args) => <WebexRemoteMedia {...args} />;

export const Loading = Template.bind({});
Loading.args = {
  meetingID: 'noMedia',
};

export const WaitingForOthers = Template.bind({});
WaitingForOthers.args = {
  meetingID: 'noMembers',
};

export const RemoteAudioOnly = Template.bind({});
RemoteAudioOnly.args = {
  meetingID: 'remoteAudio',
};

export const RemoteVideoOnly = Template.bind({});
RemoteVideoOnly.args = {
  meetingID: 'remoteVideo',
};

export const AllRemoteMedia = Template.bind({});
AllRemoteMedia.args = {
  meetingID: 'remoteAudio&Video',
};

export const Error = Template.bind({});
Error.args = {
  meetingID: 'failMeetingID',
};
