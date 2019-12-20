import React from 'react';
import {storiesOf} from '@storybook/react';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';
import {WebexInterstitialMeeting, WebexDataProvider} from '../';

// Setup for the stories
const stories = storiesOf('Webex Interstitial Meeting', module);
const webexAdapter = new WebexJSONAdapter(jsonData);
const wrapperStyle = {height: '500px', width: '800px', border: '1px solid black'};

stories.add('loading', () => (
  <div style={wrapperStyle}>
    <WebexDataProvider adapter={webexAdapter}>
      <WebexInterstitialMeeting meetingDestination="" />
    </WebexDataProvider>
  </div>
));

stories.add('video enabled', () => (
  <div style={wrapperStyle}>
    <WebexDataProvider adapter={webexAdapter}>
      <WebexInterstitialMeeting meetingDestination="localMedia" />
    </WebexDataProvider>
  </div>
));

stories.add('video disabled', () => {
  jsonData.meetings.localMedia.localVideo = null;

  return (
    <div style={wrapperStyle}>
      <WebexDataProvider adapter={webexAdapter}>
        <WebexInterstitialMeeting meetingDestination="localMedia" />
      </WebexDataProvider>
    </div>
  );
});

stories.add('logs out meeting object after each change', () => {
  const logMeeting = (meeting) => {
    // eslint-disable-next-line no-console
    console.log(meeting);
  };

  return (
    <div style={wrapperStyle}>
      <WebexDataProvider adapter={webexAdapter}>
        <WebexInterstitialMeeting meetingDestination="localMedia" onMeeting={logMeeting} />
      </WebexDataProvider>
    </div>
  );
});
