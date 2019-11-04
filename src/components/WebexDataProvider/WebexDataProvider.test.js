import React from 'react';

import WebexDataProvider from './WebexDataProvider';

describe('Webex Data Provider component', () => {
  const adapter = {
    activitiesAdapter: {},
    meetingsAdapter: {},
    roomsAdapter: {},
    peopleAdapter: {},
  };

  test('matches snapshot', () => {
    const component = shallow(
      <WebexDataProvider adapter={adapter}>
        <div className="test" />
      </WebexDataProvider>
    );

    expect(component).toMatchSnapshot();
  });
});
