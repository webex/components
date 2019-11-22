import React from 'react';

import WebexLocalMedia from './WebexLocalMedia';

jest.mock('../hooks/useMeeting');
jest.mock('../hooks/useVideo');

describe('Webex Local Media component', () => {
  describe('snapshot', () => {
    test('matches snapshot of local video', () => {
      expect(shallow(<WebexLocalMedia meetingID="localVideo" personID="default" />)).toMatchSnapshot();
    });

    test('matches snapshot of disabled local video', () => {
      expect(shallow(<WebexLocalMedia meetingID="scheduledMeeting" personID="default" />)).toMatchSnapshot();
    });
  });
});
