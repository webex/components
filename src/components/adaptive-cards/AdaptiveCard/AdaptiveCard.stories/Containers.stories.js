import React from 'react';
import AdaptiveCard from '../AdaptiveCard';

export default {
  title: 'Messaging/AdaptiveCard/Containers',
  component: AdaptiveCard,
};

const Template = (args) => (
  <AdaptiveCard
    {...args}
    onSubmit={(inputs) => alert(`Submitted values:\n${JSON.stringify(inputs, null, 4)}`)}
    onInvalidSubmit={(inputs) => alert(`Submitted invalid values:\n${JSON.stringify(inputs, null, 4)}`)}
  />
);

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
              text: 'Toggle button',
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
        type: 'Action.ToggleVisibility',
        targetElements: ['submitActionColumnSet'],
      },
    },
    {
      type: 'ColumnSet',
      bleed: false,
      id: 'submitActionColumnSet',
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
              text: 'Submit button',
            },
            {
              type: 'TextBlock',
              text: 'Send data',
              isSubtle: true,
              spacing: 'none',
            },
          ],
        },
      ],
      selectAction: {
        type: 'Action.Submit',
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

export const ActionSet = Template.bind({});
ActionSet.args = {
  template: exampleActionSet,
};

export const Column = Template.bind({});
Column.args = {
  template: exampleColumn,
};

export const ColumnSet = Template.bind({});
ColumnSet.args = {
  template: exampleColumnSet,
};

export const Container = Template.bind({});
Container.args = {
  template: exampleContainer,
};

export const FactSet = Template.bind({});
FactSet.args = {
  template: exampleFactSet,
};

export const ImageSet = Template.bind({});
ImageSet.args = {
  template: exampleImageSet,
};
