import React from 'react';

import RoomsJSONAdapter from '../../adapters/RoomsJSONAdapter';
import rooms from '../../data/rooms';

import WebexActivityStream, {Greeting, GreetingSpaceSVG, GreetingDirectSVG} from './WebexActivityStream';

jest.mock('../hooks/useRoom');
jest.mock('../hooks/useActivityStream');

describe('Webex Activity Stream component', () => {
  let roomsAdapter;

  beforeEach(() => {
    roomsAdapter = new RoomsJSONAdapter(rooms);
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
    test('matches with empty group stream', () => {
      expect(shallow(<WebexActivityStream roomID="default" adapter={roomsAdapter} />)).toMatchSnapshot();
    });

    test('matches with empty direct stream', () => {
      expect(shallow(<WebexActivityStream roomID="direct" adapter={roomsAdapter} />)).toMatchSnapshot();
    });
  });

  afterEach(() => {
    roomsAdapter = null;
  });
});
