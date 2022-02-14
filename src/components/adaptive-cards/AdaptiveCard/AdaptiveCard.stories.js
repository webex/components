import React from 'react';
import AdaptiveCard from './AdaptiveCard';

export default {
  title: 'Messaging/AdaptiveCard',
  component: AdaptiveCard,
};

const Template = (args) => (
  <AdaptiveCard
    {...args}
    onSubmit={(inputs) => alert(`Submitted values:\n${JSON.stringify(inputs, null, 4)}`)}
    onInvalidSubmit={(inputs) => alert(`Submitted invalid values:\n${JSON.stringify(inputs, null, 4)}`)}
  />
);

const exampleAdaptiveCard = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.5',
  fallbackText: 'This card requires version **1.5** but your renderer does not support it.',
  body: [
    {
      type: 'ColumnSet',
      columns: [
        {
          type: 'Column',
          items: [
            {
              type: 'Image',
              style: 'Person',
              url: 'https://developer.webex.com/images/webex-teams-logo.png',
              size: 'Medium',
              height: '50px',
            },
          ],
          width: 'auto',
        },
        {
          type: 'Column',
          items: [
            {
              type: 'TextBlock',
              text: 'Cisco Webex Teams',
              weight: 'Lighter',
              color: 'Accent',
            },
            {
              type: 'TextBlock',
              weight: 'Bolder',
              text: 'Buttons and Cards Release',
              horizontalAlignment: 'Left',
              wrap: true,
              color: 'Light',
              size: 'Large',
              spacing: 'Small',
            },
          ],
          width: 'stretch',
        },
      ],
    },
    {
      type: 'ColumnSet',
      columns: [
        {
          type: 'Column',
          width: 35,
          items: [
            {
              type: 'TextBlock',
              text: 'Release Date:',
              color: 'Light',
            },
            {
              type: 'TextBlock',
              text: 'Product:',
              weight: 'Lighter',
              color: 'Light',
              spacing: 'Small',
            },
            {
              type: 'TextBlock',
              text: 'OS:',
              weight: 'Lighter',
              color: 'Light',
              spacing: 'Small',
            },
          ],
        },
        {
          type: 'Column',
          width: 65,
          items: [
            {
              type: 'TextBlock',
              text: 'Aug 6, 2019',
              color: 'Light',
            },
            {
              type: 'TextBlock',
              text: 'Webex Teams',
              color: 'Light',
              weight: 'Lighter',
              spacing: 'Small',
            },
            {
              type: 'TextBlock',
              // eslint-disable-next-line no-template-curly-in-string
              text: '${supportedOS}',
              weight: 'Lighter',
              color: 'Light',
              spacing: 'Small',
            },
          ],
        },
      ],
      spacing: 'Padding',
      horizontalAlignment: 'Center',
    },
    {
      type: 'TextBlock',
      text: 'We\'re making it easier for you to interact with bots and integrations in Webex Teams. When your bot sends information in a space that includes a card with buttons, you can now easily interact with it.',
      wrap: true,
    },
    {
      type: 'TextBlock',
      text: 'Buttons and Cards Resources:',
    },
    {
      type: 'ColumnSet',
      columns: [
        {
          type: 'Column',
          width: 'auto',
          items: [
            {
              type: 'Image',
              altText: '',
              url: 'https://developer.webex.com/images/link-icon.png',
              size: 'Small',
              width: '30px',
            },
          ],
          spacing: 'Small',
        },
        {
          type: 'Column',
          width: 'auto',
          items: [
            {
              type: 'TextBlock',
              text: '[Developer Portal Buttons and Cards Guide]()',
              horizontalAlignment: 'Left',
              size: 'Medium',
            },
          ],
          verticalContentAlignment: 'Center',
          spacing: 'Small',
        },
      ],
    },
    {
      type: 'ActionSet',
      actions: [
        {
          type: 'Action.Submit',
          title: 'Subscribe to Release Notes',
          data: {
            subscribe: true,
          },
        },
      ],
      spacing: 'None',
    },
  ],
};

export const Card = Template.bind({});
Card.args = {
  template: exampleAdaptiveCard,
  context: {
    supportedOS: 'Mac, Windows, Web',
  },
};
