import React from 'react';

import WebexRemoteMedia from './WebexRemoteMedia';

jest.mock('../hooks/useMemberships');
jest.mock('../hooks/useMeeting');
jest.mock('../hooks/useStream');

describe('Webex Remote Media component', () => {
  describe('snapshot', () => {
    test('matches snapshot while loading', () => {
      expect(shallow(<WebexRemoteMedia meetingID="noMedia" />)).toMatchSnapshot();
    });

    test('matches snapshot of no remote members', () => {
      expect(shallow(<WebexRemoteMedia meetingID="noMembers" />)).toMatchSnapshot();
    });

    test('matches snapshot of disabled remote audio', () => {
      expect(shallow(<WebexRemoteMedia meetingID="remoteVideo" />)).toMatchSnapshot();
    });

    test('matches snapshot of disabled remote video', () => {
      expect(shallow(<WebexRemoteMedia meetingID="remoteAudio" />)).toMatchSnapshot();
    });

    test('matches snapshot of enabled remote audio & video', () => {
      expect(shallow(<WebexRemoteMedia meetingID="remoteAudio&Video" />)).toMatchSnapshot();
    });

    test('matches snapshot on error', () => {
      expect(shallow(<WebexRemoteMedia meetingID="failMeetingID" />)).toMatchSnapshot();
    });

    test('matches snapshot of enabled remote audio & video with custom CSS class', () => {
      expect(shallow(<WebexRemoteMedia className="my-custom-class" meetingID="remoteAudio&Video" />)).toMatchSnapshot();
    });
  });
});
