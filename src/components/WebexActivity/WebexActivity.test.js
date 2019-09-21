import React from 'react';

import WebexActivity from './WebexActivity';

jest.mock('../hooks/useActivity');

describe('Webex Activity component', () => {
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
});
