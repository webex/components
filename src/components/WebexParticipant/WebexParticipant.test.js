import React from 'react';

import WebexParticipant from './WebexParticipant';

jest.mock('../hooks/usePerson');

describe('Webex Participant component', () => {
  describe('snapshot', () => {
    test('matches snapshot of webex participant', () => {
      expect(shallow(<WebexParticipant personID="default" />)).toMatchSnapshot();
    });
  });
});
