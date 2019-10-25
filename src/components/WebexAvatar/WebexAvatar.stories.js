import React from 'react';
import {storiesOf} from '@storybook/react';
import {PersonStatus} from '@webex/component-adapter-interfaces';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';
import {WebexAvatar, WebexDataProvider} from '../';

// Setup for the stories
const stories = storiesOf('Webex Avatar', module);
const webexAdapter = new WebexJSONAdapter(jsonData);

// Stories
stories.add('default', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexAvatar personID="default" adapter={webexAdapter} />
  </WebexDataProvider>
));

stories.add(PersonStatus.ACTIVE, () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexAvatar personID={PersonStatus.ACTIVE} />
  </WebexDataProvider>
));

stories.add(PersonStatus.BOT, () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexAvatar personID={PersonStatus.BOT} />
  </WebexDataProvider>
));

stories.add(PersonStatus.CALL, () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexAvatar personID={PersonStatus.CALL} />
  </WebexDataProvider>
));

stories.add(PersonStatus.DO_NOT_DISTURB, () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexAvatar personID={PersonStatus.DO_NOT_DISTURB} />
  </WebexDataProvider>
));

stories.add(PersonStatus.INACTIVE, () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexAvatar personID={PersonStatus.INACTIVE} />
  </WebexDataProvider>
));

stories.add(PersonStatus.MEETING, () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexAvatar personID={PersonStatus.MEETING} />
  </WebexDataProvider>
));

stories.add(PersonStatus.OUT_OF_OFFICE, () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexAvatar personID={PersonStatus.OUT_OF_OFFICE} />
  </WebexDataProvider>
));

stories.add(PersonStatus.PRESENTING, () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexAvatar personID={PersonStatus.PRESENTING} />
  </WebexDataProvider>
));

stories.add(PersonStatus.SELF, () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexAvatar personID={PersonStatus.SELF} />
  </WebexDataProvider>
));

stories.add(PersonStatus.TYPING, () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexAvatar personID={PersonStatus.TYPING} />
  </WebexDataProvider>
));

stories.add('wrong PersonID', () => (
  <WebexDataProvider adapter={webexAdapter}>
    <WebexAvatar personID="Wrong personID" />
  </WebexDataProvider>
));
