import React from 'react';
import AdaptiveCard from '../AdaptiveCard';

export default {
  title: 'Messaging/AdaptiveCard/Actions',
  component: AdaptiveCard,
};

const Template = (args) => (
  <AdaptiveCard
    {...args}
    onSubmit={(inputs) => alert(`Submitted values:\n${JSON.stringify(inputs, null, 4)}`)}
    onInvalidSubmit={(inputs) => alert(`Submitted invalid values:\n${JSON.stringify(inputs, null, 4)}`)}
  />
);

const exampleActionOpenUrl = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.0',
  body: [
    {
      type: 'TextBlock',
      text: 'The action of these cards will open a URL',
    },
  ],
  actions: [
    {
      type: 'Action.OpenUrl',
      title: 'Open url',
      url: 'https://adaptivecards.io',
    },
    {
      type: 'Action.OpenUrl',
      title: 'Action.OpenUrl',
      url: 'https://adaptivecards.io',
      iconUrl: 'https://developer.webex.com/images/webex-teams-logo.png',
      style: 'positive',
    },
    {
      type: 'Action.OpenUrl',
      title: 'Open url',
      url: 'https://adaptivecards.io',
      style: 'destructive',
    },
    {
      type: 'Action.OpenUrl',
      title: 'Open url',
      url: 'https://adaptivecards.io',
      isEnabled: false,
    },
  ],
};

const exampleActionShowCard = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.0',
  body: [
    {
      type: 'TextBlock',
      text: 'This card\'s action will show another card',
    },
  ],
  actions: [
    {
      type: 'Action.ShowCard',
      title: 'Show another card 1',
      card: {
        type: 'AdaptiveCard',
        body: [
          {
            type: 'TextBlock',
            text: 'Card 1: What do you think?',
          },
        ],
        actions: [
          {
            type: 'Action.Submit',
            title: 'Neat!',
          },
        ],
      },
    },
    {
      type: 'Action.ShowCard',
      title: 'Show another card 2',
      card: {
        type: 'AdaptiveCard',
        body: [
          {
            type: 'TextBlock',
            text: 'Card 2: What do you think?',
          },
        ],
        actions: [
          {
            type: 'Action.Submit',
            title: 'Neat!',
          },
        ],
      },
    },
  ],
};

const exampleActionSubmit = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.0',
  body: [
    {
      type: 'TextBlock',
      text: 'Present a form and submit it back to the originator',
    },
    {
      type: 'Input.Text',
      id: 'firstName',
      placeholder: 'What is your first name?',
      isRequired: true,
      errorMessage: 'FirstName is required',
    },
    {
      type: 'Input.Text',
      id: 'lastName',
      placeholder: 'What is your last name?',
    },
    {
      type: 'Input.Number',
      id: 'review',
      placeholder: 'Enter a number between 1 and 10',
      min: 1,
      max: 10,
      value: 3,
    },
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'Action.Submit',
      data: {
        x: 13,
        y: 12,
      },
    },
  ],
};

const exampleActionToggleVisibility = {
  type: 'AdaptiveCard',
  version: '1.2',
  body: [
    {
      type: 'TextBlock',
      text: 'Press the buttons to toggle the images!',
      wrap: true,
    },
    {
      type: 'TextBlock',
      text: 'Here are some images:',
      isVisible: false,
      id: 'textToToggle',
    },
    {
      type: 'ColumnSet',
      columns: [
        {
          type: 'Column',
          items: [
            {
              style: 'person',
              type: 'Image',
              url: 'https://picsum.photos/100/100?image=112',
              isVisible: false,
              id: 'imageToToggle',
              altText: 'sample image 1',
              size: 'medium',
            },
          ],
        },
        {
          type: 'Column',
          items: [
            {
              type: 'Image',
              url: 'https://picsum.photos/100/100?image=123',
              isVisible: false,
              id: 'imageToToggle2',
              altText: 'sample image 2',
              size: 'medium',
            },
          ],
        },
      ],
    },
  ],
  actions: [
    {
      type: 'Action.ToggleVisibility',
      title: 'Toggle!',
      targetElements: [
        'textToToggle',
        'imageToToggle',
        'imageToToggle2',
      ],
    },
    {
      type: 'Action.ToggleVisibility',
      title: 'Show!',
      targetElements: [
        {
          elementId: 'textToToggle',
          isVisible: true,
        },
        {
          elementId: 'imageToToggle',
          isVisible: true,
        },
        {
          elementId: 'imageToToggle2',
          isVisible: true,
        },
      ],
    },
    {
      type: 'Action.ToggleVisibility',
      title: 'Hide!',
      targetElements: [
        {
          elementId: 'textToToggle',
          isVisible: false,
        },
        {
          elementId: 'imageToToggle',
          isVisible: false,
        },
        {
          elementId: 'imageToToggle2',
          isVisible: false,
        },
      ],
    },
  ],
};

export const ActionOpenURL = Template.bind({});
ActionOpenURL.args = {
  template: exampleActionOpenUrl,
};

export const ActionShowCard = Template.bind({});
ActionShowCard.args = {
  template: exampleActionShowCard,
};

export const ActionSubmit = Template.bind({});
ActionSubmit.args = {
  template: exampleActionSubmit,
};

export const ActionToggleVisibility = Template.bind({});
ActionToggleVisibility.args = {
  template: exampleActionToggleVisibility,
};
