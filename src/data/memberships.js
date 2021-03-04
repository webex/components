export default {
  membership1: {
    ID: 'membership1',
    destinationID: 'room1',
    destinationType: 'room',
    members: [
      {personID: 'user1', inMeeting: null},
      {personID: 'user2', inMeeting: null},
      {personID: 'user3', inMeeting: null},
      {personID: 'user4', inMeeting: null},
    ],
  },
  membership2: {
    ID: 'membership2',
    destinationID: 'room2',
    destinationType: 'room',
    members: [
      {personID: 'user1', inMeeting: null},
      {personID: 'user5', inMeeting: null},
      {personID: 'user6', inMeeting: null},
    ],
  },
  membership3: {
    ID: 'membership3',
    destinationID: 'meeting1',
    destinationType: 'meeting',
    members: [
      {personID: 'user1', inMeeting: false},
      {personID: 'user2', inMeeting: true},
      {personID: 'user3', inMeeting: true},
    ],
  },
  membership4: {
    ID: 'membership4',
    destinationID: 'meeting2',
    destinationType: 'meeting',
    members: [
      {personID: 'user1', inMeeting: true},
      {personID: 'user2', inMeeting: true},
      {personID: 'user3', inMeeting: true},
      {personID: 'user4', inMeeting: true},
      {personID: 'user5', inMeeting: true},
      {personID: 'user6', inMeeting: true},
    ],
  },
  membership5: {
    ID: 'membership5',
    destinationID: 'meeting4',
    destinationType: 'meeting',
    members: [
      {personID: 'user1', inMeeting: true},
    ],
  },
  membership6: {
    ID: 'membership6',
    destinationID: 'meeting5',
    destinationType: 'meeting',
    members: [
      {personID: 'user1', inMeeting: true},
      {personID: 'user2', inMeeting: false},
    ],
  },
  membership7: {
    ID: 'membership7',
    destinationID: 'meeting6',
    destinationType: 'meeting',
    members: [
      {personID: 'user1', inMeeting: false},
      {personID: 'user2', inMeeting: true},
    ],
  },
};
