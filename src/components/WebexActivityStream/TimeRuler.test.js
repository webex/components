import {
  startOfToday,
  startOfWeek,
  startOfYesterday,
  subDays,
} from 'date-fns';

import {formatTimeRulerText} from './TimeRuler';

describe('Time Ruler', () => {
  let today;
  let sunday;
  let yesterday;

  beforeEach(() => {
    today = startOfToday(); // Mock date is set to Thu, Aug 1 2019 00:00
    yesterday = startOfYesterday(); // Mock date is set to Wed, July 31 2019 00:00
    sunday = startOfWeek(today); // Start of week is Sun, July 28 2019 00:00
  });

  afterEach(() => {
    today = null;
    yesterday = null;
    sunday = null;
  });

  describe('formatTimeRulerText()', () => {
    test('returns string "Today" from today date', () => {
      expect(formatTimeRulerText(today)).toEqual('Today');
    });

    test('returns string "Yesterday" from yesterday date', () => {
      expect(formatTimeRulerText(yesterday)).toEqual('Yesterday');
    });

    test('returns name of day from a date of this week', () => {
      expect(formatTimeRulerText(sunday)).toEqual('Sunday');
    });

    test('returns formatted date for dates older than a week', () => {
      expect(formatTimeRulerText(subDays(sunday, 2))).toEqual('07/24/2020');
    });
  });
});
