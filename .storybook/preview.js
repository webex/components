import React from 'react';
import mockData from '../src/data';
import {WebexJSONAdapter} from '../src/adapters';
import {WebexDataProvider} from '../src/components';
import '../src/styles/index.scss';

export const decorators = [
  (Story, {parameters}) => {
    const mockDataString = JSON.stringify(mockData, (key, value) => (
      value instanceof MediaStream ? '***mediastream***' : value
    ));
    const mockDataCopy = JSON.parse(mockDataString, (key, value) => (
      value === '***mediastream***' ? new MediaStream() : value
    ));
    const data = {
      ...mockDataCopy,
       // Allows to dynamically send data from a story
      ...parameters.mockData,
    };
    const webexAdapter = new WebexJSONAdapter(data);

    return (
    <>
      <WebexDataProvider adapter={webexAdapter}>
        <Story />
      </WebexDataProvider>

      <video id="remote-video" src="./video/ongoing-meeting.mp4" muted autoPlay playsInline loop width="0" height="0" />
      <video id="remote-share" src="./video/ongoing-share.mp4" muted autoPlay playsInline loop width="0" height="0" />
    </>
  )},
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: { disable: true },
  layout: 'centered',
  options: {
    storySort: {
      order: [
        'Platform',
        [
          'Webex Avatar',
          'Webex Member Roster',
          'Webex Member',
          'Sign In',
          'Webex Search People',
        ],
        'Messaging',
        [
          'Webex Messaging',
          'Webex Activity Stream',
          'Webex Activity',
        ],
        'Meetings',
        [
          'Webex Meeting',
          'Webex Meeting Info',
          'Webex Interstitial Meeting',
          'Webex In-Meeting',
          'Webex Local Media',
          'Webex Remote Media',
          'Webex Meeting Control'
        ],
      ],
    },
  },
  themes: {
    list: [
      { name: 'light', class: 'wxc-theme-light', color: '#F8F8F8'},
      { name: 'dark', class: 'wxc-theme-dark', color: '#333333', default: true }
    ],
  },
};
