import React from 'react';
import {storiesOf} from '@storybook/react';

import PeopleJSONAdapter from '../../adapters/PeopleJSONAdapter';
import {PersonStatus} from '../../adapters/PeopleAdapter';
import people from '../../data/people';

import WebexAvatar from './WebexAvatar';

// Setup for the stories
const [personID] = Object.keys(people);
const stories = storiesOf('Webex Avatar', module);
const newPeople = {};

// Stories
stories.add('default', () => <WebexAvatar personID={personID} adapter={new PeopleJSONAdapter(people)} />);

stories.add(PersonStatus.ACTIVE, () => {
  newPeople[personID] = {...people[personID], status: PersonStatus.ACTIVE};

  return <WebexAvatar personID={personID} adapter={new PeopleJSONAdapter(newPeople)} />;
});

stories.add(PersonStatus.BOT, () => {
  newPeople[personID] = {...people[personID], status: PersonStatus.BOT};

  return <WebexAvatar personID={personID} adapter={new PeopleJSONAdapter(newPeople)} />;
});

stories.add(PersonStatus.CALL, () => {
  newPeople[personID] = {...people[personID], status: PersonStatus.CALL};

  return <WebexAvatar personID={personID} adapter={new PeopleJSONAdapter(newPeople)} />;
});

stories.add(PersonStatus.DO_NOT_DISTURB, () => {
  newPeople[personID] = {...people[personID], status: PersonStatus.DO_NOT_DISTURB};

  return <WebexAvatar personID={personID} adapter={new PeopleJSONAdapter(newPeople)} />;
});

stories.add(PersonStatus.INACTIVE, () => {
  newPeople[personID] = {...people[personID], status: PersonStatus.INACTIVE};

  return <WebexAvatar personID={personID} adapter={new PeopleJSONAdapter(newPeople)} />;
});

stories.add(PersonStatus.MEETING, () => {
  newPeople[personID] = {...people[personID], status: PersonStatus.MEETING};

  return <WebexAvatar personID={personID} adapter={new PeopleJSONAdapter(newPeople)} />;
});

stories.add(PersonStatus.OUT_OF_OFFICE, () => {
  newPeople[personID] = {...people[personID], status: PersonStatus.OUT_OF_OFFICE};

  return <WebexAvatar personID={personID} adapter={new PeopleJSONAdapter(newPeople)} />;
});

stories.add(PersonStatus.PRESENTING, () => {
  newPeople[personID] = {...people[personID], status: PersonStatus.PRESENTING};

  return <WebexAvatar personID={personID} adapter={new PeopleJSONAdapter(newPeople)} />;
});

stories.add(PersonStatus.SELF, () => {
  newPeople[personID] = {...people[personID], status: PersonStatus.SELF};

  return <WebexAvatar personID={personID} adapter={new PeopleJSONAdapter(newPeople)} />;
});

stories.add(PersonStatus.TYPING, () => {
  newPeople[personID] = {...people[personID], status: PersonStatus.TYPING};

  return <WebexAvatar personID={personID} adapter={new PeopleJSONAdapter(newPeople)} />;
});

stories.add('wrong PersonID', () => <WebexAvatar personID="Wrong personID" adapter={new PeopleJSONAdapter(people)} />);
