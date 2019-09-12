import React from 'react';
import {storiesOf} from '@storybook/react';

import RoomsJSONAdapter from '../../adapters/RoomsJSONAdapter';
import rooms from '../../data/rooms';

import WebexActivityStream from './WebexActivityStream';

// Setup for the stories
const stories = storiesOf('Webex Activity Stream', module);
const adapter = new RoomsJSONAdapter(rooms);

// Stories
stories.add('empty group stream', () => <WebexActivityStream roomID="default" adapter={adapter} />);

stories.add('empty 1:1 stream', () => <WebexActivityStream roomID="direct" adapter={adapter} />);
