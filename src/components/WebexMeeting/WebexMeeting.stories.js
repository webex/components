import React from 'react';
import WebexMeeting from './WebexMeeting';
import WebexMeetingControlBar from '../WebexMeetingControlBar/WebexMeetingControlBar';

const containerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
  'min-height': '25rem',
};

const controlBarStyle = {
  position: 'absolute',
  bottom: '1rem',
  left: 0,
  right: 0,
};

export default {
  title: 'Meetings/Webex Meeting',
  component: WebexMeeting,
  decorators: [(Story, context) => (
    <div style={containerStyle}>
      <Story />
      <div style={controlBarStyle}>
        <WebexMeetingControlBar meetingID={context.args.meetingID} />
      </div>
    </div>
  )],
};

const Template = (args) => <WebexMeeting {...args} />;

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
