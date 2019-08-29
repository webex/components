import React from 'react';

import {PeopleJSONAdapter, ActivitiesJSONAdapter} from '../../adapters';
import {activities, people} from '../../data';

import WebexActivity, {Header, formatMessageDate} from './WebexActivity';

jest.mock('../hooks/useActivity');
jest.mock('../hooks/usePerson');

describe('Webex Activity component', () => {
  let activityID, personID, adapters, newActivities;

  beforeEach(() => {
    newActivities = {};
    [activityID] = Object.keys(activities);
    [personID] = Object.keys(people);
    adapters = {
      peopleAdapter: new PeopleJSONAdapter(people),
      activitiesAdapter: new ActivitiesJSONAdapter(activities),
    };
  });

  describe('Header component snapshot', () => {
    test('matches snapshot with "default" props', () => {
      expect(
        shallow(
          <Header personID={personID} adapter={adapters.peopleAdapter} created={activities[activityID].created} />
        )
      ).toMatchSnapshot();
    });
  });

  describe('Webex Activity snapshots', () => {
    test('matches snapshot with "default" text', () => {
      expect(shallow(<WebexActivity activityID={activityID} adapters={adapters} />)).toMatchSnapshot();
    });

    test('matches snapshot with an activity without header', () => {
      newActivities[activityID] = {
        ...activities[activityID],
        displayHeader: false,
      };

      adapters.activitiesAdapter = new ActivitiesJSONAdapter(newActivities);
      expect(shallow(<WebexActivity activityID={activityID} adapters={adapters} />)).toMatchSnapshot();
    });

    test('matches snapshot with "long" text', () => {
      newActivities[activityID] = {
        ...activities[activityID],
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      };
      adapters.activitiesAdapter = new ActivitiesJSONAdapter(newActivities);

      expect(shallow(<WebexActivity activityID={activityID} adapters={adapters} />)).toMatchSnapshot();
    });

    test('matches snapshot with a text from today', () => {
      newActivities[activityID] = {
        ...activities[activityID],
        created: 'today',
      };
      adapters.activitiesAdapter = new ActivitiesJSONAdapter(newActivities);

      expect(shallow(<WebexActivity activityID={activityID} adapters={adapters} />)).toMatchSnapshot();
    });

    test('matches snapshot with a text from yesterday', () => {
      newActivities[activityID] = {
        ...activities[activityID],
        created: 'yesterday',
      };
      adapters.activitiesAdapter = new ActivitiesJSONAdapter(newActivities);

      expect(shallow(<WebexActivity activityID={activityID} adapters={adapters} />)).toMatchSnapshot();
    });

    test('matches snapshot with a text from the same week', () => {
      newActivities[activityID] = {
        ...activities[activityID],
        created: 'sameWeek',
      };
      adapters.activitiesAdapter = new ActivitiesJSONAdapter(newActivities);

      expect(shallow(<WebexActivity activityID={activityID} adapters={adapters} />)).toMatchSnapshot();
    });

    test('matches snapshot with a text over a week ago', () => {
      newActivities[activityID] = {
        ...activities[activityID],
        created: 'old',
      };
      adapters.activitiesAdapter = new ActivitiesJSONAdapter(newActivities);

      expect(shallow(<WebexActivity activityID={activityID} adapters={adapters} />)).toMatchSnapshot();
    });
  });

  describe('unit testing', () => {
    test('formatMessageDate() returns today date', () => {
      expect(formatMessageDate(new Date('today'))).toEqual('today p');
    });

    test('formatMessageDate() returns today date', () => {
      expect(formatMessageDate(new Date('yesterday'))).toEqual('Yesterday yesterday p');
    });

    test('formatMessageDate() returns same week date', () => {
      expect(formatMessageDate(new Date('sameWeek'))).toEqual('sameWeek iiii p');
    });

    test('formatMessageDate() returns today date', () => {
      expect(formatMessageDate(new Date('old'))).toEqual('old P p');
    });

    test('throws error with inappropriate activityID', () => {
      const wrongID = 'Wrong activityID';

      expect(() => shallow(<WebexActivity activityID={wrongID} adapters={adapters} />)).toThrowError(
        new Error(`Could not find activity with ID "${wrongID}"`)
      );
    });
  });

  afterEach(() => {
    newActivities = null;
    adapters = null;
    activityID = null;
    personID = null;
  });
});
