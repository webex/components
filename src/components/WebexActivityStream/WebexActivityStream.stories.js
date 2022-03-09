import React from 'react';
import {subDays} from 'date-fns';
import activities from '../../data/activities';
import rooms from '../../data/rooms';
import WebexActivityStream from './WebexActivityStream';

export default {
  title: 'Messaging/Webex Activity Stream',
  component: WebexActivityStream,
};

const Template = (args) => <WebexActivityStream {...args} />;

export const Conversation = Template.bind({});
Conversation.args = {
  roomID: 'room1',
};

export const TimeRulers = Template.bind({});
TimeRulers.args = {
  roomID: 'room2',
};
// Modify time data on the fly
TimeRulers.parameters = {
  mockData: {
    rooms: {
      ...rooms,
      'room2-activities': [
        'activity6',
        {date: subDays(new Date(), 1).toString()},
        'activity7',
        {date: new Date().toString()},
        'activity8',
      ],
    },
    activities: {
      ...activities,
      activity7: {
        ...activities.activity7,
        created: subDays(new Date(), 1).toString(),
      },
      activity8: {
        ...activities.activity8,
        created: new Date().toString(),
      },
    },
  },
};

export const EmptySpace = Template.bind({});
EmptySpace.args = {
  roomID: 'room3',
};
