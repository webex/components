import {formatMeetingTime} from './WebexMeetingInfo';

describe('Webex Meeting Info', () => {
  describe('formatMeetingTime()', () => {
    test('returns a formatted start and end time string', () => {
      const startTime = new Date('2019-08-20T21:00:00.000');
      const endTime = new Date('2019-08-20T22:00:00.000');

      expect(formatMeetingTime(startTime, endTime)).toEqual('9:00 PM - 10:00 PM');
    });
  });
});
