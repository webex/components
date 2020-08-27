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

export const VideoEnabled = Template.bind({});
VideoEnabled.args = {
  meetingID: 'localMedia',
};

export const VideoDisabled = Template.bind({});
VideoDisabled.args = {
  meetingID: 'noMedia',
};
