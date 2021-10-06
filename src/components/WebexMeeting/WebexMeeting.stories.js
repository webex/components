import React from 'react';
import WebexMeeting from './WebexMeeting';

export default {
  title: 'Meetings/Webex Meeting',
  component: WebexMeeting,
};

const Template = (args) => <WebexMeeting {...args} style={{height: '100%', width: '100%'}} />;

export const Creating = Template.bind({});
Creating.args = {
  meetingID: undefined,
};

export const Interstitial = Template.bind({});
Interstitial.args = {
  meetingID: 'meeting3',
};

export const Loading = Template.bind({});
Loading.args = {
  meetingID: 'meeting9',
};

export const WaitingForOthers = Template.bind({});
WaitingForOthers.args = {
  meetingID: 'meeting4',
};

export const InMeeting = Template.bind({});
InMeeting.args = {
  meetingID: 'meeting1',
};

export const LeftMeeting = Template.bind({});
LeftMeeting.args = {
  meetingID: 'meeting8',
};

export const PasswordRequired = Template.bind({});
PasswordRequired.args = {
  meetingID: 'meeting10',
};
