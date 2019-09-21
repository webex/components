import React from 'react';
import Enzyme, {shallow, render, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as rxjs from 'rxjs';

import jsonData from '../src/data';

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.rxjs = rxjs;
global.Date = class extends Date {
  constructor(date) {
    super();
    this.dateString = date || 'now';
  }

  toString() {
    return this.dateString;
  }
};

// Mock react `useContext` method globally to return mock json object for every test module
jest.spyOn(React, 'useContext').mockImplementation((context) => {
  return {activitiesAdapter: jsonData.activities, peopleAdapter: jsonData.people, roomsAdapter: jsonData.rooms};
});
