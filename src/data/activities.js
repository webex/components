import {activityMap} from './utils';

const ActivityWithGiff = {
  ID: 'ActivityWithGiff',
  text: 'Lorem ipsum dolor site ate aetns ctetuer',
  created: '2022-01-01 08:12:00',
  roomID: 'room1',
  personID: 'user1',
  type: 'content',
  attachments: [
    {
      id: '0000-0000-0001',
      fileSize: 840691,
      displayName: 'Some GIF',
      mimeType: 'image/gif',
      url: 'https://media0.giphy.com/media/13FrpeVH09Zrb2/giphy_s.gif',
      type: 'images',
    },
  ],
};

const ActivityWithFile = {
  ...ActivityWithGiff,
  ID: 'ActivityWithFile',
  attachments: [
    {
      id: 'file1', fileSize: 750, displayName: 'Normal.doc', mimeType: '', url: '', type: 'file',
    },
  ],
};

const ActivityWithImage = {
  ...ActivityWithGiff,
  ID: 'ActivityWithImage',
  attachments: [
    {
      id: '0000-0000-0001',
      fileSize: 840691,
      displayName: 'Some JPEG',
      mimeType: 'image/jpeg',
      url: 'http://loremflickr.com/800/800/city?36439',
      type: 'images',
    },
  ],
};

const ActivityWithInvalidImage = {
  ...ActivityWithGiff,
  ID: 'ActivityWithInvalidImage',
  attachments: [
    {
      id: '0000-0000-0001',
      fileSize: 840691,
      displayName: 'Some JPEG',
      mimeType: 'image/jpeg',
      url: 'http://loremflickr.com/800/',
      type: 'images',
    },
  ],
};

const ActivityWithReplys = {
  ...ActivityWithGiff,
  attachments: [],
  ID: 'ActivityWithReplys',
  replyIDs: ['activity1', 'activity2'],
};

