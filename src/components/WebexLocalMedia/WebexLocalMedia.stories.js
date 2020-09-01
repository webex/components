import React from 'react';
import WebexLocalMedia from './WebexLocalMedia';

export default {
  title: 'Meetings/Webex Local Media',
  component: WebexLocalMedia,
};

const Template = (args) => <WebexLocalMedia {...args} />;

export const MediaEnabled = Template.bind({});
MediaEnabled.args = {
  meetingID: 'meeting1',
};

export const MediaDisabled = Template.bind({});
MediaDisabled.args = {
  meetingID: 'meeting2',
};

// TODO: Missing custom styling story
