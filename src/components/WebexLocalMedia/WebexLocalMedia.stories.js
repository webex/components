import React from 'react';
import {storiesOf} from '@storybook/react';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';
import {WebexLocalMedia, WebexDataProvider} from '../';

// Setup for the stories
const stories = storiesOf('Webex Local Media', module);
const webexAdapter = new WebexJSONAdapter(jsonData);
const wrapperStyle = {height: '500px', width: '800px', border: '1px solid black'};

stories.add('enabled', () => (
  <div style={wrapperStyle}>
    <WebexDataProvider adapter={webexAdapter}>
      <WebexLocalMedia meetingID="localVideo" personID="default" />
    </WebexDataProvider>
  </div>
));

stories.add('disabled', () => (
  <div style={wrapperStyle}>
    <WebexDataProvider adapter={webexAdapter}>
      <WebexLocalMedia meetingID="scheduledMeeting" personID="default" />
    </WebexDataProvider>
  </div>
));
