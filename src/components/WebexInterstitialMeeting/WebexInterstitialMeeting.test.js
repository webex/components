import React from 'react';

import WebexInterstitialMeeting from './WebexInterstitialMeeting';

jest.mock('../hooks/useMeeting');

describe('Webex Interstitial Meeting component', () => {
  describe('snapshot', () => {
    test('matches snapshot of loading while meeting is created', () => {
      expect(shallow(<WebexInterstitialMeeting meetingDestination="" />)).toMatchSnapshot();
    });

    test('matches snapshot of meeting destination', () => {
      expect(shallow(<WebexInterstitialMeeting meetingDestination="localMedia" />)).toMatchSnapshot();
    });
  });
});
