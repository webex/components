import React from 'react';

import WebexActivityStream from './WebexActivityStream';

jest.mock('../hooks/useRoom');
jest.mock('../hooks/useActivityStream');

describe('Webex Activity Stream component', () => {
  describe('snapshot', () => {
    test('matches with default stream', () => {
      expect(shallow(<WebexActivityStream roomID="default" />)).toMatchSnapshot();
    });

    test('matches with empty group stream', () => {
      expect(shallow(<WebexActivityStream roomID="empty-space" />)).toMatchSnapshot();
    });

    test('matches with empty direct stream', () => {
      expect(shallow(<WebexActivityStream roomID="empty-direct" />)).toMatchSnapshot();
    });

    test('matches with time rulers stream', () => {
      expect(shallow(<WebexActivityStream roomID="time-rulers" />)).toMatchSnapshot();
    });
  });
});
