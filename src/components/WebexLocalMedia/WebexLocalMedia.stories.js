import React from 'react';
import {storiesOf} from '@storybook/react';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';
import {WebexLocalMedia, WebexDataProvider} from '../';

const stories = storiesOf('Webex Local Media', module);
const webexAdapter = new WebexJSONAdapter(jsonData);

stories.add('enabled', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexLocalMedia meetingID="localVideo" />
  </WebexDataProvider>
));

stories.add('disabled', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexLocalMedia meetingID="noMedia" />
  </WebexDataProvider>
));
