import React from 'react';
import WebexInterstitialMeeting from './WebexInterstitialMeeting';

export default {
  title: 'Meetings/Webex Interstitial Meeting',
  component: WebexInterstitialMeeting,
};

const Template = (args) => {
  const style = {
    height: '100%',
    width: '100%',
  };
  const props = {...args, style};

  return <WebexInterstitialMeeting {...props} />;
};

export const Loading = Template.bind({});
Loading.args = {
  meetingID: '',
};

export const VideoEnabled = Template.bind({});
VideoEnabled.args = {
  meetingID: 'meeting1',
};

export const VideoDisabled = Template.bind({});
VideoDisabled.args = {
  meetingID: 'meeting2',
};
