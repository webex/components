import React from 'react';

import WebexMeetingControl from './WebexMeetingControl';

jest.mock('../hooks/useMeetingControl');

describe('Webex Meeting Control component', () => {
  describe('snapshot', () => {
    test('matches with text button', () => {
      expect(shallow(<WebexMeetingControl type="join-meeting" />)).toMatchSnapshot();
    });

    test('matches with disabled text button', () => {
      expect(shallow(<WebexMeetingControl type="join-meeting-disabled" />)).toMatchSnapshot();
    });

    test('matches with active icon button', () => {
      expect(shallow(<WebexMeetingControl type="mute-audio-active" />)).toMatchSnapshot();
    });

    test('matches with inactive icon button', () => {
      expect(shallow(<WebexMeetingControl type="mute-audio-inactive" />)).toMatchSnapshot();
    });

    test('matches with disabled icon button', () => {
      expect(shallow(<WebexMeetingControl type="mute-audio-disabled" />)).toMatchSnapshot();
    });
  });
});
