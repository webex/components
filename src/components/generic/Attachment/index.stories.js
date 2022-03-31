import React from 'react';
import Attachment from './Attachment';

export default {
  title: 'Generic/Attachment',
  component: Attachment,
};

const Template = (args) => <Attachment {...args} />;

const fileImage = {
  objectType: 'file',
  url: 'http://loremflickr.com/800/800/city?36439',
  displayName: 'IMG_0311.jpeg',
  image: {
    url: 'http://loremflickr.com/800/800/city?36439',
    height: 640,
    width: 853,
  },
  fileSize: 113071,
  mimeType: 'image/jpeg',
  malwareQuarantineState: 'safe',
};

// eslint-disable-next-line no-unused-vars
const fileImages = [
  {
    objectType: 'file',
    url: 'http://loremflickr.com/800/800/city?36439',
    displayName: 'IMG_0395.jpeg',
    image: {
      url: 'http://loremflickr.com/800/800/city?36439',
      height: 640,
      width: 853,
    },
    fileSize: 1832341,
    mimeType: 'image/jpeg',
    malwareQuarantineState: 'safe',
    fileActionType: 'notification',
  },
  {
    objectType: 'file',
    url: 'http://loremflickr.com/800/800/city?36439',
    displayName: 'IMG_0058.jpeg',
    image: {
      url: 'http://loremflickr.com/800/800/city?36439',
      height: 540,
      width: 960,
    },
    fileSize: 85695,
    mimeType: 'image/jpeg',
    malwareQuarantineState: 'safe',
  },
];

const fileVideo = {
  objectType: 'file',
  url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  displayName: 'sample-mp4-file.mp4',
  fileSize: 10546620,
  mimeType: 'video/mp4',
  malwareQuarantineState: 'safe',
  fileActionType: 'notification',
};

export const AsImage = Template.bind({});
AsImage.args = {
  ...fileImage,
};

export const AsFailedImage = Template.bind({});
AsFailedImage.args = {
  ...fileImage,
  url: 'http://loremflickr.com/unkown',
};

export const AsVideo = Template.bind({});
AsVideo.args = {
  ...fileVideo,
  controls: false,
};

export const AsFile = Template.bind({});
AsFile.args = {
  url: 'https://gist.githubusercontent.com/jonniespratley/e92c8c9eadd18e5bdc5d5ea33478b642/raw/26d726e0c25b12a842c397478f2fde0ca861bcb7/inSeries.js',
  displayName: 'sample-file.js',
  fileSize: 10546620,
  mimeType: 'text/javascript',
};
