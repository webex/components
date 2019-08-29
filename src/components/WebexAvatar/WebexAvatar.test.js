import React from 'react';

import PeopleJSONAdapter from '../../adapters/PeopleJSONAdapter';
import {PersonStatus} from '../../adapters/PeopleAdapter';
import people from '../../data/people';

import WebexAvatar from './WebexAvatar';

jest.mock('../hooks/usePerson');

describe('Webex Avatar component', () => {
  let personID, newPeople, peopleAdapter;

  beforeEach(() => {
    [personID] = Object.keys(people);
    newPeople = people;
    peopleAdapter = new PeopleJSONAdapter(people);
  });

  test('matches snapshot with "default" status', () => {
    expect(shallow(<WebexAvatar personID={personID} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.ACTIVE}" person status`, () => {
    newPeople[personID] = {...newPeople[personID], status: PersonStatus.ACTIVE};
    peopleAdapter = new PeopleJSONAdapter(newPeople);

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.BOT}" person status`, () => {
    newPeople[personID] = {...newPeople[personID], status: PersonStatus.BOT};
    peopleAdapter = new PeopleJSONAdapter(newPeople);

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.CALL}" person status`, () => {
    newPeople[personID] = {...newPeople[personID], status: PersonStatus.CALL};
    peopleAdapter = new PeopleJSONAdapter(newPeople);

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.DO_NOT_DISTURB}" person status`, () => {
    newPeople[personID] = {...newPeople[personID], status: PersonStatus.DO_NOT_DISTURB};
    peopleAdapter = new PeopleJSONAdapter(newPeople);

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.INACTIVE}" person status`, () => {
    newPeople[personID] = {...newPeople[personID], status: PersonStatus.INACTIVE};
    peopleAdapter = new PeopleJSONAdapter(newPeople);

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.MEETING}" person status`, () => {
    newPeople[personID] = {...newPeople[personID], status: PersonStatus.MEETING};
    peopleAdapter = new PeopleJSONAdapter(newPeople);

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.OUT_OF_OFFICE}" person status`, () => {
    newPeople[personID] = {...newPeople[personID], status: PersonStatus.OUT_OF_OFFICE};
    peopleAdapter = new PeopleJSONAdapter(newPeople);

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.PRESENTING}" person status`, () => {
    newPeople[personID] = {...newPeople[personID], status: PersonStatus.PRESENTING};
    peopleAdapter = new PeopleJSONAdapter(newPeople);

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.SELF}" person status`, () => {
    newPeople[personID] = {...newPeople[personID], status: PersonStatus.SELF};
    peopleAdapter = new PeopleJSONAdapter(newPeople);

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.TYPING}" person status`, () => {
    newPeople[personID] = {...newPeople[personID], status: PersonStatus.TYPING};
    peopleAdapter = new PeopleJSONAdapter(newPeople);

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test('throws error with inappropriate personID', () => {
    expect(() => shallow(<WebexAvatar personID="Wrong PersonID" adapter={peopleAdapter} />)).toThrowError(
      new Error('Could not find person with ID "Wrong PersonID"')
    );
  });

  afterEach(() => {
    peopleAdapter = null;
    newPeople = null;
    personID = null;
  });
});
