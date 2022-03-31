import React from 'react';
import WebexMeetingParticipant from './WebexMeetingParticipant';

export default {
  title: 'Meetings/Webex Meeting Participant',
  component: WebexMeetingParticipant,
  decorators: [(Story) => <div style={{width: '20rem'}}><Story /></div>],
};

const Template = (args) => <WebexMeetingParticipant {...args} />;

export const Muted = Template.bind({});
Muted.args = {
  meetingID: 'meeting2',
  personID: 'user2',
};

export const Host = Template.bind({});
Host.args = {
  meetingID: 'meeting2',
  personID: 'user4',
};

export const Guest = Template.bind({});
Guest.args = {
  meetingID: 'meeting2',
  personID: 'user6',
};

export const ScreenSharing = Template.bind({});
ScreenSharing.args = {
  meetingID: 'meeting2',
  personID: 'user3',
};