const moreActivities = {
  activity1: {
    ID: 'activity1',
    roomID: 'room1',
    text: 'I\'m having some issues setting up my environment 💻',
    personID: 'user3',
    created: 'August 1, 2020 10:00:00',
    displayHeader: true,
    cards: null,
    attachments: [],
  },
  activity2: {
    ID: 'activity2',
    roomID: 'room1',
    text: 'Can someone help me troubleshoot?',
    personID: 'user3',
    created: 'August 1, 2020 10:00:00',
    displayHeader: true,
    cards: null,
    attachments: [],
  },
  activity3: {
    ID: 'activity3',
    roomID: 'room1',
    text: 'I ran into the same issue before! Have you checked your OS permissions?\nSometimes that is disabled for the browser and causes the app to not load properly.\nLet me know if you need more help! Maybe we can talk about it during standup',
    personID: 'user2',
    created: 'August 1, 2020 10:05:00',
    displayHeader: true,
    cards: null,
    replyIDs: ['activity3a'],
  },
  activity3a: {
    ID: 'activity3a',
    roomID: 'room1',
    text: 'Thats awesome',
    personID: 'user2',
    created: 'August 1, 2020 12:05:00',
    displayHeader: true,
    cards: null,
    parentID: 'activity3',
  },
  activity4: {
    ID: 'activity4',
    roomID: 'room1',
    text: 'Thanks, Gio! Let\'s talk about it then 👍🏼',
    personID: 'user3',
    created: 'August 1, 2020 10:05:00',
    displayHeader: true,
    cards: null,
    attachments: [],
  },
  activity5: {
    ID: 'activity5',
    roomID: 'room1',
    text: 'Hey guys! I\'m going to skip standup today, not feeling great 🤢',
    personID: 'user4',
    created: 'August 1, 2020 10:08:00',
    displayHeader: true,
    cards: null,
    attachments: [],
  },
  activity6: {
    ID: 'activity6',
    roomID: 'room2',
    text: 'The login page seems to be confusing a lot of people! Let\'s brainstorm some new designs',
    personID: 'user1',
    created: 'August 3, 2020 13:24:00',
    displayHeader: true,
    cards: null,
    attachments: [],
  },
  activity7: {
    ID: 'activity7',
    roomID: 'room2',
    text: 'Got some of the new designs for the login page, will send the Figma links tomorrow',
    personID: 'user5',
    created: 'August 4, 2020 10:19:00',
    displayHeader: true,
    cards: null,
    attachments: [],
  },
  activity8: {
    ID: 'activity8',
    roomID: 'room2',
    text: 'Following up on our last task. Seems like we need more time?',
    personID: 'user1',
    created: 'August 5, 2020 11:08:00',
    displayHeader: true,
    cards: null,
    attachments: [],
  },
  activity10: {
    ID: 'activity10',
    roomID: 'room1',
    text: 'Following up on our last task. Seems like we need more time?',
    personID: 'user1',
    created: 'August 5, 2020 11:08:00',
    displayHeader: true,
    cards: [
      {
        contentType: 'application/vnd.microsoft.card.adaptive',
        content: {
          $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
          type: 'AdaptiveCard',
          version: '1.2',
          body: [
            {
              type: 'TextBlock',
              text: 'Card Header',
              weight: 'Bolder',
              size: 'Medium',
            },
            {
              type: 'TextBlock',
              text: 'Example of simple card',
              wrap: true,
            },
          ],
        },
      },
    ],
    attachments: [],
  },
  activity9: {
    ID: 'activity9',
    roomID: 'room1',
    text: 'Adaptive card activity',
    personID: 'user3',
    created: 'February 1, 2022 13:00:00',
    displayHeader: true,
    cards: [
      {
        $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
        type: 'AdaptiveCard',
        version: '1.2',
        body: [
          {
            type: 'TextBlock',
            text: 'Hotel Booking',
            size: 'large',
          },
          {
            type: 'Container',
            separator: true,
            spacing: 'medium',
            items: [
              {
                type: 'ColumnSet',
                separator: true,
                columns: [
                  {
                    type: 'Column',
                    width: 1,
                    items: [
                      {
                        type: 'Input.Text',
                        id: 'firstName',
                        style: 'text',
                        height: 'auto',
                        isRequired: true,
                        errorMessage: 'First Name is required',
                        label: 'First Name',
                      },
                    ],
                  },
                  {
                    type: 'Column',
                    width: 1,
                    items: [
                      {
                        type: 'Input.Text',
                        id: 'lastName',
                        style: 'text',
                        height: 'auto',
                        isRequired: true,
                        errorMessage: 'Last Name is required',
                        label: 'Last Name',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'Input.Text',
                id: 'myEmail',
                style: 'email',
                height: 'auto',
                isRequired: true,
                errorMessage: 'Email is required',
                label: 'Email',
              },
            ],
          },
          {
            type: 'Input.ChoiceSet',
            id: 'roomType',
            style: 'compact',
            isMultiSelect: false,
            label: 'Room type',
            isRequired: true,
            errorMessage: 'Required input',
            placeholder: 'Please select the room type',
            choices: [
              {
                title: 'Standard Room (1 to 2 People)',
                value: '1',
              },
              {
                title: 'Family Room (1 to 4 Peole)',
                value: '2',
              },
              {
                title: 'Private Room (1 to 3 Peole)',
                value: '3',
              },
            ],
          },
          {
            type: 'Input.Number',
            id: 'numberOfGuests',
            placeholder: 'Please select the number of guests',
            label: 'Number of Guests',
            isRequired: true,
            min: 1,
            max: 10,
            value: 0,
          },
          {
            type: 'ColumnSet',
            columns: [
              {
                type: 'Column',
                width: 1,
                items: [
                  {
                    type: 'Input.Date',
                    id: 'arrivalDate',
                    height: 'auto',
                    isRequired: true,
                    errorMessage: 'Arrival Date is required',
                    label: 'Arrival Date',
                  },
                ],
              },
              {
                type: 'Column',
                width: 1,
                items: [
                  {
                    type: 'Input.Time',
                    id: 'arrivalTime',
                    label: 'Arrival Time',
                    isRequired: true,
                    min: '10:00',
                    max: '23:59',
                    value: '10:00',
                  },
                ],
              },
            ],
          },
          {
            type: 'Input.Date',
            id: 'departureDate',
            height: 'auto',
            isRequired: true,
            errorMessage: 'This is a required input',
            label: 'Departure Date',
          },
          {
            type: 'Input.ChoiceSet',
            id: 'pickUp',
            style: 'expanded',
            spacing: 'medium',
            isMultiSelect: false,
            label: 'Free pickup?',
            isRequired: true,
            errorMessage: 'Pick up option on arrival',
            choices: [
              {
                title: 'Yes Please! - Pick me up on arrival',
                value: '1',
              },
              {
                title: 'No Thanks - I will make my own way there',
                value: '2',
              },
            ],
          },
        ],
        actions: [
          {
            type: 'Action.Submit',
            title: 'Submit',
          },
        ],
      },
    ],
    attachments: [],
    actions: [
      {
        actionID: 'action-activity9-1',
        personID: 'user1',
        roomID: 'room1',
        type: 'submit',
        activityID: 'activity9',
        inputs: {
          firstName: 'Barbara',
          lastName: 'German',
        },
        created: 'February 2, 2022 13:00:00',
      },
      {
        actionID: 'action-activity9-2',
        personID: 'user1',
        roomID: 'room1',
        type: 'submit',
        activityID: 'activity9',
        inputs: {
          firstName: 'Giacomo',
          lastName: 'Edwards',
        },
        created: 'February 1, 2022 14:00:00',
      },
    ],
  },
};

const allActivities = {
  ...activityMap,
  ...moreActivities,
  ActivityWithReplys,
  ActivityWithFile,
  ActivityWithGiff,
  ActivityWithImage,
  ActivityWithInvalidImage,
};

export default allActivities;
