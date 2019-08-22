import React from 'react';

import PeopleJSONAdapter from '../../adapters/PeopleJSONAdapter';
import {PersonStatus} from '../../adapters/PeopleAdapter';
import people from '../../data/people';

import WebexAvatar from './WebexAvatar';

describe('Webex Avatar component', () => {
  let personID, peopleJSONAdapter;

  beforeEach(() => {
    [personID] = Object.keys(people);
    peopleJSONAdapter = new PeopleJSONAdapter(people);
    global.console.error = jest.fn();
  });

  test('matches snapshot with "default" status', () => {
    expect(shallow(<WebexAvatar personID={personID} adapter={peopleJSONAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.ACTIVE}" person status`, () => {
    peopleJSONAdapter.datasource[personID].status = PersonStatus.ACTIVE;

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleJSONAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.BOT}" person status`, () => {
    peopleJSONAdapter.datasource[personID].status = PersonStatus.BOT;

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleJSONAdapter} />)).toMatchSnapshot();
  });
  test(`matches snapshot with "${PersonStatus.CALL}" person status`, () => {
    peopleJSONAdapter.datasource[personID].status = PersonStatus.CALL;

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleJSONAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.DO_NOT_DISTURB}" person status`, () => {
    peopleJSONAdapter.datasource[personID].status = PersonStatus.DO_NOT_DISTURB;

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleJSONAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.INACTIVE}" person status`, () => {
    peopleJSONAdapter.datasource[personID].status = PersonStatus.INACTIVE;

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleJSONAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.MEETING}" person status`, () => {
    peopleJSONAdapter.datasource[personID].status = PersonStatus.MEETING;

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleJSONAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.OUT_OF_OFFICE}" person status`, () => {
    peopleJSONAdapter.datasource[personID].status = PersonStatus.OUT_OF_OFFICE;

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleJSONAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.PRESENTING}" person status`, () => {
    peopleJSONAdapter.datasource[personID].status = PersonStatus.PRESENTING;

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleJSONAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.SELF}" person status`, () => {
    peopleJSONAdapter.datasource[personID].status = PersonStatus.SELF;

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleJSONAdapter} />)).toMatchSnapshot();
  });

  test(`matches snapshot with "${PersonStatus.TYPING}" person status`, () => {
    peopleJSONAdapter.datasource[personID].status = PersonStatus.TYPING;

    expect(shallow(<WebexAvatar personID={personID} adapter={peopleJSONAdapter} />)).toMatchSnapshot();
  });

  test('throws error with inappropriate personID', () => {
    shallow(<WebexAvatar personID="Wrong PersonID" adapter={peopleJSONAdapter} />);

    expect(global.console.error).toHaveBeenCalledWith('Could not find person with ID "Wrong PersonID"');
  });

  afterEach(() => {
    personID = null;
    peopleJSONAdapter = null;
    global.console.error = null;
  });
});
