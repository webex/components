import React from 'react';
import {storiesOf} from '@storybook/react';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';
import {WebexRemoteMedia, WebexDataProvider} from '..';

// Setup for the stories
const stories = storiesOf('Webex Remote Media', module);
const webexAdapter = new WebexJSONAdapter(jsonData);
const wrapperStyle = {height: '500px', width: '800px', border: '1px solid black'};

stories.add('loading', () => (
  <div style={wrapperStyle}>
    <WebexDataProvider adapter={webexAdapter}>
      <WebexRemoteMedia meetingID="noMedia" />
    </WebexDataProvider>
  </div>
));

stories.add('waiting for others', () => (
  <div style={wrapperStyle}>
    <WebexDataProvider adapter={webexAdapter}>
      <WebexRemoteMedia meetingID="noMembers" />
    </WebexDataProvider>
  </div>
));

stories.add('video only', () => (
  <div style={wrapperStyle}>
    <WebexDataProvider adapter={webexAdapter}>
      <WebexRemoteMedia meetingID="remoteVideo" />
    </WebexDataProvider>
  </div>
));

stories.add('audio only', () => (
  <div style={wrapperStyle}>
    <WebexDataProvider adapter={webexAdapter}>
      <WebexRemoteMedia meetingID="remoteAudio" />
    </WebexDataProvider>
  </div>
));

stories.add('video and audio', () => (
  <div style={wrapperStyle}>
    <WebexDataProvider adapter={webexAdapter}>
      <WebexRemoteMedia meetingID="remoteAudio&Video" />
    </WebexDataProvider>
  </div>
));

stories.add('error', () => (
  <div style={wrapperStyle}>
    <WebexDataProvider adapter={webexAdapter}>
      <WebexRemoteMedia meetingID="failMeetingID" />
    </WebexDataProvider>
  </div>
));
