import React from 'react';
import {storiesOf} from '@storybook/react';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';

import {WebexMeeting, WebexDataProvider} from '..';

// Setup for the stories
const stories = storiesOf('Webex Meeting', module);
const webexAdapter = new WebexJSONAdapter(jsonData);
const wrapperStyle = {height: '500px', width: '800px', border: '1px solid black'};

stories.add('in session', () => (
  <div style={wrapperStyle}>
    <WebexDataProvider adapter={webexAdapter}>
      <WebexMeeting meetingDestination="localMedia" />
    </WebexDataProvider>
  </div>
));

stories.add('in session with optional controls', () => {
  const controls = (isActive) => (isActive ? ['leave-meeting'] : ['join-meeting']);

  return (
    <div style={wrapperStyle}>
      <WebexDataProvider adapter={webexAdapter}>
        <WebexMeeting meetingDestination="localMedia" controls={controls} />
      </WebexDataProvider>
    </div>
  );
});
