import React from 'react';
import {
  startOfToday,
  startOfWeek,
  startOfYesterday,
  subDays,
} from 'date-fns';

import TimeRuler, {formatTimeRulerText} from './TimeRuler';

describe('Time Ruler', () => {
  let today;
  let sunday;
  let yesterday;

  beforeEach(() => {
    today = startOfToday(); // Mock date is set to Thu, Aug 1 2019 00:00
    yesterday = startOfYesterday(); // Mock date is set to Wed, July 31 2019 00:00
    sunday = startOfWeek(today); // Start of week is Sun, July 28 2019 00:00
  });

  describe('component snapshot', () => {
    test('matches with time from today', () => {
      expect(shallow(<TimeRuler date={today.toString()} />)).toMatchSnapshot();
    });

    test('matches with time from yesterday', () => {
      expect(shallow(<TimeRuler date={yesterday.toString()} />)).toMatchSnapshot();
    });

    test('matches with time from this week', () => {
      expect(shallow(<TimeRuler date={sunday.toString()} />)).toMatchSnapshot();
    });

    test('matches with older than a week time', () => {
      expect(shallow(<TimeRuler date="2019/7/26" />)).toMatchSnapshot();
    });
  });

  describe('formatTimeRulerText() returns', () => {
    test('string "Today" from today date', () => {
      expect(formatTimeRulerText(today)).toEqual('Today');
    });

    test('string "Yesterday" from yesterday date', () => {
      expect(formatTimeRulerText(yesterday)).toEqual('Yesterday');
    });

    test('name of day from a date of this week', () => {
      expect(formatTimeRulerText(sunday)).toEqual('Sunday');
    });

    test('formatted date for dates older than a week', () => {
      expect(formatTimeRulerText(subDays(sunday, 2))).toEqual('07/26/2019');
    });
  });

  afterEach(() => {
    today = null;
    yesterday = null;
    sunday = null;
  });
});
