import React from 'react';
import {storiesOf} from '@storybook/react';

import PeopleJSONAdapter from '../../adapters/PeopleJSONAdapter';
import {PersonStatus} from '../../adapters/PeopleAdapter';
import person from '../../data/people';

import WebexAvatar from './WebexAvatar';

// Setup for the stories
const [personID] = Object.keys(person);
const peopleJSONAdapter = new PeopleJSONAdapter(person);
const stories = storiesOf('Webex Avatar', module);

// Stories
stories.add('no status', () => <WebexAvatar personID={personID} adapter={peopleJSONAdapter} />);

stories.add(`${PersonStatus.ACTIVE}`, () => {
  peopleJSONAdapter.datasource[personID].status = PersonStatus.ACTIVE;

  return <WebexAvatar personID={personID} adapter={peopleJSONAdapter} />;
});

stories.add(PersonStatus.BOT, () => {
  peopleJSONAdapter.datasource[personID].status = PersonStatus.BOT;

  return <WebexAvatar personID={personID} adapter={peopleJSONAdapter} />;
});

stories.add(PersonStatus.CALL, () => {
  peopleJSONAdapter.datasource[personID].status = PersonStatus.CALL;

  return <WebexAvatar personID={personID} adapter={peopleJSONAdapter} />;
});

stories.add(PersonStatus.DO_NOT_DISTURB, () => {
  peopleJSONAdapter.datasource[personID].status = PersonStatus.DO_NOT_DISTURB;

  return <WebexAvatar personID={personID} adapter={peopleJSONAdapter} />;
});

stories.add(PersonStatus.INACTIVE, () => {
  peopleJSONAdapter.datasource[personID].status = PersonStatus.INACTIVE;

  return <WebexAvatar personID={personID} adapter={peopleJSONAdapter} />;
});

stories.add(PersonStatus.MEETING, () => {
  peopleJSONAdapter.datasource[personID].status = PersonStatus.MEETING;

  return <WebexAvatar personID={personID} adapter={peopleJSONAdapter} />;
});

stories.add(PersonStatus.OUT_OF_OFFICE, () => {
  peopleJSONAdapter.datasource[personID].status = PersonStatus.OUT_OF_OFFICE;

  return <WebexAvatar personID={personID} adapter={peopleJSONAdapter} />;
});

stories.add(PersonStatus.PRESENTING, () => {
  peopleJSONAdapter.datasource[personID].status = PersonStatus.PRESENTING;

  return <WebexAvatar personID={personID} adapter={peopleJSONAdapter} />;
});

stories.add(PersonStatus.SELF, () => {
  peopleJSONAdapter.datasource[personID].status = PersonStatus.SELF;

  return <WebexAvatar personID={personID} adapter={peopleJSONAdapter} />;
});

stories.add(PersonStatus.TYPING, () => {
  peopleJSONAdapter.datasource[personID].status = PersonStatus.TYPING;

  return <WebexAvatar personID={personID} adapter={peopleJSONAdapter} />;
});

stories.add('wrong PersonID', () => <WebexAvatar personID="Wrong personID" adapter={peopleJSONAdapter} />);
