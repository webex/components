import React from 'react';
import {storiesOf} from '@storybook/react';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';

import WebexMemberRoster from './WebexMemberRoster';

import {WebexDataProvider} from '..';

// Setup for the stories
const stories = storiesOf('Webex Member Roster', module);
const webexAdapter = new WebexJSONAdapter(jsonData);

// Stories
stories.add('default', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexMemberRoster destinationID="default_membership" destinationType="room" />
  </WebexDataProvider>
));
