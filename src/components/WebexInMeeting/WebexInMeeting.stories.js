import React from 'react';
import {storiesOf} from '@storybook/react';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';

import {WebexInMeeting, WebexDataProvider} from '..';

// Setup for the stories
const stories = storiesOf('Webex InMeeting', module);
const webexAdapter = new WebexJSONAdapter(jsonData);
const wrapperStyle = {height: '500px', width: '800px', border: '1px solid black'};

stories.add('remote and local media enabled', () => (
  <div style={wrapperStyle}>
    <WebexDataProvider adapter={webexAdapter}>
      <WebexInMeeting meetingID="remote&localMedia" />
    </WebexDataProvider>
  </div>
));

stories.add('only remote media enabled', () => (
  <div style={wrapperStyle}>
    <WebexDataProvider adapter={webexAdapter}>
      <WebexInMeeting meetingID="remoteMedia" />
    </WebexDataProvider>
  </div>
));
