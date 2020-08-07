import React from 'react';
import {storiesOf} from '@storybook/react';
import {addDays, getDay, subDays} from 'date-fns';

import jsonData from '../../data';
import {WebexJSONAdapter} from '../../adapters';
import {WebexActivity, WebexDataProvider} from '..';

// Setup for the stories
const stories = storiesOf('Webex Activity', module);
const adapter = new WebexJSONAdapter(jsonData);

// Stories
stories.add('default', () => (
  <WebexDataProvider adapter={adapter}>
    <WebexActivity activityID="default" />
  </WebexDataProvider>
));

stories.add('no header', () => (
  <WebexDataProvider adapter={adapter}>
    <WebexActivity activityID="no-header" />
  </WebexDataProvider>
));

stories.add('multi-line text', () => (
  <WebexDataProvider adapter={adapter}>
    <WebexActivity activityID="multi-line" />
  </WebexDataProvider>
));

stories.add('long text', () => (
  <WebexDataProvider adapter={adapter}>
    <WebexActivity activityID="long" />
  </WebexDataProvider>
));

stories.add('created today', () => {
  const today = new Date().toString();

  jsonData.activities.today = {
    ...jsonData.activities.today,
    created: today,
    text: today,
  };

  return (
    <WebexDataProvider adapter={adapter}>
      <WebexActivity activityID="today" />
    </WebexDataProvider>
  );
});

stories.add('created yesterday', () => {
  const yesterday = subDays(new Date(), 1).toString();

  jsonData.activities.yesterday = {
    ...jsonData.activities.yesterday,
    created: yesterday,
    text: yesterday,
  };

  return (
    <WebexDataProvider adapter={adapter}>
      <WebexActivity activityID="yesterday" />
    </WebexDataProvider>
  );
});

stories.add('created this week', () => {
  // if it's sunday, make it a monday, otherwise pick the day before today
  const thisWeek = getDay(new Date()) === 0
    ? addDays(new Date(), 1)
    : subDays(new Date(), 2).toString();

  jsonData.activities.sameWeek = {
    ...jsonData.activities.sameWeek,
    created: thisWeek,
    text: thisWeek,
  };

  return (
    <WebexDataProvider adapter={adapter}>
      <WebexActivity activityID="sameWeek" />
    </WebexDataProvider>
  );
});

stories.add('created over a week ago', () => {
  const oldDate = subDays(new Date(), 7).toString();

  jsonData.activities.old = {
    ...jsonData.activities.old,
    created: oldDate,
    text: oldDate,
  };

  return (
    <WebexDataProvider adapter={adapter}>
      <WebexActivity activityID="old" />
    </WebexDataProvider>
  );
});
