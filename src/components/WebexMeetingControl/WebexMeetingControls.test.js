import React from 'react';

import WebexMeetingControls from './WebexMeetingControls';

describe('Webex Meeting Controls component', () => {
  test('matches snapshot', () => {
    const component = shallow(
      <WebexMeetingControls meetingID="my-meeting">
        <div className="test" />
      </WebexMeetingControls>
    );

    expect(component).toMatchSnapshot();
  });

  test('matches snapshot with custom CSS class', () => {
    const component = shallow(
      <WebexMeetingControls className="my-custom-class" meetingID="my-meeting">
        <div className="test" />
      </WebexMeetingControls>
    );

    expect(component).toMatchSnapshot();
  });
});
