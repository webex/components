import {
  addDays,
  addHours,
  startOfToday,
  startOfWeek,
  startOfYesterday,
  subDays,
} from 'date-fns';

import {formatMessageDate} from './ActivityHeader';

describe('Activity Header', () => {
  let today;
  let sunday;

  beforeEach(() => {
    today = startOfToday();
    sunday = startOfWeek(today);
  });

  afterEach(() => {
    today = null;
    sunday = null;
  });

  describe('formatMessageDate()', () => {
    test('returns AM/PM time from today date', () => {
      const nineAM = addHours(today, 9);

      expect(formatMessageDate(nineAM)).toEqual('9:00 AM');
    });

    test('returns "Yesterday" and AM/PM time from yesterday date', () => {
      const yesterdayOnePM = addHours(startOfYesterday(), 13);

      expect(formatMessageDate(yesterdayOnePM)).toEqual('Yesterday, 1:00 PM');
    });

    test('returns day name and AM/PM time from a date of this week', () => {
      const monday = addDays(sunday, 1);
      const mondayTenAM = addHours(monday, 10);

      expect(formatMessageDate(mondayTenAM)).toEqual('Monday, 10:00 AM');
    });

    test('returns formatted date for dates older than a week', () => {
      const lastFriday = subDays(sunday, 2);
      const lastFridayNoon = addHours(lastFriday, 12);

      expect(formatMessageDate(lastFridayNoon)).toEqual('07/24/2020, 12:00 PM');
    });
  });
});
