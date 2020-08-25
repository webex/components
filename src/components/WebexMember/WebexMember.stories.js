import React from 'react';
import {storiesOf} from '@storybook/react';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';

import WebexMember from './WebexMember';

import {WebexDataProvider} from '..';

// Setup for the stories
const stories = storiesOf('Webex Member', module);
const webexAdapter = new WebexJSONAdapter(jsonData);

// Stories
stories.add('default', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexMember personID="default" />
  </WebexDataProvider>
));
