import React from 'react';

import WebexMeetingControls from './WebexMeetingControls';

describe('Webex Meeting Controls component', () => {
  test('matches snapshot', () => {
    const meetingID = 'my-meeting';
    const component = shallow(
      <WebexMeetingControls meetingID={meetingID}>
        <div className="test" />
      </WebexMeetingControls>
    );

    expect(component).toMatchSnapshot();
  });
});
