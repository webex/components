import React from 'react';
import {storiesOf} from '@storybook/react';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';
import {WebexActivityStream, WebexDataProvider} from '..';

// Setup for the stories
const stories = storiesOf('Webex Activity Stream', module);
const adapter = new WebexJSONAdapter(jsonData);

// Stories
stories.add('default', () => (
  <WebexDataProvider adapter={adapter}>
    <WebexActivityStream roomID="default" />
  </WebexDataProvider>
));

stories.add('empty group stream', () => (
  <WebexDataProvider adapter={adapter}>
    <WebexActivityStream roomID="empty-space" />
  </WebexDataProvider>
));

stories.add('with time rulers', () => (
  <WebexDataProvider adapter={adapter}>
    <WebexActivityStream roomID="time-rulers" />
  </WebexDataProvider>
));

stories.add('empty 1:1 stream', () => (
  <WebexDataProvider adapter={adapter}>
    <WebexActivityStream roomID="empty-direct" />
  </WebexDataProvider>
));
