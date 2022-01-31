import React from 'react';
import AdaptiveCard from './AdaptiveCard';

export default {
  title: 'Messaging/AdaptiveCard',
  component: AdaptiveCard,
};

const Template = (args) => <AdaptiveCard {...args} onSubmit={(inputs) => alert(`Submitted values:\n${JSON.stringify(inputs, null, 4)}`)} />;

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

const exampleColumn = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.0',
  body: [
    {
      type: 'ColumnSet',
      columns: [
        {
          type: 'Column',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 1',
            },
            {
              type: 'Image',
              url: 'https://adaptivecards.io/content/cats/1.png',
            },
          ],
        },
        {
          type: 'Column',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 2',
            },
            {
              type: 'Image',
              url: 'https://adaptivecards.io/content/cats/1.png',
            },
          ],
        },
        {
          type: 'Column',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 3',
            },
            {
              type: 'Image',
              url: 'https://adaptivecards.io/content/cats/1.png',
            },
          ],
        },
      ],
    },
    {
      type: 'ColumnSet',
      columns: [
        {
          type: 'Column',
          minHeight: '50px',
          backgroundImage: 'https://adaptivecards.io/content/AlkiBeach.jpg',
          width: 'auto',
        },
        {
          type: 'Column',
          minHeight: '50px',
          backgroundImage: {
            url: 'https://adaptivecards.io/content/GoldenGardensPark.jpg',
            verticalAlignment: 'center',
          },
          width: 'stretch',
        },
        {
          type: 'Column',
          minHeight: '50px',
          backgroundImage: 'https://adaptivecards.io/content/BainbridgeIsland.jpg',
          width: 'auto',
        },
      ],
    },
    {
      type: 'TextBlock',
      text: 'You can even repeat the background image...',
    },
    {
      type: 'ColumnSet',
      columns: [
        {
          type: 'Column',
          minHeight: '50px',
          backgroundImage: {
            url: 'https://adaptivecards.io/content/uparrow.png',
            fillMode: 'repeat',
          },
          width: 'stretch',
        },
        {
          type: 'Column',
          horizontalAlignment: 'Center',
          verticalContentAlignment: 'Center',
          items: [
            {
              type: 'TextBlock',
              horizontalAlignment: 'Center',
              text: 'Those are some neat arrows',
              wrap: true,
            },
          ],
          width: 'stretch',
        },
      ],
    },
    {
      type: 'TextBlock',
      text: 'Horizontal repeat...',
    },
    {
      type: 'ColumnSet',
      columns: [
        {
          type: 'Column',
          minHeight: '50px',
          backgroundImage: {
            url: 'https://adaptivecards.io/content/downarrow.png',
            fillMode: 'repeatHorizontally',
          },
          width: 'stretch',
        },
        {
          type: 'Column',
          minHeight: '50px',
          backgroundImage: {
            url: 'https://adaptivecards.io/content/uparrow.png',
            fillMode: 'repeatHorizontally',
            verticalAlignment: 'center',
          },
          width: 'stretch',
        },
        {
          type: 'Column',
          minHeight: '50px',
          backgroundImage: {
            url: 'https://adaptivecards.io/content/uparrow.png',
            fillMode: 'repeatHorizontally',
            verticalAlignment: 'bottom',
          },
          width: 'stretch',
        },
      ],
    },
    {
      type: 'TextBlock',
      text: 'Vertical repeat...',
    },
    {
      type: 'ColumnSet',
      columns: [
        {
          type: 'Column',
          minHeight: '50px',
          backgroundImage: {
            url: 'https://adaptivecards.io/content/uparrow.png',
            fillMode: 'repeatVertically',
          },
          width: 'stretch',
        },
        {
          type: 'Column',
          minHeight: '50px',
          backgroundImage: {
            url: 'https://adaptivecards.io/content/downarrow.png',
            fillMode: 'repeatVertically',
            horizontalAlignment: 'center',
          },
          width: 'stretch',
        },
        {
          type: 'Column',
          minHeight: '50px',
          backgroundImage: {
            url: 'https://adaptivecards.io/content/uparrow.png',
            fillMode: 'repeatVertically',
            horizontalAlignment: 'right',
          },
          width: 'stretch',
        },
      ],
    },
    {
      type: 'TextBlock',
      text: 'Bleed left',
    },
    {
      type: 'ColumnSet',
      style: 'emphasis',
      columns: [
        {
          type: 'Column',
          style: 'good',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 1',
            },
          ],
          bleed: true,
          width: 'stretch',
        },
        {
          type: 'Column',
          style: 'attention',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 2',
            },
          ],
          width: 'stretch',
        },
        {
          type: 'Column',
          style: 'warning',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 3',
            },
          ],
          width: 'stretch',
        },
      ],
    },
    {
      type: 'TextBlock',
      text: 'Bleed center',
    },
    {
      type: 'ColumnSet',
      style: 'emphasis',
      columns: [
        {
          type: 'Column',
          style: 'good',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 1',
            },
          ],
          width: 'stretch',
        },
        {
          type: 'Column',
          style: 'attention',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 2',
            },
          ],
          bleed: true,
          width: 'stretch',
        },
        {
          type: 'Column',
          style: 'warning',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 3',
            },
          ],
          width: 'stretch',
        },
      ],
    },
    {
      type: 'TextBlock',
      text: 'Bleed right',
    },
    {
      type: 'ColumnSet',
      style: 'emphasis',
      columns: [
        {
          type: 'Column',
          style: 'good',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 1',
            },
          ],
          width: 'stretch',
        },
        {
          type: 'Column',
          style: 'attention',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 2',
            },
          ],
          width: 'stretch',
        },
        {
          type: 'Column',
          style: 'warning',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 3',
            },
          ],
          bleed: true,
          width: 'stretch',
        },
      ],
    },
    {
      type: 'TextBlock',
      text: 'Bleed all',
    },
    {
      type: 'ColumnSet',
      style: 'emphasis',
      columns: [
        {
          type: 'Column',
          style: 'good',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 1',
            },
          ],
          bleed: true,
          width: 'stretch',
        },
        {
          type: 'Column',
          style: 'attention',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 2',
            },
          ],
          bleed: true,
          width: 'stretch',
        },
        {
          type: 'Column',
          style: 'warning',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 3',
            },
          ],
          bleed: true,
          width: 'stretch',
        },
      ],
    },
    {
      type: 'ColumnSet',
      columns: [
        {
          type: 'Column',
          items: [
            {
              type: 'Graph',
            },
          ],
          fallback: {
            type: 'Column',
            items: [
              {
                type: 'TextBlock',
                text: 'Fallback',
              },
            ],
          },
          width: 'auto',
        },
        {
          type: 'Column',
          items: [
            {
              type: 'Graph',
            },
          ],
          fallback: 'drop',
        },
        {
          type: 'Column',
          items: [
            {
              type: 'TextBlock',
              text: 'This is a column',
              wrap: true,
            },
          ],
        },
      ],
    },
    {
      type: 'ColumnSet',
      style: 'emphasis',
      minHeight: '100px',
      columns: [
        {
          type: 'Column',
          style: 'default',
          minHeight: '200px',
          items: [
            {
              type: 'TextBlock',
              wrap: true,
              text: 'The columnset has a minHeight of 100px while this column has a minHeight of 200px so it should override',
            },
          ],
        },
        {
          type: 'Column',
          style: 'default',
          minHeight: '50px',
          items: [
            {
              type: 'FactSet',
              facts: [
                {
                  title: 'ColumnSet',
                  value: 'MinHeight: 100px',
                },
                {
                  title: 'Column 1',
                  value: 'MinHeight: 200px',
                },
                {
                  title: 'Column 2',
                  value: 'MinHeight: 50px',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'TextBlock',
      text: 'The middle column is set to rtl',
      wrap: true,
      size: 'Medium',
    },
    {
      type: 'ColumnSet',
      columns: [
        {
          type: 'Column',
          items: [
            {
              type: 'TextBlock',
              text: 'Column One',
              wrap: true,
            },
          ],
        },
        {
          type: 'Column',
          rtl: true,
          items: [
            {
              type: 'TextBlock',
              text: 'العمود الثاني',
              wrap: true,
            },
          ],
        },
        {
          type: 'Column',
          items: [
            {
              type: 'TextBlock',
              wrap: true,
              text: 'Column three',
            },
          ],
        },
      ],
      spacing: 'Medium',
    },
    {
      type: 'Container',
      items: [
        {
          type: 'ColumnSet',
          columns: [
            {
              type: 'Column',
              width: 'auto',
              items: [
                {
                  type: 'Image',
                  url: 'https://adaptivecards.io/content/cats/3.png',
                  size: 'medium',
                },
                {
                  type: 'TextBlock',
                  text: 'SHADES',
                  horizontalAlignment: 'center',
                  weight: 'bolder',
                },
              ],
            },
            {
              type: 'Column',
              width: 'stretch',
              separator: true,
              spacing: 'medium',
              items: [
                {
                  type: 'TextBlock',
                  text: 'Dec 4',
                  horizontalAlignment: 'center',
                },
                {
                  type: 'TextBlock',
                  text: 'Final',
                  spacing: 'none',
                  horizontalAlignment: 'center',
                },
                {
                  type: 'TextBlock',
                  text: '7 - 40',
                  size: 'extraLarge',
                  horizontalAlignment: 'center',
                },
              ],
            },
            {
              type: 'Column',
              width: 'auto',
              separator: true,
              spacing: 'medium',
              items: [
                {
                  type: 'Image',
                  url: 'https://adaptivecards.io/content/cats/2.png',
                  size: 'medium',
                  horizontalAlignment: 'center',
                },
                {
                  type: 'TextBlock',
                  text: 'SKINS',
                  horizontalAlignment: 'center',
                  weight: 'bolder',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'TextBlock',
      text: 'Try clicking a column!',
      weight: 'bolder',
    },
    {
      type: 'ColumnSet',
      columns: [
        {
          type: 'Column',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 1',
            },
            {
              type: 'Image',
              url: 'https://adaptivecards.io/content/cats/1.png',
            },
          ],
          selectAction: {
            type: 'Action.OpenUrl',
            tooltip: 'cool link',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },
        },
        {
          type: 'Column',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 2',
            },
            {
              type: 'Image',
              url: 'https://adaptivecards.io/content/cats/1.png',
            },
          ],
          selectAction: {
            type: 'Action.OpenUrl',
            tooltip: 'cool link',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },
        },
        {
          type: 'Column',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 3',
            },
            {
              type: 'Image',
              url: 'https://adaptivecards.io/content/cats/1.png',
            },
          ],
          selectAction: {
            type: 'Action.OpenUrl',
            tooltip: 'cool link',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },
        },
      ],
    },
    {
      type: 'ColumnSet',
      columns: [
        {
          type: 'Column',
          items: [
            {
              type: 'TextBlock',
              text: 'No Style',
            },
          ],
        },
        {
          type: 'Column',
          style: 'default',
          items: [
            {
              type: 'TextBlock',
              text: 'Default Style',
            },
          ],
        },
        {
          type: 'Column',
          style: 'emphasis',
          items: [
            {
              type: 'TextBlock',
              text: 'Emphasis Style',
            },
            {
              type: 'Container',
              items: [
                {
                  type: 'TextBlock',
                  text: 'Container no style',
                },
              ],
            },
            {
              type: 'Container',
              style: 'default',
              items: [
                {
                  type: 'TextBlock',
                  text: 'Container default style',
                },
              ],
            },
            {
              type: 'Container',
              style: 'emphasis',
              items: [
                {
                  type: 'TextBlock',
                  text: 'Container emphasis style',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'TextBlock',
      text: 'Hi,',
    },
    {
      type: 'TextBlock',
      text: 'MasterHip',
      isSubtle: true,
    },
    {
      type: 'ColumnSet',
      height: 'stretch',
      columns: [
        {
          type: 'Column',
          verticalContentAlignment: 'bottom',
          items: [
            {
              type: 'TextBlock',
              text: 'Column 1',
            },
          ],
        },
      ],
    },
    {
      type: 'ColumnSet',
      columns: [
        {
          type: 'Column',
          width: 'auto',
          items: [
            {
              type: 'TextBlock',
              text: '(auto)',
            },
            {
              type: 'Image',
              url: 'https://adaptivecards.io/content/adaptive-card-50.png',
            },
          ],
        },
        {
          type: 'Column',
          width: 'stretch',
          items: [
            {
              type: 'TextBlock',
              horizontalAlignment: 'center',
              text: '(stretch)',
            },
            {
              type: 'Image',
              horizontalAlignment: 'center',
              url: 'https://adaptivecards.io/content/adaptive-card-50.png',
            },
          ],
        },
        {
          type: 'Column',
          width: 'auto',
          items: [
            {
              type: 'TextBlock',
              text: '(auto)',
            },
            {
              type: 'Image',
              url: 'https://adaptivecards.io/content/adaptive-card-50.png',
            },
          ],
        },
      ],
    },
  ],
};

const exampleContainer = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.2',
  body: [
    {
      type: 'Container',
      items: [
        {
          type: 'TextBlock',
          text: 'This is some text',
        },
        {
          type: 'Image',
          url: 'https://adaptivecards.io/content/cats/1.png',
          size: 'large',
        },
      ],
      minHeight: '15rem',
    },
    {
      type: 'Container',
      style: 'default',
      items: [
        {
          type: 'TextBlock',
          text: 'This container has the default style',
        },
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
      ],
    },
    {
      type: 'Container',
      style: 'accent',
      items: [
        {
          type: 'TextBlock',
          text: 'This container has the accent style',
        },
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
          type: 'Container',
          items: [
            {
              type: 'TextBlock',
              text: 'Contained container - no style',
              color: 'dark',
            },
          ],
        },
        {
          type: 'Container',
          style: 'emphasis',
          items: [
            {
              type: 'TextBlock',
              text: 'Contained container - emphasis',
              color: 'dark',
            },
          ],
        },
        {
          type: 'Container',
          style: 'default',
          items: [
            {
              type: 'TextBlock',
              text: 'Contained container - default',
              color: 'dark',
            },
          ],
        },
        {
          type: 'Container',
          style: 'good',
          items: [
            {
              type: 'TextBlock',
              text: 'Contained container - good',
              color: 'dark',
            },
          ],
        },
        {
          type: 'Container',
          style: 'warning',
          items: [
            {
              type: 'TextBlock',
              text: 'Contained container - warning',
              color: 'dark',
            },
          ],
        },
        {
          type: 'Container',
          style: 'attention',
          items: [
            {
              type: 'TextBlock',
              text: 'Contained container - attention',
              color: 'dark',
            },
          ],
        },
        {
          type: 'Container',
          style: 'accent',
          items: [
            {
              type: 'TextBlock',
              text: 'Contained container - accent',
              color: 'dark',
            },
          ],
        },
      ],
    },
    {
      type: 'Container',
      minHeight: '150px',
      backgroundImage: 'https://adaptivecards.io/content/AlkiBeach.jpg',
      items: [
        {
          type: 'TextBlock',
          text: 'What a beautiful background',
        },
      ],
    },
    {
      type: 'TextBlock',
      text: 'They can even repeat a bunch of different ways...',
    },
    {
      type: 'Container',
      minHeight: '100px',
      backgroundImage: {
        url: 'https://adaptivecards.io/content/uparrow.png',
        fillMode: 'repeat',
      },
    },
    {
      type: 'Container',
      minHeight: '40px',
      backgroundImage: {
        url: 'https://adaptivecards.io/content/uparrow.png',
        fillMode: 'repeatHorizontally',
        verticalAlignment: 'center',
      },
    },
    {
      type: 'Container',
      minHeight: '100px',
      backgroundImage: {
        url: 'https://adaptivecards.io/content/uparrow.png',
        fillMode: 'repeatVertically',
        horizontalAlignment: 'center',
      },
    },
  ],
};

const exampleImageSet = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.2',
  body: [
    {
      type: 'ImageSet',
      imageSize: 'medium',
      images: [
        {
          type: 'Image',
          url: 'https://adaptivecards.io/content/cats/1.png',
          size: 'large',
          backgroundColor: 'red',
          style: 'person',
        },
        {
          type: 'Image',
          url: 'https://adaptivecards.io/content/cats/3.png',
        },
        {
          type: 'Image',
          url: 'https://adaptivecards.io/content/cats/1.png',
          size: 'small',
        },
        {
          type: 'Image',
          url: 'https://adaptivecards.io/content/cats/1.png',
          backgroundColor: '#cdcdcd',
          width: '60px',
          height: '60px',
        },
        {
          type: 'Image',
          url: 'https://adaptivecards.io/content/cats/2.png',
        },
      ],
    },
  ],
};

const exampleImage = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.2',
  body: [
    {
      type: 'Image',
      url: 'https://adaptivecards.io/content/cats/1.png',
      backgroundColor: 'blue',
      size: 'medium',
      style: 'person',
    },
    {
      type: 'Image',
      url: 'https://adaptivecards.io/content/cats/1.png',
      width: '60px',
      height: '60px',
      size: 'small',
    },
    {
      type: 'Image',
      backgroundColor: '#cdcdcd',
      url: 'https://adaptivecards.io/content/cats/2.png',
      size: 'large',
    },
    {
      type: 'Image',
      url: 'https://adaptivecards.io/content/cats/3.png',
    },
  ],
};

const exampleColumnSet = {
  type: 'AdaptiveCard',
  version: '1.0',
  body: [
    {
      type: 'TextBlock',
      text: 'Pick up where you left off?',
      weight: 'bolder',
    },
    {
      type: 'ColumnSet',
      spacing: 'medium',
      columns: [
        {
          type: 'Column',
          width: 'auto',
          items: [
            {
              type: 'Image',
              url: 'https://unsplash.it/80?image=1083',
              size: 'medium',
            },
          ],
        },
        {
          type: 'Column',
          width: 4,
          items: [
            {
              type: 'TextBlock',
              text: 'Silver Star Mountain',
            },
            {
              type: 'TextBlock',
              text: 'Maps',
              isSubtle: true,
              spacing: 'none',
            },
          ],
        },
      ],
      selectAction: {
        type: 'Action.OpenUrl',
        url: 'https://www.msn.com',
        tooltip: 'View a map of Silver Star Mountain',
      },
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
              url: 'https://unsplash.it/80?image=1082',
              size: 'medium',
            },
          ],
        },
        {
          type: 'Column',
          width: 4,
          style: 'emphasis',
          items: [
            {
              type: 'TextBlock',
              text: 'Kitchen Remodel',
            },
            {
              type: 'TextBlock',
              text: 'With EMPHASIS',
              isSubtle: true,
              spacing: 'none',
            },
          ],
        },
      ],
      selectAction: {
        type: 'Action.OpenUrl',
        url: 'https://www.AdaptiveCards.io',
        tooltip: 'Remodel your kitchen with our new cabinet styles!',
      },
    },
    {
      type: 'ColumnSet',
      bleed: false,
      columns: [
        {
          type: 'Column',
          width: 'auto',
          items: [
            {
              type: 'Image',
              url: 'https://unsplash.it/80?image=1080',
              size: 'medium',
            },
          ],
        },
        {
          type: 'Column',
          width: 4,
          items: [
            {
              type: 'TextBlock',
              text: 'The Witcher',
            },
            {
              type: 'TextBlock',
              text: 'Netflix',
              isSubtle: true,
              spacing: 'none',
            },
          ],
        },
      ],
      selectAction: {
        type: 'Action.OpenUrl',
        url: 'https://www.outlook.com',
        tooltip: 'Watch the newest episode today!',
      },
    },
  ],
  actions: [
    {
      type: 'Action.OpenUrl',
      title: 'Resume all',
      url: 'ms-cortana:resume-all',
    },
    {
      type: 'Action.OpenUrl',
      title: 'More activities',
      url: 'ms-cortana:more-activities',
    },
  ],
};

const exampleRichTextBlock = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.2',
  body: [
    {
      type: 'RichTextBlock',
      inlines: [
        'This is the first inline. ',
        {
          type: 'TextRun',
          text: 'We support colors,',
          color: 'good',
        },
        {
          type: 'TextRun',
          text: ' both regular and subtle. ',
          isSubtle: true,
        },
        {
          type: 'TextRun',
          text: 'Text ',
          size: 'small',
        },
        {
          type: 'TextRun',
          text: 'of ',
          size: 'medium',
        },
        {
          type: 'TextRun',
          text: 'all ',
          size: 'large',
        },
        {
          type: 'TextRun',
          text: 'sizes! ',
          size: 'extraLarge',
        },
        {
          type: 'TextRun',
          text: 'Light weight text. ',
          weight: 'lighter',
        },
        {
          type: 'TextRun',
          text: 'Bold weight text. ',
          weight: 'bolder',
        },
        {
          type: 'TextRun',
          text: 'Highlights. ',
          highlight: true,
        },
        {
          type: 'TextRun',
          text: 'Italics. ',
          italic: true,
        },
        {
          type: 'TextRun',
          text: 'Strikethrough. ',
          strikethrough: true,
        },
        {
          type: 'TextRun',
          text: 'Monospace too!',
          fontType: 'monospace',
        },
      ],
    },
    {
      type: 'RichTextBlock',
      inlines: [
        {
          type: 'TextRun',
          text: 'Date-Time parsing: {{DATE(2017-02-14T06:08:39Z,LONG)}} {{TIME(2017-02-14T06:08:39Z)}}',
        },
      ],
    },
    {
      type: 'RichTextBlock',
      horizontalAlignment: 'center',
      inlines: [
        {
          type: 'TextRun',
          text: 'Rich text blocks also support center alignment. Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor ',
        },
      ],
    },
    {
      type: 'RichTextBlock',
      horizontalAlignment: 'right',
      inlines: [
        {
          type: 'TextRun',
          text: 'Rich text blocks also support right alignment. Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor ',
        },
      ],
    },
    {
      type: 'RichTextBlock',
      inlines: [],
    },
  ],
};

const exampleFactSet = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.0',
  body: [
    {
      type: 'FactSet',
      facts: [
        {
          title: 'Fact 1',
          value: 'Value 1',
        },
        {
          title: 'Fact 2',
          value: 'Value 2',
        },
        {
          title: 'Fact 3',
          value: 'Value 3',
        },
        {
          title: 'Fact 4',
          value: 'Value 5',
        },
      ],
    },
  ],
};

