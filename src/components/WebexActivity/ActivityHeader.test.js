import React from 'react';
import {addDays, addHours, startOfToday, startOfWeek, startOfYesterday, subDays} from 'date-fns';

import ActivityHeader, {formatMessageDate} from './ActivityHeader';

jest.mock('../hooks/usePerson');

describe('Activity Header', () => {
  let today, sunday;

  beforeEach(() => {
    today = startOfToday(); // Mock date is set to Thu, Aug 1 2019 00:00
    sunday = startOfWeek(today); // Start of week is Sun, July 28 2019 00:00
  });

  describe('component snapshot', () => {
    test('matches header at 3:00 PM', () => {
      const headerComponent = <ActivityHeader personID="default" timestamp={addHours(today, 15).toString()} />;

      expect(shallow(headerComponent)).toMatchSnapshot();
    });
  });

  describe('formatMessageDate() returns', () => {
    test('AM/PM time from today date', () => {
      const nineAM = addHours(today, 9);

      expect(formatMessageDate(nineAM)).toEqual('9:00 AM');
    });

    test('"Yesterday" and AM/PM time from yesterday date', () => {
      const yesterdayOnePM = addHours(startOfYesterday(), 13);

      expect(formatMessageDate(yesterdayOnePM)).toEqual('Yesterday, 1:00 PM');
    });

    test('day name and AM/PM time from a date of this week', () => {
      const monday = addDays(sunday, 1);
      const mondayTenAM = addHours(monday, 10);

      expect(formatMessageDate(mondayTenAM)).toEqual('Monday, 10:00 AM');
    });

    test('formatted date for dates older than a week', () => {
      const lastFriday = subDays(sunday, 2);
      const lastFridayNoon = addHours(lastFriday, 12);

      expect(formatMessageDate(lastFridayNoon)).toEqual('07/26/2019, 12:00 PM');
    });
  });

  afterEach(() => {
    today = null;
    sunday = null;
  });
});
