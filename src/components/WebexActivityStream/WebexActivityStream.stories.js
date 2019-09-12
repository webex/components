import React from 'react';
import {storiesOf} from '@storybook/react';

import {ActivitiesJSONAdapter, PeopleJSONAdapter, RoomsJSONAdapter} from '../../adapters';
import {activities, people, rooms} from '../../data';

import WebexActivityStream from './WebexActivityStream';

// Setup for the stories
const stories = storiesOf('Webex Activity Stream', module);
const adapters = {
  roomsAdapter: new RoomsJSONAdapter(rooms),
  activitiesAdapter: new ActivitiesJSONAdapter(activities),
  peopleAdapter: new PeopleJSONAdapter(people),
};

// Stories
stories.add('default', () => <WebexActivityStream roomID="default" adapters={adapters} />);

stories.add('empty group stream', () => <WebexActivityStream roomID="empty-space" adapters={adapters} />);

stories.add('empty 1:1 stream', () => <WebexActivityStream roomID="empty-direct" adapters={adapters} />);
