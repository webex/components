import React from 'react';
import AdaptiveCard from '../AdaptiveCard';

export default {
  title: 'Messaging/AdaptiveCard/CardElements',
  component: AdaptiveCard,
};

const Template = (args) => (
  <AdaptiveCard
    {...args}
    onSubmit={(inputs) => alert(`Submitted values:\n${JSON.stringify(inputs, null, 4)}`)}
    onInvalidSubmit={(inputs) => alert(`Submitted invalid values:\n${JSON.stringify(inputs, null, 4)}`)}
  />
);

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
          text: 'Date-Time parsing (COMPACT): {{DATE(2017-02-14T06:08:39Z,COMPACT)}} {{TIME(2017-02-14T06:08:39Z)}}',
        },
      ],
    },
    {
      type: 'RichTextBlock',
      inlines: [
        {
          type: 'TextRun',
          text: 'Date-Time parsing (SHORT): {{DATE(2017-02-14T06:08:39Z,SHORT)}} {{TIME(2017-02-14T06:08:39Z)}}',
        },
      ],
    },
    {
      type: 'RichTextBlock',
      inlines: [
        {
          type: 'TextRun',
          text: 'Date-Time parsing (LONG): {{DATE(2017-02-14T06:08:39Z,LONG)}} {{TIME(2017-02-14T06:08:39Z)}}',
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
      text: 'TextBlock supports markdown:  \n' +
        'The text can be **bold** or _italic_.  \n' +
        'Bullet lists \n' +
        '- one\r' +
        '- two\r' +
        '- three\r \n' +
        'Numbered lists \n' +
        '1. one\r' +
        '2. two\r' +
        '3. three\r \n' +
        'Nested lists \n' +
        '* Fruit\r' +
        '  * Apple\r' +
        '  * Orange\r' +
        '  * Banana\r' +
        '* Dairy\r' +
        '  * Milk\r' +
        '  * Cheese\r \n' +
        'Links: [AdaptiveCards](https://adaptivecards.io)  \n' +
        'Headers are not supported \n' +
        '# This header is not processed',
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

export const Image = Template.bind({});
Image.args = {
  template: exampleImage,
};

export const RichTextBlock = Template.bind({});
RichTextBlock.args = {
  template: exampleRichTextBlock,
};

export const TextBlock = Template.bind({});
TextBlock.args = {
  template: exampleTextBlock,
};
