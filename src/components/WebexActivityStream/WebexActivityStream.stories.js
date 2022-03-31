import React from 'react';
import {subDays} from 'date-fns';
import faker from '@faker-js/faker';
import activities from '../../data/activities';
import rooms from '../../data/rooms';
import WebexActivityStream from './WebexActivityStream';
import {mockActivities} from '../../data/utils';

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

export const NewSpace = Template.bind({});
NewSpace.args = {
  roomID: 'room3',
};

export const NewDirect = Template.bind({});
NewDirect.args = {
  roomID: 'room4',
};

/**
 * @param interval
 */
function useForceRender(interval) {
  const render = React.useReducer(() => ({}))[1];

  React.useEffect(() => {
    const id = setInterval(render, interval);

    return () => clearInterval(id);
  }, [interval, render]);
}

export const StressTest = () => {
  useForceRender(2000);

  return (<Template roomID="room1" />);
};

export const EmptyStream = Template.bind({});
EmptyStream.args = {
  roomID: 'room4',
};
EmptyStream.parameters = {
  mockData: {
    rooms: {
      room5: {
      },
      'room5-previous-activities': [
        'activity1',
      ],
      'room5-activities': [
        'activity2',
      ],
    },
  },
};

export const FullStream = (args) => {
  let id = null;

  const stopFeed = () => {
    window.clearInterval(id);
  };

  const startFeed = () => {
    stopFeed();
    id = window.setInterval(() => {
      const act = {ID: `activity-${faker.datatype.number({min: 1, max: 50})}`};

      window.dispatchEvent(new CustomEvent('event:conversation.activity', {detail: act}));
      console.log('Pushing activity to feed', act);
    }, 2000);
  };

  return (
    <div>
      <button onClick={startFeed} type="button">Start Feed</button>
      <button onClick={stopFeed} type="button">Stop Feed</button>
      <Template {...args} style={{height: '90vh'}} />
    </div>
  );
};
FullStream.args = {
  roomID: 'room5',
};
FullStream.parameters = {
  mockData: {
    rooms: {
      ...rooms,
      'room7-previous-activities': [
        ...mockActivities.slice(10, 50).map((o) => o.ID),
      ],
      'room7-activities': [
        ...mockActivities.slice(0, 10).map((o) => o.ID),
      ],
    },
  },
};
