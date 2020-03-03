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
- [Team](#team)

## Demo

We use [Storybook](https://storybook.js.org) to showcase all supported components. Our Storybook can be found at https://webex.github.io/components/storybook/.

## Install

```bash
npm install --save @webex/components rxjs
```

## Usage

### Styles

In order to properly style Webex Components, we need to import all the fonts, icons, images and core _CSS_ manually.
Import `@webex/components/dist/webexComponents.css` into your main entry file.

There are two ways to do this:

#### JavaScript

In your `index.js`, add the following import:

```js
import '@webex/components/dist/webexComponents.css';
...
```

#### HTML

In the `<head>` of your `index.html`, add the following import:

```html
<head>
  ...
  <link rel="stylesheet" type="text/css" href="node_modules/@webex/components/dist/webexComponents.css" />
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
import '@webex/components/dist/webexComponents.css';

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

We'd love for you to contribute to our source code and to make **Webex Components** even better than it is today! Here are some [guidelines](https://github.com/webex/components/blob/master/CONTRIBUTING.md) that we'd like you to follow.

### Issues

Please open an [issue](https://github.com/webex/components/issues) and we will get to it in an orderly manner.
Please leave as much as information as possible for a better understanding.

### Contributing Code

We are using [Webex Style Guide eslint rule](https://github.com/webex/web-styleguide/tree/master/packages/node_modules/%40webex/eslint-config-react) and [prettier](https://github.com/prettier/prettier) to lint the code style.
You can "prettify" your code before committing via:

```bash
npm run prettier:write
```

### Release Process

There is a list of commit types provided [here](https://github.com/webex/components/blob/master/CONTRIBUTING.md#type). However, not all commits trigger our release process.
We are using [semantic-release](https://github.com/semantic-release/semantic-release) to fully automate the version management and package publishing.
By default `semantic-release` uses the [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) and triggers release and publishing based on the following rules:

| Commit                             | Release type  |
| ---------------------------------- | ------------- |
| Commit with type `BREAKING CHANGE` | Major release |
| Commit with type `feat`            | Minor release |
| Commit with type `fix`             | Patch release |
| Commit with type `perf`            | Patch release |

#### Commit linter

We are using [commitlint](https://github.com/conventional-changelog/commitlint) to lintify the commit messages.
Please make sure to choose the appropriate commit [type](https://github.com/webex/components/blob/master/CONTRIBUTING.md#type), [scope](https://github.com/webex/components/blob/master/CONTRIBUTING.md#scope) and [subject](https://github.com/webex/components/blob/master/CONTRIBUTING.md#scope).

## License

[MIT License](https://opensource.org/licenses/MIT)

## Support

For more developer resources, tutorials and support, visit the Webex developer portal, https://developer.webex.com.

## Team

| [![Adam Weeks](https://github.com/adamweeks.png?size=100)](https://github.com/adamweeks) | [![Arash Koushkebaghi](https://github.com/akoushke.png?size=100)](https://github.com/akoushke) | [![Lalli Flores](https://github.com/lalli-flores.png?size=100)](https://github.com/lalli-flores) | [![Timothy Scheuering](https://github.com/InteractiveTimmy.png?size=100)](https://github.com/InteractiveTimmy) | [![David Hoff](https://github.com/harborhoffer.png?size=100)](https://github.com/harborhoffer) |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [Adam Weeks](https://github.com/adamweeks)                                               | [Arash Koushkebaghi](https://github.com/akoushke)                                              | [Lalli Flores](https://github.com/lalli-flores)                                                  | [Timothy Scheuering](https://github.com/InteractiveTimmy)                                                      | [David Hoff](https://github.com/harborhoffer)                                                  |
