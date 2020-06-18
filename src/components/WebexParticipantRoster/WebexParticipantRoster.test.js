import React from 'react';

import WebexParticipantRoster from './WebexParticipantRoster';

jest.mock('../hooks/usePerson');

describe('Webex Participant Roster component', () => {
  describe('snapshot', () => {
    test('matches snapshot of webex participant roster', () => {
      expect(shallow(<WebexParticipantRoster destination="default_membership" />)).toMatchSnapshot();
    });
  });
});
