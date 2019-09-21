import React from 'react';

import jsonData from '../../data';

import ActivityHeader, {formatMessageDate} from './ActivityHeader';

jest.mock('../hooks/usePerson');

describe('Activity Header component', () => {
  describe('snapshot', () => {
    test('matches snapshot with "default" props', () => {
      const headerComponent = <ActivityHeader personID="default" created={jsonData.activities.default.created} />;

      expect(shallow(headerComponent)).toMatchSnapshot();
    });
  });

  describe('unit tests', () => {
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
  });
});
