import React from 'react';
import mockData from '../src/data';
import {WebexJSONAdapter} from '../src/adapters';
import {WebexDataProvider} from '../src/components';
import '@momentum-ui/core/css/momentum-ui.min.css';
import '../src/styles/index.scss';

export const decorators = [
  (Story, {parameters}) => {
    const data = {
      ...mockData,
       // Allows to dynamically send data from a story
      ...parameters.mockData,
    };
    const webexAdapter = new WebexJSONAdapter(data);

    return (
    <WebexDataProvider adapter={webexAdapter}>
      <Story />
    </WebexDataProvider>
  )},
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'centered',
  options: {
    storySort: {
      order: [
        'Platform',
        [
          'Webex Avatar',
          'Webex Member Roster',
          'Webex Member',
        ],
        'Messaging',
        [
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
};
