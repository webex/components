import React from 'react';
import WebexMeeting from './WebexMeeting';

export default {
  title: 'Meetings/Webex Meeting',
  component: WebexMeeting,
};

const wrapperStyles = {
  height: '500px',
  width: '650px',
};
const Template = (args) => <div style={wrapperStyles}><WebexMeeting {...args} /></div>;

export const Interstitial = Template.bind({});
Interstitial.args = {
  meetingDestination: 'meeting4',
};

export const Loading = Template.bind({});
Loading.args = {
  meetingDestination: 'meeting8',
};

// TODO: Add story started while "in meeting"

export const CustomControls = Template.bind({});
CustomControls.args = {
  meetingDestination: 'meeting6',
  controls: (isActive) => (isActive ? ['leave-meeting'] : ['join-meeting']),
};
