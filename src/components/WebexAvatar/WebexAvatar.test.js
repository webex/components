import React from 'react';

import PeopleJSONAdapter from '../../adapters/PeopleJSONAdapter';
import {PersonStatus} from '../../adapters/PeopleAdapter';
import people from '../../data/people';

import WebexAvatar from './WebexAvatar';

jest.mock('../hooks/usePerson');

describe('Webex Avatar component', () => {
  let peopleAdapter;

  beforeEach(() => {
    peopleAdapter = new PeopleJSONAdapter(people);
  });

  test('matches snapshot with "default" status', () => {
    expect(shallow(<WebexAvatar personID="default" adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.ACTIVE}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.ACTIVE} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.BOT}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.BOT} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.CALL}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.CALL} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.DO_NOT_DISTURB}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.DO_NOT_DISTURB} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.INACTIVE}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.INACTIVE} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.MEETING}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.MEETING} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.OUT_OF_OFFICE}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.OUT_OF_OFFICE} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.PRESENTING}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.PRESENTING} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.SELF}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.SELF} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.TYPING}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.TYPING} adapter={peopleAdapter} />)).toMatchSnapshot();
  });

  test('throws error with inappropriate personID', () => {
    expect(() => shallow(<WebexAvatar personID="Wrong PersonID" adapter={peopleAdapter} />)).toThrowError(
      new Error('Could not find person with ID "Wrong PersonID"')
    );
  });

  afterEach(() => {
    peopleAdapter = null;
  });
});
