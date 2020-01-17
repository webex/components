import React from 'react';

import WebexInMeeting from '../WebexInMeeting/WebexInMeeting';

jest.mock('../hooks/useMeeting');

describe('Webex InMeeting component', () => {
  describe('snapshot', () => {
    test('matches snapshot of meeting', () => {
      expect(shallow(<WebexInMeeting meetingID="remoteMedia" />)).toMatchSnapshot();
    });
  });
});
