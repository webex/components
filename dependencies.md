# Dependencies

This guide describes the dependencies of this repository and their purpose.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Package Dependencies](#package-dependencies)
  - [Classnames](#classnames)
  - [date-fns](#date-fns)
  - [Resize Observer](#resize-observer)
- [Peer Dependencies](#peer-dependencies)
  - [Momentum UI](#momentum-ui)
  - [React](#react)
  - [RxJS](#rxjs)
- [Development Dependencies](#development-dependencies)
  - [Babel](#babel)
  - [commitlint](#commitlint)
  - [ESLint](#eslint)
  - [Husky](#husky)
  - [Identity Obj Proxy](#identity-obj-proxy)
  - [Jest](#jest)
  - [MockDate](#mockdate)
  - [Node Sass](#node-sass)
  - [React Test Renderer](#react-test-renderer)
  - [Rollup](#rollup)
  - [semantic-release](#semantic-release)
  - [Storybook](#storybook)

## Package Dependencies

Package dependencies, or just regular dependencies are those packages that are needed for the
library code to run properly and so are are included as part of the library's final production bundle.

### Classnames

[Classnames](https://github.com/JedWatson/classnames#classnames)
is an utility that conditionally joins CSS class names together.

#### Classnames Packages

- [classnames](https://www.npmjs.com/package/classnames):
  Utility's core package

### date-fns

[date-fns](https://date-fns.org) is a toolset for manipulating dates in JavaScript.

#### date-fns Packages

- [date-fns](https://www.npmjs.com/package/date-fns):
  date-fns core package

### Resize Observer

[Resize Observer](https://juggle.studio/resize-observer/) is a polyfill for the
 [ResizeObserver API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)

#### Resize Observer Packages

- [@juggle/resize-observer](https://www.npmjs.com/package/@juggle/resize-observer):
  Polyfill's core package

## Peer Dependencies

Peer dependencies are package dependencies that the library depends on
but are not included as part of the library's final production bundle.

Usually peer dependencies are packages that would-be users would already have or need
as part of their own applications, and hence, no need to include them as part of
the library code.

### Momentum UI

[Momentum UI](https://momentum.design) is Webex design system.

#### Momentum UI Packages

- [@momentum-ui/react](https://www.npmjs.com/package/@momentum-ui/react):
  Momentum UI's [React](https://reactjs.org)'s component library

### React

[React](https://reactjs.org) is a library for building component-based user interfaces.

#### React Packages

- [react](https://www.npmjs.com/package/react):
  React's core package
- [react-dom](https://www.npmjs.com/package/react-dom):
  Entry point to inject React into the
  [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [prop-types](https://www.npmjs.com/package/prop-types):
  Runtime checker for React component's props

### RxJS

[RxJS](https://rxjs-dev.firebaseapp.com) is a library for composing asynchronous and event-based programs by using observable sequences.

#### RxJS Packages

- [rxjs](https://www.npmjs.com/package/rxjs): RxJS core package

## Development Dependencies

Development dependencies are package dependencies used while developing library code
but are not part of the library's final production bundle.

### Babel

[Babel](https://babeljs.io)
is a compiler that allows developers to use new JavaScript features that are not yet available in all browsers.

#### Babel Packages

- [@babel/core](https://www.npmjs.com/package/@babel/core):
  Compiler core package
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env):
  Pre-set of JavaScript features babel should compile
- [@babel/preset-react](https://www.npmjs.com/package/@babel/preset-react):
  Pre-set of React/JSX features babel should compile
- [@babel/plugin-transform-runtime](https://www.npmjs.com/package/@babel/plugin-transform-runtime):
  Allows for re-use of Babel's helper code when injected as part of a bundle

### Commitlint

[commitlint](https://commitlint.js.org/)
checks commit messages to make sure they follow
[commit message guidelines](https://github.com/webex/components/blob/master/CONTRIBUTING.md#git-commit).

#### Commitlint Packages

- [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli):
  commitlint core package
- [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional):
  commitlint enforcer of [conventional commit](https://conventionalcommits.org/) guidelines

### ESLint

[ESLint](https://eslint.org/) is a static analysis tool that enforces code styles and patterns.

#### ESLint Packages

- [eslint](https://www.npmjs.com/package/eslint):
  ESLint core package
- [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb-base):
  Airbnb's
  [JavaScript style guide](https://github.com/airbnb/javascript#airbnb-javascript-style-guide-)
  configurations
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import):
  Plugin that enforces import/export styles
- [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest):
  Plugin that enforces standard [Jest](https://jestjs.io) styles
- [eslint-plugin-jsdoc](https://www.npmjs.com/package/eslint-plugin-jsdoc):
  Plugin that enforces standard [JSDoc](https://jsdoc.app) styles
- [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y):
  Plugin that enforces accessibility rules in JSX
- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react):
  Plugin that enforces [React](https://reactjs.org)'s standard practices
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks):
  Plugin that enforces React's [rules of hooks](https://reactjs.org/docs/hooks-rules.html)

### Husky

[Husky](https://github.com/typicode/husky#husky) simplifies running scripts in
[Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks).

#### Husky Packages

- [husky](https://www.npmjs.com/package/husky) - Husky core package

### Idneity Obj Proxy

identity-obj-proxy is a helper module that translates non-JavaScript modules to
objects. This is useful for things like mocking style imports for Jest.

#### Identity Obj Proxy Packages

- [identity-obj-proxy](https://www.npmjs.com/package/identity-obj-proxy):
  Core package

### Jest

[Jest](https://jestjs.io) is a testing framework and runner. Used for unit tests.

#### Jest Packages

- [jest](https://www.npmjs.com/package/jest): Jest core package
- [jest-junit](https://www.npmjs.com/package/jest-junit):
  Plugin that allows for JUnit-style reporting

### MockDate

[MockDate](https://github.com/boblauer/MockDate#mockdate)
is a testing utility that allows for a script to change when JavaScript's "now" date is.
This is used to have a fixed date on unit tests.

#### MockDate Packages

- [mockdate](https://www.npmjs.com/package/mockdate):
  Utility's core package

### Node Sass

[Node.js](https://nodejs.org) compiler for [Sass](https://sass-lang.com).
Currently used by [Rollup](#rollup) to build production CSS style sheet and
[Storybook](#storybook) for displaying stories on the fly/compiling them.

#### Node Sass Packages

- [node-sass](https://www.npmjs.com/package/node-sass):
  Core package

### React Test Renderer

Transforms [React](#react) components into pure JavaScript objects.
Used for snapshot testing with [Jest](#jest).

#### React Test Renderer Packages

- [react-test-renderer](https://www.npmjs.com/package/react-test-renderer):
  Core package

### Rollup

[Rollup](https://rollupjs.org) is a JavaScript module bundler.

#### Rollup Packages

- [rollup](https://www.npmjs.com/package/rollup): Rollup core package
- [@rollup/plugin-babel](https://www.npmjs.com/package/@rollup/plugin-babel):
  Plugin that integrates with Rollup with [Babel](#babel)
- [@rollup/plugin-commonjs](https://www.npmjs.com/package/@rollup/plugin-commonjs):
  Plugin that converts CommonJS modules to ES6. Most third-party packages use CommonJS.
- [@rollup/plugin-node-resolve](https://www.npmjs.com/package/@rollup/plugin-node-resolve):
  Plugin to locate third-party modules in `node_modules` using the
  [Node resolution algorithm](https://nodejs.org/api/modules.html#modules_all_together)
- [rollup-plugin-copy](https://www.npmjs.com/package/rollup-plugin-copy):
  Plugin to copy files and folders
- [rollup-plugin-license](https://www.npmjs.com/package/rollup-plugin-license):
  Plugin that prepends legal information to distribution bundles
- [rollup-plugin-scss](https://www.npmjs.com/package/rollup-plugin-scss):
  Plugin that allows Rollup to bundle Sass/CSS files
- [rollup-plugin-terser](https://www.npmjs.com/package/rollup-plugin-terser):
  Plugin to create minified bundles
- [rollup-plugin-visualizer](https://www.npmjs.com/package/rollup-plugin-visualizer):
  Plugin that creates visualizations of the bundle composition

### Semantic Release

[semantic-release](https://semantic-release.gitbook.io/semantic-release/)
automates the versioning and release process.
semantic-release using semantic versioning to find the next version.
It also takes care of updating all packages, pushing back to Git and publishing to NPM.

#### Semantic Release Packages

- [semantic-release](https://www.npmjs.com/package/semantic-release):
  semantic-release core package
- [@semantic-release/changelog](https://www.npmjs.com/package/@semantic-release/changelog):
  Plugin to generate the changelog
- [@semantic-release/git](https://www.npmjs.com/package/@semantic-release/git):
  Plugin to commit release assets into a Git repository

### Storybook

[Storybook](https://storybook.js.org/)
is a tool that allows to showcase, document, test, etc. component libraries.
Storybook uses [Webpack](https://webpack.js.org/) to serve the development version of Storybook
and to build assets for hosting.
Because Webpack is included only for Storybook, it's packages are also described in this section.

#### Storybook Packages

- [@storybook/react](https://www.npmjs.com/package/@storybook/react):
  Storybook for [React](#react) components core package
- [@storybook/addon-essentials](https://www.npmjs.com/package/@storybook/addon-essentials):
  Default preset of Storybook add-ons
- [@storybook/addon-actions](https://www.npmjs.com/package/@storybook/addon-actions):
  Displays the data received by event handlers within Storybook
- [@storybook/addon-links](https://www.npmjs.com/package/@storybook/addon-links):
  Allows for inter-story linking
- [@storybook/addon-storyshots](https://www.npmjs.com/package/@storybook/addon-storyshots):
  Automatically creates snapshot tests from stories
- [@storybook/preset-scss](https://www.npmjs.com/package/@storybook/preset-scss):
  Default presets for Sass/CSS configurations

#### Webpack Packages

- [babel-loader](https://www.npmjs.com/package/babel-loader):
  Allows for packages to be transpile to ES5 with Babel
- [css-loader](https://www.npmjs.com/package/css-loader):
  Interprets CSS3 module features
- [sass-loader](https://www.npmjs.com/package/sass-loader):
  Loads and compiles Sass to CSS
- [style-loader](https://www.npmjs.com/package/style-loader):
  Injects CSS into the DOM
