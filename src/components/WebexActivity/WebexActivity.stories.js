import React from 'react';
import {storiesOf} from '@storybook/react';
import {addDays, getDay, subDays} from 'date-fns';

import {ActivitiesJSONAdapter, PeopleJSONAdapter} from '../../adapters';
import {activities, people} from '../../data';

import WebexActivity from './WebexActivity';

// Setup for the stories
const [activityID] = Object.keys(activities);
const stories = storiesOf('Webex Activity', module);
const newActivities = {};

// Stories
stories.add('default', () => (
  <WebexActivity
    activityID={activityID}
    adapters={{
      activitiesAdapter: new ActivitiesJSONAdapter(activities),
      peopleAdapter: new PeopleJSONAdapter(people),
    }}
  />
));

stories.add('no activity header', () => {
  newActivities[activityID] = {
    ...activities[activityID],
    displayHeader: false,
  };

  return (
    <WebexActivity
      activityID={activityID}
      adapters={{
        activitiesAdapter: new ActivitiesJSONAdapter(newActivities),
        peopleAdapter: new PeopleJSONAdapter(people),
      }}
    />
  );
});

stories.add('multi-line text', () => {
  newActivities[activityID] = {
    ...activities[activityID],
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  };

  return (
    <WebexActivity
      activityID={activityID}
      adapters={{
        activitiesAdapter: new ActivitiesJSONAdapter(newActivities),
        peopleAdapter: new PeopleJSONAdapter(people),
      }}
    />
  );
});

stories.add('long text', () => {
  newActivities[activityID] = {
    ...activities[activityID],
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  };

  return (
    <WebexActivity
      activityID={activityID}
      adapters={{
        activitiesAdapter: new ActivitiesJSONAdapter(newActivities),
        peopleAdapter: new PeopleJSONAdapter(people),
      }}
    />
  );
});

stories.add('created today', () => {
  const today = new Date();

  newActivities[activityID] = {...activities[activityID], text: `${today}`, created: today};

  return (
    <WebexActivity
      activityID={activityID}
      adapters={{
        activitiesAdapter: new ActivitiesJSONAdapter(newActivities),
        peopleAdapter: new PeopleJSONAdapter(people),
      }}
    />
  );
});

stories.add('created yesterday', () => {
  const yesterday = subDays(new Date(), 1);

  newActivities[activityID] = {
    ...activities[activityID],
    text: `${yesterday}`,
    created: yesterday,
  };

  return (
    <WebexActivity
      activityID={activityID}
      adapters={{
        activitiesAdapter: new ActivitiesJSONAdapter(newActivities),
        peopleAdapter: new PeopleJSONAdapter(people),
      }}
    />
  );
});

stories.add('created this week', () => {
  // if it's sunday, make it a monday, otherwise pick the day before today
  const thisWeek = getDay(new Date()) === 0 ? addDays(new Date(), 1) : subDays(new Date(), 2);

  newActivities[activityID] = {...activities[activityID], text: `${thisWeek}`, created: thisWeek};

  return (
    <WebexActivity
      activityID={activityID}
      adapters={{
        activitiesAdapter: new ActivitiesJSONAdapter(newActivities),
        peopleAdapter: new PeopleJSONAdapter(people),
      }}
    />
  );
});

stories.add('created over a week ago', () => {
  const oldDate = subDays(new Date(), 7);

  newActivities[activityID] = {...activities[activityID], text: `${oldDate}`, created: oldDate};

  return (
    <WebexActivity
      activityID={activityID}
      adapters={{
        activitiesAdapter: new ActivitiesJSONAdapter(newActivities),
        peopleAdapter: new PeopleJSONAdapter(people),
      }}
    />
  );
});
