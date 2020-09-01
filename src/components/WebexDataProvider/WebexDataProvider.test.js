import React from 'react';
import TestRenderer from 'react-test-renderer';

import WebexDataProvider from './WebexDataProvider';

describe('Webex Data Provider', () => {
  describe('snapshot', () => {
    const adapter = {
      activitiesAdapter: {},
      meetingsAdapter: {},
      membershipsAdapter: {},
      roomsAdapter: {},
      peopleAdapter: {},
    };

    test('matches snapshot', () => {
      const component = TestRenderer.create(
        <WebexDataProvider adapter={adapter}>
          <div className="test" />
        </WebexDataProvider>,
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
