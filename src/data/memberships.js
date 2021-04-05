export default {
  membership1: {
    ID: 'membership1',
    destinationID: 'room1',
    destinationType: 'room',
    members: [
      {
        id: 'user1', muted: null, inMeeting: null, orgID: 'org1',
      },
      {
        id: 'user2', muted: null, inMeeting: null, orgID: 'org1',
      },
      {
        id: 'user3', muted: null, inMeeting: null, orgID: 'org1',
      },
      {
        id: 'user4', muted: null, inMeeting: null, orgID: 'org1',
      },
    ],
  },
  membership2: {
    ID: 'membership2',
    destinationID: 'room2',
    destinationType: 'room',
    members: [
      {
        id: 'user1', muted: null, inMeeting: null, orgID: 'org1',
      },
      {
        id: 'user5', muted: null, inMeeting: null, orgID: 'org2',
      },
      {
        id: 'user6', muted: null, inMeeting: null, orgID: 'org1',
      },
    ],
  },
  membership3: {
    ID: 'membership3',
    destinationID: 'meeting1',
    destinationType: 'meeting',
    members: [
      {
        id: 'user1', muted: false, inMeeting: false, orgID: 'org1',
      },
      {
        id: 'user2', muted: true, inMeeting: true, orgID: 'org1',
      },
      {
        id: 'user3', muted: true, inMeeting: true, orgID: 'org1',
      },
    ],
  },
  membership4: {
    ID: 'membership4',
    destinationID: 'meeting2',
    destinationType: 'meeting',
    members: [
      {
        id: 'user1', muted: false, inMeeting: true, orgID: 'org1',
      },
      {
        id: 'user2', muted: true, inMeeting: true, orgID: 'org1',
      },
      {
        id: 'user3', muted: false, inMeeting: true, orgID: 'org1',
      },
      {
        id: 'user4', muted: true, inMeeting: true, orgID: 'org1',
      },
      {
        id: 'user5', muted: false, inMeeting: true, orgID: 'org2',
      },
      {
        id: 'user6', muted: true, inMeeting: true, orgID: 'org1',
      },
    ],
  },
  membership5: {
    ID: 'membership5',
    destinationID: 'meeting4',
    destinationType: 'meeting',
    members: [
      {
        id: 'user1', muted: false, inMeeting: true, orgID: 'org1',
      },
    ],
  },
  membership6: {
    ID: 'membership6',
    destinationID: 'meeting5',
    destinationType: 'meeting',
    members: [
      {
        id: 'user1', muted: false, inMeeting: true, orgID: 'org1',
      },
      {
        id: 'user2', muted: true, inMeeting: true, orgID: 'org1',
      },
      {
        id: 'user3', inMeeting: false, orgID: 'org1',
      },
    ],
  },
  membership7: {
    ID: 'membership7',
    destinationID: 'meeting6',
    destinationType: 'meeting',
    members: [
      {
        id: 'user1', muted: false, inMeeting: true, orgID: 'org1',
      },
      {
        id: 'user2', muted: true, inMeeting: true, orgID: 'org1',
      },
    ],
  },
};
