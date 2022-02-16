import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import license from 'rollup-plugin-license';
import scss from 'rollup-plugin-scss';
import visualizer from 'rollup-plugin-visualizer';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

const moduleName = 'webex-components';
const ESModulePath = `dist/es/${moduleName}`;
const UMDModulePath = `dist/umd/${moduleName}`;

const plugins = [
  nodeResolve({
    browser: true,
    preferBuiltins: false,
    extensions: [
      '.mjs',
      '.js',
      '.json',
      '.jsx',
    ],
  }),
  commonjs(),
  json(),
  babel({
    babelHelpers: 'runtime',
    babelrc: true,
    exclude: 'node_modules/**',
  }),
  scss({
    output: `dist/css/${moduleName}.css`,
    outputStyle: 'compressed',
    failOnError: true,
  }),
  license({
    banner: `
    Webex Component System.
    Copyright (c) <%= moment().format('YYYY') %> Cisco Systems, Inc and its affiliates.

    This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
    `,
  }),
  copy({
    targets: [
      {
        src: ['src/themes/dark', 'src/themes/light'],
        dest: 'dist/themes',
      },
      {
        src: 'src/assets/fonts',
        dest: 'dist/assets',
      },
    ],
  }),
];

// Peer dependencies to exclude from bundle
const external = [
  /^prop-types/,
  /^react/,
  /^rxjs/,
];

// UMD global/window names for peer dependencies
const globals = {
  'prop-types': 'PropTypes',
  react: 'React',
  'react-dom': 'ReactDOM',
  rxjs: 'rxjs',
  'rxjs/operators': 'rxjs.operators',
};

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: `${ESModulePath}.es.js`,
        format: 'es',
        sourcemap: true,
      },
      {
        file: `${ESModulePath}.es.min.js`,
        format: 'es',
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      ...plugins,
      visualizer({
        filename: 'docs/bundle-analysis-esm.html',
        title: 'Webex Components Library ESM Bundle Analysis',
      }),
    ],
    external: [
      /^@babel\/runtime/,
      ...external,
    ],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: `${UMDModulePath}.umd.js`,
        format: 'umd',
        sourcemap: true,
        name: 'WebexComponents',
        globals,
      },
      {
        file: `${UMDModulePath}.umd.min.js`,
        format: 'umd',
        sourcemap: true,
        name: 'WebexComponents',
        globals,
        plugins: [terser()],
      },
    ],
    plugins: [
      ...plugins,
      visualizer({
        filename: 'docs/bundle-analysis-umd.html',
        title: 'Webex Components Library UMD Bundle Analysis',
      }),
    ],
    external,
  },
];
