import React from 'react';

import RemoteMediaDisplay from './RemoteMediaDisplay';

jest.mock('../hooks/useStream');

describe('Remote Media Display component', () => {
  describe('snapshot', () => {
    test('matches snapshot of empty component', () => {
      expect(shallow(<RemoteMediaDisplay />)).toMatchSnapshot();
    });

    test('matches snapshot of remote audio', () => {
      expect(shallow(<RemoteMediaDisplay remoteAudio={{}} />)).toMatchSnapshot();
    });

    test('matches snapshot of remote video', () => {
      expect(shallow(<RemoteMediaDisplay remoteVideo={{}} />)).toMatchSnapshot();
    });

    test('matches snapshot of remote share', () => {
      expect(shallow(<RemoteMediaDisplay remoteShare={{}} />)).toMatchSnapshot();
    });

    test('matches snapshot of remote audio and Video', () => {
      expect(shallow(<RemoteMediaDisplay remoteAudio={{}} remoteVideo={{}} />)).toMatchSnapshot();
    });

    test('matches snapshot of remote audio, video, and share', () => {
      expect(shallow(<RemoteMediaDisplay remoteAudio={{}} remoteVideo={{}} remoteShare={{}} />))
        .toMatchSnapshot();
    });
  });
});
