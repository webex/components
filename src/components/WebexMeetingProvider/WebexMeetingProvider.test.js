import React from 'react';
import TestRenderer from 'react-test-renderer';
import WebexMeetingProvider from './WebexMeetingProvider';

describe('Webex Meeting Provider', () => {
  test('checks snapshot', () => {
    const component = TestRenderer.create(
      <WebexMeetingProvider>
        <div className="test" />
      </WebexMeetingProvider>,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
