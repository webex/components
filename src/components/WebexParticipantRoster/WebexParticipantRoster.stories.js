import React from 'react';
import {storiesOf} from '@storybook/react';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';

import WebexParticipantRoster from './WebexParticipantRoster';

import {WebexDataProvider} from '..';

// Setup for the stories
const stories = storiesOf('Webex Participant Roster', module);
const webexAdapter = new WebexJSONAdapter(jsonData);

// Stories
stories.add('default', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexParticipantRoster destinationID="default_membership" destinationType="room" />
  </WebexDataProvider>
));