const exampleActionSet = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.0',
  body: [
    {
      type: 'TextBlock',
      wrap: true,
      text: 'Cards can have action sets in the middle of their body.',
    },
    {
      type: 'ActionSet',
      actions: [
        {
          type: 'Action.ShowCard',
          title: 'ShowCard',
          card: {
            type: 'AdaptiveCard',
            body: [
              {
                type: 'TextBlock',
                text: 'This is a show card',
              },
            ],
          },
        },
        {
          type: 'Action.OpenUrl',
          title: 'OpenUrl',
          url: 'https://adaptivecards.io',
        },
      ],
    },
    {
      type: 'TextBlock',
      wrap: true,
      text: 'There are also still actions\'s at the bottom of the card',
    },
  ],
  actions: [
    {
      type: 'Action.ShowCard',
      title: 'ShowCard',
      card: {
        type: 'AdaptiveCard',
        body: [
          {
            type: 'TextBlock',
            text: 'This is a show card',
          },
        ],
      },
    },
    {
      type: 'Action.OpenUrl',
      title: 'OpenUrl',
      url: 'https://adaptivecards.io',
    },
  ],
};

const exampleInputText = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.0',
  body: [
    {
      type: 'TextBlock',
      text: 'Specify the type of text being requested:',
      style: 'heading',
    },
    {
      type: 'Input.Text',
      id: 'myComment',
      style: 'text',
      height: 'auto',
      isRequired: true,
      errorMessage: 'This is a required input',
    },
    {
      type: 'Input.Text',
      id: 'myEmail',
      label: 'style: email',
      style: 'email',
      errorMessage: 'This is a required input',
    },
    {
      type: 'Input.Text',
      id: 'myTel',
      label: 'style: tel',
      style: 'tel',
      height: 'stretch',
    },
    {
      type: 'Input.Text',
      id: 'myUrl',
      label: 'style: url',
      style: 'url',
    },
    {
      type: 'Input.Text',
      id: 'myPassword',
      label: 'style: password',
      style: 'password',
    },
    {
      type: 'TextBlock',
      text: 'Multiline text input:',
    },
    {
      type: 'Input.Text',
      id: 'multilineInputId',
      placeholder: 'enter comment',
      maxLength: 500,
      isMultiline: true,
    },
    {
      type: 'TextBlock',
      text: 'Pre-filled value:',
    },
    {
      type: 'Input.Text',
      id: 'prefilledInputId',
      placeholder: 'enter comment',
      maxLength: 500,
      isMultiline: true,
      value: 'This value was pre-filled',
    },
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'OK',
    },
  ],
};

