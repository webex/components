import React from 'react';
import WebexMember from './WebexMember';

export default {
  title: 'Platform/Webex Member',
  component: WebexMember,
};

const Template = (args) => <WebexMember {...args} />;

export const Default = Template.bind({});
Default.args = {
  personID: 'default',
};
