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

## Project Status

The Webex Component System is considered to be in beta stage and it's not a generally available product from Webex at this time.
This means that the Webex Component System is available for everyone to use but breaking changes may occur as we develop it.
We try our best to minimize any breaking changes but they may occur.

While the Webex Component System is not a GA product, we still offer support through all regular channels.
However, bug priority is given to products already generally available.
We would love for you to use the Webex Component System and be part of the feedback process!

## Table of Contents

- [Demo](#demo)
- [Install](#install)
- [Webex Components vs Webex Widgets](#webex-components-vs-webex-widgets)
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

## Webex Components vs Webex Widgets

In addition to the Webex Component System, we also offer the
[Webex Widgets](https://github.com/webex/widgets#webex-widgets).
The Webex Component System (sometimes shortened as _Webex Components_) is a set of
React components that, while following Webex styling, allow for more granularity
in terms of layout and source of data. See [usage](#usage) section.

Webex Widgets are based on Webex Components but include the adapter that uses
our [Javascript SDK](https://github.com/webex/webex-js-sdk) to talk to Webex services for you.
This means that the Webex Widgets use the
[SDK Component Adapter](https://github.com/webex/sdk-component-adapter#webex-sdk-component-adapter)
to inject the Webex data.
All you need is a valid access token and a few parameters based on the widget you want to use.

You have to take the Widget layout as-is, but the benefit is that there are no configurations needed.
Install, copy-paste and you have the power of Webex in your application!

To learn more on the Webex Widgets head to its Github repository at
https://github.com/webex/widgets.

## Usage
#### Webex Components Styles

There are two ways to do this:

##### JavaScript

In your `index.js`, add the following import:

```js
import '@webex/components/dist/css/webex-components.css';

...
```

##### HTML

In the `<head>` of your `index.html`, add the following imports:

```html
<head>
  ...
  <link rel="stylesheet" type="text/css" href="node_modules/@webex/components/dist/css/webex-components.css" />
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
import '@webex/components/dist/css/webex-components.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {WebexAvatar, WebexDataProvider, WebexJSONAdapter} from '@webex/components';

// jsonData represents an JSON object with the data to feed components
const adapter = new WebexJSONAdapter(jsonData);

ReactDOM.render(
  <WebexDataProvider adapter={adapter}>
    <WebexAvatar personID="XYZ" />
  </WebexDataProvider>,
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
