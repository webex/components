import React from 'react';
import WebexInterstitialMeeting from './WebexInterstitialMeeting';

export default {
  title: 'Meetings/Webex Interstitial Meeting',
  component: WebexInterstitialMeeting,
};

const Template = (args) => <WebexInterstitialMeeting {...args} />;

export const Loading = Template.bind({});
Loading.args = {
  meetingID: '',
};

export const VideoAccessDialog = Template.bind({});
VideoAccessDialog.args = {
  meetingID: 'meeting2',
};
VideoAccessDialog.parameters = {
  storyshots: {disable: true},
};

export const VideoEnabled = Template.bind({});
VideoEnabled.args = {
  meetingID: 'meeting1',
};

export const VideoDisabled = Template.bind({});
VideoDisabled.args = {
  meetingID: 'meeting5',
};
