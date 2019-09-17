import React from 'react';

import {ActivitiesJSONAdapter, PeopleJSONAdapter, RoomsJSONAdapter} from '../../adapters';
import {activities, people, rooms} from '../../data';

import WebexActivityStream, {Greeting, GreetingSpaceSVG, GreetingDirectSVG} from './WebexActivityStream';

jest.mock('../hooks/useRoom');
jest.mock('../hooks/useActivityStream');

describe('Webex Activity Stream component', () => {
  let adapters;

  beforeEach(() => {
    adapters = {
      roomsAdapter: new RoomsJSONAdapter(rooms),
      activitiesAdapter: new ActivitiesJSONAdapter(activities),
      peopleAdapter: new PeopleJSONAdapter(people),
    };
  });

  describe('Greeting Space SVG snapshot', () => {
    test('matches with greeting space SVG', () => {
      expect(shallow(<GreetingSpaceSVG />)).toMatchSnapshot();
    });
  });

  describe('Greeting 1:1 SVG snapshot', () => {
    test('matches with greeting 1:1 SVG', () => {
      expect(shallow(<GreetingDirectSVG />)).toMatchSnapshot();
    });
  });

  describe('Greeting component snapshot', () => {
    test('matches with empty space', () => {
      expect(shallow(<Greeting personName="" />)).toMatchSnapshot();
    });

    test('matches with empty 1:1', () => {
      expect(shallow(<Greeting personName="personName" />)).toMatchSnapshot();
    });
  });

  describe('Webex Activity Stream snapshots', () => {
    test('matches with default stream', () => {
      expect(shallow(<WebexActivityStream roomID="default" adapters={adapters} />)).toMatchSnapshot();
    });
    test('matches with empty group stream', () => {
      expect(shallow(<WebexActivityStream roomID="empty-space" adapters={adapters} />)).toMatchSnapshot();
    });

    test('matches with empty direct stream', () => {
      expect(shallow(<WebexActivityStream roomID="empty-direct" adapters={adapters} />)).toMatchSnapshot();
    });

    test('matches with time rulers stream', () => {
      expect(shallow(<WebexActivityStream roomID="time-rulers" adapters={adapters} />)).toMatchSnapshot();
    });
  });

  afterEach(() => {
    adapters = null;
  });
});
