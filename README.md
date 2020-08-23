<h1 align='center' style='border-bottom: none;'>Webex Components</h1>
<h3 align='center'>Library of React components to easily embed into your web applications!</h3>
<p align='center'>
<a href='https://circleci.com/gh/webex/components'>
    <img alt='CircleCI' src='https://circleci.com/gh/webex/components.svg?style=shield'>
  </a>
  <a href='https://www.npmjs.com/package/@webex/components'>
    <img alt='npm latest version' src='https://img.shields.io/npm/v/@webex/components?label=npm%40latest'>
  </a>
  <a href='#badge'>
    <img alt='semantic-release' src='https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg'>
  </a>
  <a href='https://github.com/webex/components/blob/master/package.json#L28'>
    <img src='https://img.shields.io/npm/l/webex.svg' alt='license'>
  </a>
</p>

**Webex Components** is a set of [React](https://reactjs.org) components following Webex standard styling,
aimed at react developers that want to embed the components into their applications.

## Table of Contents

- [Demo](#demo)
- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Demo

We use [Storybook](https://storybook.js.org) to showcase all supported components. Our Storybook can be found at https://webex.github.io/components/storybook.

## Install

```bash
npx install-peerdeps @webex/components
```

## Usage

### Styles

In order to properly style Webex Components, we need to import all the fonts, icons, images and core _CSS_ manually.
You will need to add [Momentum UI](https://momentum.design)'s styles in addition to the components' styles.
[Momentum UI](https://momentum.design) is Webex design system.

There are two ways to do this:

#### JavaScript

In your `index.js`, add the following imports:

```js
import '@momentum-ui/core/css/momentum-ui.min.css';
import '@webex/components/dist/webex-components.css';

...
```

#### HTML

In the `<head>` of your `index.html`, add the following imports:

```html
<head>
  ...

  <link rel="stylesheet" type="text/css" href="node_modules/@momentum-ui/core/css/momentum-ui.min.css" />
  <link rel="stylesheet" type="text/css" href="node_modules/@webex/components/dist/webex-components.css" />
</head>
```

### Adapters

Webex Components are self-updating, meaning, they know how to fetch the data they need.
Data is passed to components via adapter classes (see [adapters](./src/adapters)).
Adapters are an uniform interface for the Webex Components to consume.
They also know how to map the data from their data source to the data the components need.

To use a Webex Component, start by creating a Webex Adapter:

```js
import {WebexJSONAdapter} from '@webex/components';

const adapter = new WebexJSONAdapter(jsonData);
```

Adapters may interact with different data source types.
For instance, as part of the Webex Component repository we distribute a [JSON adapter](./src/adapters) that reads data from JSON files.
We also are working on offering [an adapter](https://github.com/webex/sdk-component-adapter) for the [Webex browser SDK](https://github.com/webex/webex-js-sdk).

### Components

Putting everything together - styles, adapters and components - this is a simple example of how using a component would look like:

```js
import '@momentum-ui/core/css/momentum-ui.min.css';
import '@webex/components/dist/webex-components.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {WebexAvatar, WebexDataProvider, WebexJSONAdapter} from '@webex/components';

const adapter = new WebexJSONAdapter(jsonData); // jsonData represents an opened file

ReactDOM.render(
  <WebexDataProvider adapter={adapter}>
    <WebexAvatar personID="XYZ" />,
  </WebexDataProvider>
  document.getElementById('root')
);
```

_Happy Coding!_

## Contributing

We'd love for you to contribute to our source code and to make **Webex Components** even better than it is today!
Here are some [guidelines](https://github.com/webex/components/blob/master/CONTRIBUTING.md) that we'd like you to follow.

### Issues

Please open an [issue](https://github.com/webex/components/issues) and we will get to it in an orderly manner.
Please leave as much as information as possible for a better understanding.

## License

[MIT License](https://opensource.org/licenses/MIT)

## Support

For more developer resources, tutorials and support, visit the Webex developer portal, https://developer.webex.com.
