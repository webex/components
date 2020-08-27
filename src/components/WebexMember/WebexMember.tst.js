import React from 'react';

import WebexMember from './WebexMember';

jest.mock('../hooks/usePerson');

describe('Webex Member component', () => {
  describe('snapshot', () => {
    test('matches snapshot of webex member', () => {
      expect(shallow(<WebexMember personID="default" />)).toMatchSnapshot();
    });
  });
});
