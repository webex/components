import React from 'react';
import AdaptiveCard from './AdaptiveCard';

export default {
  title: 'Messaging/AdaptiveCard',
  component: AdaptiveCard,
};

const Template = (args) => <AdaptiveCard {...args} />;
const exampleAdaptiveCard = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.2',
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
              text: 'Mac, Windows, Web',
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
          horizontalAlignment: 'Left',
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
      horizontalAlignment: 'Left',
      spacing: 'None',
    },
  ],
};

export const Card = Template.bind({});
Card.args = {
  data: exampleAdaptiveCard,
};

const exampleTextBlock = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.2',
  body: [
    {
      type: 'TextBlock',
      text: 'color: default',
      color: 'default',
    },
    {
      type: 'TextBlock',
      text: 'color: accent',
      color: 'accent',
    },
    {
      type: 'TextBlock',
      text: 'color: good',
      color: 'good',
    },
    {
      type: 'TextBlock',
      text: 'color: warning',
      color: 'warning',
    },
    {
      type: 'TextBlock',
      text: 'color: attention',
      color: 'attention',
    },
    {
      type: 'TextBlock',
      text: 'color: light',
      color: 'light',
    },
    {
      type: 'TextBlock',
      text: 'color: dark',
      color: 'dark',
    },
    {
      type: 'TextBlock',
      text: 'Font type not set.',
    },
    {
      type: 'TextBlock',
      text: 'Font type set to *default*.',
      fontType: 'default',
    },
    {
      type: 'TextBlock',
      text: 'Font type set to *monospace*.',
      fontType: 'monospace',
    },
    {
      type: 'TextBlock',
      text: '**horizontalAlignment:left**',
      horizontalAlignment: 'left',
    },
    {
      type: 'TextBlock',
      text: '**horizontalAlignment:center**',
      horizontalAlignment: 'center',
    },
    {
      type: 'TextBlock',
      text: '**horizontalAlignment:right**',
      horizontalAlignment: 'right',
    },
    {
      type: 'TextBlock',
      text: 'isSubtle:false',
      isSubtle: false,
    },
    {
      type: 'TextBlock',
      text: 'isSubtle:true',
      isSubtle: true,
    },
    {
      type: 'TextBlock',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      wrap: true,
      maxLines: 1,
    },
    {
      type: 'TextBlock',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      wrap: true,
      maxLines: 2,
    },
    {
      type: 'TextBlock',
      text: 'size:default',
    },
    {
      type: 'TextBlock',
      text: 'size:small',
      size: 'small',
    },
    {
      type: 'TextBlock',
      text: 'size:default',
      size: 'default',
    },
    {
      type: 'TextBlock',
      text: 'size:medium',
      size: 'medium',
    },
    {
      type: 'TextBlock',
      text: 'size:large',
      size: 'large',
    },
    {
      type: 'TextBlock',
      text: 'size:extraLarge',
      size: 'extraLarge',
    },
    {
      type: 'TextBlock',
      text: 'weight: lighter',
      weight: 'lighter',
    },
    {
      type: 'TextBlock',
      text: 'weight: default',
      weight: 'default',
    },
    {
      type: 'TextBlock',
      text: 'weight: bolder',
      weight: 'bolder',
    },
    {
      type: 'TextBlock',
      text: '**wrap: false** Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      wrap: false,
    },
    {
      type: 'TextBlock',
      text: '**wrap: true** Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      wrap: true,
    },
    {
      type: 'TextBlock',
      text: 'Style set to heading',
      style: 'heading',
      wrap: true,
    },
    {
      type: 'TextBlock',
      text: 'Style set to heading, color set to good',
      style: 'heading',
      color: 'good',
      wrap: true,
    },
    {
      type: 'TextBlock',
      text: 'Style set to default',
      style: 'default',
      wrap: true,
    },
    {
      type: 'TextBlock',
      text: 'Style unset',
      wrap: true,
    },
  ],
};

export const TextBlock = Template.bind({});
TextBlock.args = {
  data: exampleTextBlock,
};
