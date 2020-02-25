import React from 'react';
import {storiesOf} from '@storybook/react';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';

import {WebexInMeeting, WebexDataProvider} from '..';

const stories = storiesOf('Webex InMeeting', module);
const webexAdapter = new WebexJSONAdapter(jsonData);

stories.add('remote and local media enabled', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexInMeeting meetingID="remote&localMedia" />
  </WebexDataProvider>
));

stories.add('only remote media enabled', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexInMeeting meetingID="remoteMedia" />
  </WebexDataProvider>
));
