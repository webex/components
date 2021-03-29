export default {
  membership1: {
    ID: 'membership1',
    destinationID: 'room1',
    destinationType: 'room',
    members: [
      {personID: 'user1', muted: null, sharing: null},
      {personID: 'user2', muted: null, sharing: null},
      {personID: 'user3', muted: null, sharing: null},
      {personID: 'user4', muted: null, sharing: null},
    ],
  },
  membership2: {
    ID: 'membership2',
    destinationID: 'room2',
    destinationType: 'room',
    members: [
      {personID: 'user1', muted: null, sharing: null},
      {personID: 'user5', muted: null, sharing: null},
      {personID: 'user6', muted: null, sharing: null},
    ],
  },
  membership3: {
    ID: 'membership3',
    destinationID: 'meeting1',
    destinationType: 'meeting',
    members: [
      {personID: 'user1', muted: false, sharing: true},
      {personID: 'user2', muted: true, sharing: false},
      {personID: 'user3', muted: true, sharing: false},
    ],
  },
  membership4: {
    ID: 'membership4',
    destinationID: 'meeting2',
    destinationType: 'meeting',
    members: [
      {personID: 'user1', muted: false, sharing: false},
      {personID: 'user2', muted: true, sharing: false},
      {personID: 'user3', muted: false, sharing: true},
      {personID: 'user4', muted: true, sharing: false},
      {personID: 'user5', muted: false, sharing: false},
      {personID: 'user6', muted: true, sharing: false},
    ],
  },
  membership5: {
    ID: 'membership5',
    destinationID: 'meeting4',
    destinationType: 'meeting',
    members: [
      {personID: 'user1', muted: false, sharing: true},
    ],
  },
  membership6: {
    ID: 'membership6',
    destinationID: 'meeting5',
    destinationType: 'meeting',
    members: [
      {personID: 'user1', muted: false, sharing: true},
      {personID: 'user2', muted: true, sharing: false},
    ],
  },
  membership7: {
    ID: 'membership7',
    destinationID: 'meeting6',
    destinationType: 'meeting',
    members: [
      {personID: 'user1', muted: false, sharing: true},
      {personID: 'user2', muted: true, sharing: false},
    ],
  },
};
