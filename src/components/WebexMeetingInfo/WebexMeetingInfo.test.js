import React from 'react';

import WebexMeetingInfo, {formatMeetingTime} from './WebexMeetingInfo';

jest.mock('../hooks/useMeeting');

describe('Webex Meeting Info component', () => {
  describe('snapshot', () => {
    test('matches snapshot of scheduled meeting', () => {
      expect(shallow(<WebexMeetingInfo meetingID="scheduledMeeting" />)).toMatchSnapshot();
    });

    test('matches snapshot of scheduled meeting with custom CSS class', () => {
      expect(shallow(<WebexMeetingInfo className="my-custom-class" meetingID="scheduledMeeting" />)).toMatchSnapshot();
    });

    test('matches snapshot of one on one meeting', () => {
      expect(shallow(<WebexMeetingInfo meetingID="oneOnOneMeeting" />)).toMatchSnapshot();
    });

    test('matches snapshot of space meeting', () => {
      expect(shallow(<WebexMeetingInfo meetingID="spaceMeeting" />)).toMatchSnapshot();
    });

    test('matches snapshot of no meeting title', () => {
      expect(shallow(<WebexMeetingInfo meetingID="noMeetingTitle" />)).toMatchSnapshot();
    });

    test('matches snapshot of loading', () => {
      expect(shallow(<WebexMeetingInfo meetingID="loadingMeeting" />)).toMatchSnapshot();
    });
  });

  describe('formatMeetingTime() returns', () => {
    test('a formatted start and end time string', () => {
      const startTime = new Date('2019-08-20T21:00:00.000Z');
      const endTime = new Date('2019-08-20T22:00:00.000Z');

      expect(formatMeetingTime(startTime, endTime)).toEqual('9:00 PM - 10:00 PM');
    });
  });
});
