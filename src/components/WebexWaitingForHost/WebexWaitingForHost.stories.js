import React from 'react';

import WebexWaitingForHost from './WebexWaitingForHost';

export default {
  title: 'Meetings/Webex Waiting For Host',
  component: WebexWaitingForHost,
};

const Template = (args) => {
  const style = {
    width: '100%',
    height: '100%',
    ...args.style,
  };
  const props = {...args, style};

  return <WebexWaitingForHost {...props} />;
};

export const WaitingForHost = Template.bind({});
WaitingForHost.args = {
  meetingID: 'meeting11',
};
