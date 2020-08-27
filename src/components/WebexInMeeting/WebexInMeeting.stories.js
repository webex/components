import React from 'react';

import WebexInMeeting from './WebexInMeeting';

export default {
  title: 'Meetings/Webex In-Meeting',
  component: WebexInMeeting,
};

const Template = (args) => <WebexInMeeting {...args} />;

export const AllMedia = Template.bind({});
AllMedia.args = {
  meetingID: 'meeting1',
};

export const RemoteMediaOnly = Template.bind({});
RemoteMediaOnly.args = {
  meetingID: 'meeting2',
};
