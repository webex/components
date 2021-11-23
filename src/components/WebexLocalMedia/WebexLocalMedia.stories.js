import React from 'react';
import WebexLocalMedia from './WebexLocalMedia';

export default {
  title: 'Meetings/Webex Local Media',
  component: WebexLocalMedia,
};

const Template = (args) => <WebexLocalMedia {...args} />;

export const Video = Template.bind({});
Video.args = {
  meetingID: 'meeting3',
  mediaType: 'video',
};

export const ScreenShare = Template.bind({});
ScreenShare.args = {
  meetingID: 'meeting12',
  mediaType: 'screen',
};

export const NoMedia = Template.bind({});
NoMedia.args = {
  meetingID: 'meeting2',
  mediaType: 'video',
};

// TODO: Missing custom styling story
