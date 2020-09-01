import React from 'react';
import TestRenderer from 'react-test-renderer';

import WebexMeetingControls from './WebexMeetingControls';

describe('Webex Meeting Controls', () => {
  describe('snapshot', () => {
    test('matches snapshot', () => {
      const component = TestRenderer.create(
        <WebexMeetingControls meetingID="my-meeting">
          <div id="test" />
        </WebexMeetingControls>,
      );

      expect(component.toJSON()).toMatchSnapshot();
    });

    test('matches snapshot with custom CSS class', () => {
      const component = TestRenderer.create(
        <WebexMeetingControls className="my-custom-css-class" meetingID="my-meeting">
          <div id="test" />
        </WebexMeetingControls>,
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
