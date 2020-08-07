import React from 'react';
import {storiesOf} from '@storybook/react';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';
import {WebexDataProvider, WebexMeetingControl, WebexMeetingControls} from '..';

// Setup for the stories
const stories = storiesOf('Webex Meeting Control', module);
const webexAdapter = new WebexJSONAdapter(jsonData);

// Stories
stories.add('text', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexMeetingControls meetingID="scheduledMeeting">
      <WebexMeetingControl type="join-meeting" />
    </WebexMeetingControls>
  </WebexDataProvider>
));

stories.add('disabled text', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexMeetingControls meetingID="scheduledMeeting">
      <WebexMeetingControl type="disabled-join-meeting" />
    </WebexMeetingControls>
  </WebexDataProvider>
));

stories.add('active icon', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexMeetingControls meetingID="mutedLocalAudio">
      <WebexMeetingControl type="mute-audio" />
    </WebexMeetingControls>
  </WebexDataProvider>
));

stories.add('inactive icon', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexMeetingControls meetingID="localAudio">
      <WebexMeetingControl type="mute-audio" />
    </WebexMeetingControls>
  </WebexDataProvider>
));

stories.add('disabled icon', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexMeetingControls meetingID="mutedLocalAudio">
      <WebexMeetingControl type="disabled-mute-audio" />
    </WebexMeetingControls>
  </WebexDataProvider>
));

stories.add('multiple icons', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexMeetingControls meetingID="localMedia">
      <WebexMeetingControl type="mute-audio" />
      <WebexMeetingControl type="mute-video" />
      <WebexMeetingControl type="share-screen" />
    </WebexMeetingControls>
  </WebexDataProvider>
));
