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

export const Loading = Template.bind({});
Loading.args = {
  meetingDestination: 'meeting8',
};

export const Default = Template.bind({});
Default.args = {
  meetingDestination: 'meeting3',
};

export const CustomControls = Template.bind({});
CustomControls.args = {
  meetingDestination: 'meeting3',
  controls: (isActive) => (isActive ? ['leave-meeting'] : ['join-meeting']),
};
