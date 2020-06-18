import React from 'react';
import {storiesOf} from '@storybook/react';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';

import WebexParticipant from './WebexParticipant';

import {WebexDataProvider} from '..';

// Setup for the stories
const stories = storiesOf('Webex Participant', module);
const webexAdapter = new WebexJSONAdapter(jsonData);

// Stories
stories.add('default', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexParticipant personID="default" />
  </WebexDataProvider>
));
