import React from 'react';
import activities from '../../../data/activities';
import Activity from './Activity';

export default {
  title: 'Generic/Activity',
  component: Activity,
};

const Template = (args) => <Activity {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...activities.activity1,
  isUnread: false,
  isReply: false,
  isSelected: false,
};

export const WithImage = Template.bind({});
WithImage.args = {
  ...activities.ActivityWithImage,
};
export const WithGif = Template.bind({});
WithGif.args = {
  ...activities.ActivityWithGiff,
};
export const WithFile = Template.bind({});
WithFile.args = {
  ...activities.ActivityWithFile,
  ID: 'ActivityWithFile',
  attachments: [
    {
      id: 'file1',
      fileSize: 750,
      displayName: 'Normal.js',
      mimeType: 'text/javascript',
      url: 'https://gist.githubusercontent.com/jonniespratley/e92c8c9eadd18e5bdc5d5ea33478b642/raw/26d726e0c25b12a842c397478f2fde0ca861bcb7/inSeries.js',
      type: 'file',
    },
  ],
};
