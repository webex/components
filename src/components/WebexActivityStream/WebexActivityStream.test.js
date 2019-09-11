import React from 'react';

import RoomsJSONAdapter from '../../adapters/RoomsJSONAdapter';
import {RoomType} from '../../adapters/RoomsAdapter';
import rooms from '../../data/rooms';

import WebexActivityStream, {Greeting, GreetingSpaceSVG, GreetingDirectSVG} from './WebexActivityStream';

jest.mock('../hooks/useRoom');
jest.mock('../hooks/useActivityStream');

describe('Webex Activity Stream component', () => {
  let roomID, newRooms, roomsAdapter;

  beforeEach(() => {
    newRooms = {...rooms}; // Reset newRooms
    [roomID] = Object.keys(rooms);
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
      expect(shallow(<WebexActivityStream roomID={roomID} adapter={roomsAdapter} />)).toMatchSnapshot();
    });

    test('matches with empty direct stream', () => {
      newRooms[roomID] = {
        ...rooms[roomID],
        roomType: RoomType.DIRECT,
      };
      roomsAdapter = new RoomsJSONAdapter(newRooms);

      expect(shallow(<WebexActivityStream roomID={roomID} adapter={roomsAdapter} />)).toMatchSnapshot();
    });
  });

  afterEach(() => {
    roomsAdapter = null;
    newRooms = null;
    roomID = null;
  });
});
