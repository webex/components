import React from 'react';

import jsonData from '../../data';

import WebexActivity, {Header, formatMessageDate} from './WebexActivity';

jest.mock('../hooks/useActivity');
jest.mock('../hooks/usePerson');

describe('Webex Activity component', () => {
  describe('Header component snapshot', () => {
    test('matches snapshot with "default" props', () => {
      expect(shallow(<Header personID="default" created={jsonData.activities.default.created} />)).toMatchSnapshot();
    });
  });

  describe('Webex Activity snapshots', () => {
    test('matches snapshot with "default" text', () => {
      expect(shallow(<WebexActivity activityID="default" />)).toMatchSnapshot();
    });

    test('matches snapshot with an activity without header', () => {
      expect(shallow(<WebexActivity activityID="no-header" />)).toMatchSnapshot();
    });

    test('matches snapshot with "long" text', () => {
      expect(shallow(<WebexActivity activityID="long" />)).toMatchSnapshot();
    });

    test('matches snapshot with a text from today', () => {
      expect(shallow(<WebexActivity activityID="today" />)).toMatchSnapshot();
    });

    test('matches snapshot with a text from yesterday', () => {
      expect(shallow(<WebexActivity activityID="yesterday" />)).toMatchSnapshot();
    });

    test('matches snapshot with a text from the same week', () => {
      expect(shallow(<WebexActivity activityID="sameWeek" />)).toMatchSnapshot();
    });

    test('matches snapshot with a text over a week ago', () => {
      expect(shallow(<WebexActivity activityID="old" />)).toMatchSnapshot();
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

      expect(() => shallow(<WebexActivity activityID={wrongID} />)).toThrowError(
        new Error(`Could not find activity with ID "${wrongID}"`)
      );
    });
  });
});
