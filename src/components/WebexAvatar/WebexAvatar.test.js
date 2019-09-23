import React from 'react';

import {PersonStatus} from '../../adapters/PeopleAdapter';

import WebexAvatar from './WebexAvatar';

jest.mock('../hooks/usePerson');

describe('Webex Avatar component', () => {
  test('matches snapshot with "default" status', () => {
    expect(shallow(<WebexAvatar personID="default" />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.ACTIVE}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.ACTIVE} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.BOT}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.BOT} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.CALL}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.CALL} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.DO_NOT_DISTURB}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.DO_NOT_DISTURB} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.INACTIVE}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.INACTIVE} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.MEETING}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.MEETING} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.OUT_OF_OFFICE}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.OUT_OF_OFFICE} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.PRESENTING}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.PRESENTING} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.SELF}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.SELF} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.TYPING}" person status`, () => {
    expect(shallow(<WebexAvatar personID={PersonStatus.TYPING} />)).toMatchSnapshot();
  });

  test('matches snapshot with wrong personID', () => {
    expect(shallow(<WebexAvatar personID="Wrong PersonID" />)).toMatchSnapshot();
  });
});
