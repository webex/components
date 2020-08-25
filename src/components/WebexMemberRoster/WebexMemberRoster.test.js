import React from 'react';

import WebexMemberRoster from './WebexMemberRoster';

jest.mock('../hooks/usePerson');

describe('Webex Member Roster component', () => {
  describe('snapshot', () => {
    test('matches snapshot of webex member roster', () => {
      expect(shallow(<WebexMemberRoster destinationID="default_membership" destinationType="room" />)).toMatchSnapshot();
    });
  });
});
