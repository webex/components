import React from 'react';
import {storiesOf} from '@storybook/react';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';

import {WebexMeeting, WebexDataProvider} from '..';

const stories = storiesOf('Webex Meeting', module);
const webexAdapter = new WebexJSONAdapter(jsonData);

stories.add('default', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexMeeting meetingDestination="remote&localMedia" />
  </WebexDataProvider>
));

stories.add('custom controls', () => {
  const controls = (isActive) => (isActive ? ['leave-meeting'] : ['join-meeting']);

  return (
    <WebexDataProvider adapter={webexAdapter}>
      <WebexMeeting meetingDestination="localMedia" controls={controls} />
    </WebexDataProvider>
  );
});
