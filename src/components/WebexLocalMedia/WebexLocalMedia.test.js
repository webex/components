import React from 'react';

import WebexLocalMedia from './WebexLocalMedia';

jest.mock('../hooks/useMe');
jest.mock('../hooks/useMeeting');
jest.mock('../hooks/useStream');

describe('Webex Local Media component', () => {
  describe('snapshot', () => {
    test('matches snapshot of local video', () => {
      expect(shallow(<WebexLocalMedia meetingID="localVideo" />)).toMatchSnapshot();
    });

    test('matches snapshot of disabled local video', () => {
      expect(shallow(<WebexLocalMedia meetingID="noMedia" />)).toMatchSnapshot();
    });
  });
});
