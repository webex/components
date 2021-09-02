import React from 'react';
import WebexMeetingControlBar from './WebexMeetingControlBar';

export default {
  title: 'Meetings/Webex Meeting Control Bar',
  component: WebexMeetingControlBar,
};

const Template = (args) => {
  const style = {
    width: '100%',
    ...args.style,
  };
  const props = {...args, style};

  return <WebexMeetingControlBar {...props} />;
};

export const Interstitial = Template.bind({});
Interstitial.args = {
  meetingID: 'meeting3',
  controls: () => ['mute-audio', 'mute-video', 'join-meeting'],
};

export const InMeeting = Template.bind({});
InMeeting.args = {
  meetingID: 'meeting1',
  controls: () => ['mute-audio', 'mute-video', 'share-screen', 'leave-meeting'],
};