const exampleInputTime = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.0',
  body: [
    {
      type: 'Input.Time',
      id: 'timeValueSet',
      label: 'Start time',
      min: '10:00',
      max: '18:00',
      value: '12:43',
    },
    {
      type: 'Input.Time',
      id: 'timeValueUnset',
      label: 'End time',
      isRequired: 'true',
      errorMessage: 'This input is required',
    },
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'OK',
    },
  ],
};

const exampleInputNumber = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.0',
  body: [
    {
      type: 'Input.Number',
      id: 'number',
      placeholder: 'Enter a number',
      label: 'Test',
      min: 1,
      max: 10,
      value: 3,
    },
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'OK',
    },
  ],
};

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

const exampleInputChoiceSet = {
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.0',
  body: [
    {
      type: 'Input.ChoiceSet',
      id: 'input1',
      style: 'compact',
      isMultiSelect: false,
      label: 'Default Input.ChoiceSet label (compact)',
      placeholder: 'Please make a selection',
      choices: [
        {
          title: 'Option 1',
          value: '1',
        },
        {
          title: 'Option 2',
          value: '2',
        },
      ],
    },
    {
      type: 'Input.ChoiceSet',
      id: 'input2',
      style: 'compact',
      isMultiSelect: false,
      label: 'Required Input.ChoiceSet label (compact)',
      isRequired: true,
      errorMessage: 'Required input',
      placeholder: 'Please make a selection',
      value: '1',
      choices: [
        {
          title: 'Option 1',
          value: '1',
        },
        {
          title: 'Option 2',
          value: '2',
        },
      ],
    },
    {
      type: 'Input.ChoiceSet',
      id: 'input3',
      style: 'expanded',
      isMultiSelect: false,
      label: 'Default Input.ChoiceSet label (expanded)',
      value: '2',
      choices: [
        {
          title: 'Option 1',
          value: '1',
        },
        {
          title: 'Option 2',
          value: '2',
        },
      ],
    },
    {
      type: 'Input.ChoiceSet',
      id: 'input4',
      style: 'expanded',
      isMultiSelect: false,
      label: 'Required Input.ChoiceSet label (expanded)',
      isRequired: true,
      errorMessage: 'Required input',
      choices: [
        {
          title: 'Option 1',
          value: '1',
        },
        {
          title: 'Option 2',
          value: '2',
        },
      ],
    },
    {
      type: 'Input.ChoiceSet',
      id: 'input5',
      style: 'expanded',
      isMultiSelect: true,
      label: 'Default Input.ChoiceSet label (expanded, multiselect)',
      choices: [
        {
          title: 'Option 1',
          value: '1',
        },
        {
          title: 'Option 2',
          value: '2',
        },
      ],
    },
    {
      type: 'Input.ChoiceSet',
      id: 'input6',
      style: 'compact',
      isMultiSelect: true,
      isRequired: true,
      value: '1,3',
      label: 'Required Input.ChoiceSet label (compact, multiselect)',
      errorMessage: 'Required input',
      choices: [
        {
          title: 'Option 1',
          value: '1',
        },
        {
          title: 'Option 2',
          value: '2',
        },
        {
          title: 'Option 3',
          value: '3',
        },
      ],
    },
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'OK',
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

export const Card = Template.bind({});
Card.args = {
  template: exampleAdaptiveCard,
  context: {
    supportedOS: 'Mac, Windows, Web',
  },
};

export const TextBlock = Template.bind({});
TextBlock.args = {
  template: exampleTextBlock,
};

export const Column = Template.bind({});
Column.args = {
  template: exampleColumn,
};

export const Container = Template.bind({});
Container.args = {
  template: exampleContainer,
};

export const ImageSet = Template.bind({});
ImageSet.args = {
  template: exampleImageSet,
};

export const Image = Template.bind({});
Image.args = {
  template: exampleImage,
};

export const ColumnSet = Template.bind({});
ColumnSet.args = {
  template: exampleColumnSet,
};

export const RichTextBlock = Template.bind({});
RichTextBlock.args = {
  template: exampleRichTextBlock,
};

export const FactSet = Template.bind({});
FactSet.args = {
  template: exampleFactSet,
};

export const ActionSet = Template.bind({});
ActionSet.args = {
  template: exampleActionSet,
};

export const InputNumber = Template.bind({});
InputNumber.args = {
  template: exampleInputNumber,
};

export const InputText = Template.bind({});
InputText.args = {
  template: exampleInputText,
};

export const InputTime = Template.bind({});
InputTime.args = {
  template: exampleInputTime,
};

export const ActionOpenURL = Template.bind({});
ActionOpenURL.args = {
  template: exampleActionOpenUrl,
};

export const ActionShowCard = Template.bind({});
ActionShowCard.args = {
  template: exampleActionShowCard,
};

export const ActionToggleVisibility = Template.bind({});
ActionToggleVisibility.args = {
  template: exampleActionToggleVisibility,
};

export const InputChoiceSet = Template.bind({});
InputChoiceSet.args = {
  template: exampleInputChoiceSet,
};

export const ActionSubmit = Template.bind({});
ActionSubmit.args = {
  template: exampleActionSubmit,
};
