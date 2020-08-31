import React from 'react';
import Enzyme, {shallow, render, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockDate from 'mockdate';
import * as rxjs from 'rxjs';

import jsonData from '../src/data';

// Fix date-time for tests
MockDate.set('2019-08-01T22:00:00.000Z');

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.rxjs = rxjs;
global.navigator.mediaDevices = {
  getUserMedia: jest.fn(() => ({
    getAudioTracks: () => ['remote-audio'],
    getVideoTracks: () => ['remote-video'],
  })),
};
global.MediaStream = jest.fn((stream) => stream);

// Mock react `useContext` method globally to return mock json object for every test module
jest.spyOn(React, 'useContext').mockImplementation((context) => {
  return {
    activitiesAdapter: jsonData.activities,
    meetingsAdapter: jsonData.meetings,
    membershipsAdapter: jsonData.memberships,
    peopleAdapter: jsonData.people,
    roomsAdapter: jsonData.rooms,
  };
});

// Mock event dispatching for things like meeting controls, etc.
jest.spyOn(document, 'dispatchEvent').mockImplementation(() => {});
