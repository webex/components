import React from 'react';
import WebexMessaging from './WebexMessaging';

export default {
  title: 'Messaging/Webex Messaging',
  component: WebexMessaging,
};

const Template = (args) => <WebexMessaging {...args} style={{width: '100%', height: '100%'}} />;

export const Loading = Template.bind({});
Loading.args = {
};
