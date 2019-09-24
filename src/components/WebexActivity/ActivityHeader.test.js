import React from 'react';
import MockDate from 'mockdate';
import {startOfToday, startOfYesterday, startOfWeek, addHours} from 'date-fns';

import jsonData from '../../data';

import ActivityHeader, {formatMessageDate} from './ActivityHeader';

jest.mock('../hooks/usePerson');
MockDate.set('8/1/2019');

describe('Activity Header component', () => {
  // describe('snapshot', () => {
  //   test('matches snapshot with "default" props', () => {
  //     const headerComponent = <ActivityHeader personID="default" created={jsonData.activities.default.created} />;

  //     expect(shallow(headerComponent)).toMatchSnapshot();
  //   });
  // });

  describe('unit tests', () => {
    test('formatMessageDate() returns time for timestamp from today', () => {
      const laterToday = addHours(startOfToday(), 12);

      expect(formatMessageDate(laterToday)).toEqual('12:00 PM');
    });

    test('formatMessageDate() returns yesterday and time for timestamp from yesterday', () => {
      const yesterday = addHours(startOfYesterday(), 16);

      expect(formatMessageDate(yesterday)).toEqual('Yesterday 4:00 PM');
    });

    test('formatMessageDate() returns weekday and time for timestamp of the same week', () => {
      const sunday = addHours(startOfWeek(startOfToday()), 10);

      // TODO: Fails on Mondays...
      expect(formatMessageDate(sunday)).toEqual('Sunday 10:00 AM');
    });

    test('formatMessageDate() returns full date for older than a week timestamp', () => {
      const oldTime = new Date('August 1, 2019');

      expect(formatMessageDate(oldTime)).toEqual('8/1/19 12:00 AM');
    });
  });
});
