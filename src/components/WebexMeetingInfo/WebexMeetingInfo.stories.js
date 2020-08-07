import React from 'react';
import {storiesOf} from '@storybook/react';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';
import {WebexMeetingInfo, WebexDataProvider} from '..';

// Setup for the stories
const stories = storiesOf('Webex Meeting Info', module);
const webexAdapter = new WebexJSONAdapter(jsonData);
const wrapperStyle = {height: '150px', width: '500px', border: '1px solid black'};

stories.add('scheduled meeting', () => (
  <div style={wrapperStyle}>
    <WebexDataProvider adapter={webexAdapter}>
      <WebexMeetingInfo meetingID="scheduledMeeting" />
    </WebexDataProvider>
  </div>
));

stories.add('1:1 meeting', () => (
  <div style={wrapperStyle}>
    <WebexDataProvider adapter={webexAdapter}>
      <WebexMeetingInfo meetingID="oneOnOneMeeting" />
    </WebexDataProvider>
  </div>
));

stories.add('space meeting', () => (
  <div style={wrapperStyle}>
    <WebexDataProvider adapter={webexAdapter}>
      <WebexMeetingInfo meetingID="spaceMeeting" />
    </WebexDataProvider>
  </div>
));

stories.add('no meeting information', () => (
  <div style={wrapperStyle}>
    <WebexDataProvider adapter={webexAdapter}>
      <WebexMeetingInfo meetingID="noMeetingTitle" />
    </WebexDataProvider>
  </div>
));

stories.add('loading', () => (
  <div style={wrapperStyle}>
    <WebexDataProvider adapter={webexAdapter}>
      <WebexMeetingInfo meetingID="loadingMeeting" />
    </WebexDataProvider>
  </div>
));
