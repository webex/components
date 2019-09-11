import React from 'react';
import {storiesOf} from '@storybook/react';

import RoomsJSONAdapter from '../../adapters/RoomsJSONAdapter';
import {RoomType} from '../../adapters/RoomsAdapter';
import rooms from '../../data/rooms';

import WebexActivityStream from './WebexActivityStream';

// Setup for the stories
const [roomID] = Object.keys(rooms);
const stories = storiesOf('Webex Activity Stream', module);
const newRooms = {};

// Stories
stories.add('empty group stream', () => <WebexActivityStream roomID={roomID} adapter={new RoomsJSONAdapter(rooms)} />);
stories.add('empty 1:1 stream', () => {
  newRooms[roomID] = {
    ...rooms[roomID],
    roomType: RoomType.DIRECT,
  };

  return <WebexActivityStream roomID={roomID} adapter={new RoomsJSONAdapter(newRooms)} />;
});
