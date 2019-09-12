import React from 'react';
import {storiesOf} from '@storybook/react';

import PeopleJSONAdapter from '../../adapters/PeopleJSONAdapter';
import {PersonStatus} from '../../adapters/PeopleAdapter';
import people from '../../data/people';

import WebexAvatar from './WebexAvatar';

// Setup for the stories
const stories = storiesOf('Webex Avatar', module);
const peopleJSONAdapter = new PeopleJSONAdapter(people);

// Stories
stories.add('default', () => <WebexAvatar personID="default" adapter={peopleJSONAdapter} />);

stories.add(PersonStatus.ACTIVE, () => <WebexAvatar personID={PersonStatus.ACTIVE} adapter={peopleJSONAdapter} />);

stories.add(PersonStatus.BOT, () => <WebexAvatar personID={PersonStatus.BOT} adapter={peopleJSONAdapter} />);

stories.add(PersonStatus.CALL, () => <WebexAvatar personID={PersonStatus.CALL} adapter={peopleJSONAdapter} />);

stories.add(PersonStatus.DO_NOT_DISTURB, () => (
  <WebexAvatar personID={PersonStatus.DO_NOT_DISTURB} adapter={peopleJSONAdapter} />
));

stories.add(PersonStatus.INACTIVE, () => <WebexAvatar personID={PersonStatus.INACTIVE} adapter={peopleJSONAdapter} />);

stories.add(PersonStatus.MEETING, () => <WebexAvatar personID={PersonStatus.MEETING} adapter={peopleJSONAdapter} />);

stories.add(PersonStatus.OUT_OF_OFFICE, () => (
  <WebexAvatar personID={PersonStatus.OUT_OF_OFFICE} adapter={peopleJSONAdapter} />
));

stories.add(PersonStatus.PRESENTING, () => (
  <WebexAvatar personID={PersonStatus.PRESENTING} adapter={peopleJSONAdapter} />
));

stories.add(PersonStatus.SELF, () => <WebexAvatar personID={PersonStatus.SELF} adapter={peopleJSONAdapter} />);

stories.add(PersonStatus.TYPING, () => <WebexAvatar personID={PersonStatus.TYPING} adapter={peopleJSONAdapter} />);

stories.add('wrong PersonID', () => <WebexAvatar personID="Wrong personID" adapter={peopleJSONAdapter} />);
