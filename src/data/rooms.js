import {mockActivities} from './utils';

export default {
  room1: {
    ID: 'room1',
    title: 'Developer Standup',
    roomType: 'group',
  },
  'room1-activities': [
    'activity3',
    'activity4',
    'activity5',
  ],
  'room1-previous-activities': ['activity1', 'activity2'],
  room2: {
    ID: 'room2',
    title: 'UI/UX Design',
    roomType: 'group',
  },
  'room2-activities': [
    'activity6',
    {date: '2019-08-15T21:00:07.047'},
    'activity7',
    {date: '2019-08-20T21:00:07.047'},
    'activity8',
  ],
  room3: {
    ID: 'room3',
    title: 'Marketing Campaign',
    roomType: 'space',
  },
  'room3-activities': [],
  room4: {
    ID: 'room4',
    title: 'Brandon Seege',
    roomType: 'direct',
  },
  'room4-activities': [],
  room5: {
    ID: 'room5',
    title: 'Full Space',
    roomType: 'space',
  },
  'room5-activities': [
    ...mockActivities.slice(0, 10).map((o) => o.ID),
  ],
  'room5-previous-activities': [
    ...mockActivities.splice(10, 50).map((o) => o.ID),
  ],
};
