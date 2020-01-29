import React from 'react';

import WebexMeeting from './WebexMeeting';

jest.mock('../hooks/useMeetingDestination');

describe('Webex Meeting component', () => {
  describe('snapshot', () => {
    let controls;

    beforeAll(() => {
      controls = (isActive) => (isActive ? ['leave-meeting'] : ['join-meeting']);
    });

    test('matches snapshot of loading while meeting is created', () => {
      expect(shallow(<WebexMeeting meetingDestination="" />)).toMatchSnapshot();
    });

    test('matches snapshot of a user waiting to join a meeting', () => {
      expect(shallow(<WebexMeeting meetingDestination="localMedia" />)).toMatchSnapshot();
    });

    test('matches snapshot of a user that has joined a meeting', () => {
      expect(shallow(<WebexMeeting meetingDestination="remoteMedia" />)).toMatchSnapshot();
    });

    test('matches snapshot of a user waiting to join a meeting with optional controls', () => {
      expect(shallow(<WebexMeeting meetingDestination="localMedia" controls={controls} />)).toMatchSnapshot();
    });

    test('matches snapshot of a user that has joined a meeting with optional controls', () => {
      expect(shallow(<WebexMeeting meetingDestination="remoteMedia" controls={controls} />)).toMatchSnapshot();
    });
  });
});
