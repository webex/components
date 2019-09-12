import React from 'react';
import {storiesOf} from '@storybook/react';
import {addDays, getDay, subDays} from 'date-fns';

import {ActivitiesJSONAdapter, PeopleJSONAdapter} from '../../adapters';
import {activities, people} from '../../data';

import WebexActivity from './WebexActivity';

// Setup for the stories
const stories = storiesOf('Webex Activity', module);
const adapters = {
  activitiesAdapter: new ActivitiesJSONAdapter(activities),
  peopleAdapter: new PeopleJSONAdapter(people),
};

// Stories
stories.add('default', () => <WebexActivity activityID="default" adapters={adapters} />);

stories.add('no header', () => <WebexActivity activityID="no-header" adapters={adapters} />);

stories.add('multi-line text', () => <WebexActivity activityID="multi-line" adapters={adapters} />);

stories.add('long text', () => <WebexActivity activityID="long" adapters={adapters} />);

stories.add('created today', () => {
  const today = new Date().toString();

  activities.today = {...activities.today, text: today, created: today};

  return <WebexActivity activityID="today" adapters={adapters} />;
});

stories.add('created yesterday', () => {
  const yesterday = subDays(new Date(), 1).toString();

  activities.yesterday = {...activities.yesterday, text: yesterday, created: yesterday};

  return <WebexActivity activityID="yesterday" adapters={adapters} />;
});

stories.add('created this week', () => {
  // if it's sunday, make it a monday, otherwise pick the day before today
  const thisWeek = getDay(new Date()) === 0 ? addDays(new Date(), 1) : subDays(new Date(), 2).toString();

  activities.sameWeek = {...activities.sameWeek, text: thisWeek, created: thisWeek};

  return <WebexActivity activityID="sameWeek" adapters={adapters} />;
});

stories.add('created over a week ago', () => {
  const oldDate = subDays(new Date(), 7).toString();

  activities.old = {...activities.old, text: oldDate, created: oldDate};

  return <WebexActivity activityID="old" adapters={adapters} />;
});
