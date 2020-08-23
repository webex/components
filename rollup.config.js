import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import scss from 'rollup-plugin-scss';
import visualizer from 'rollup-plugin-visualizer';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

const modulePath = 'dist/webex-components';
const plugins = [
  nodeResolve({
    extensions: [
      '.mjs',
      '.js',
      '.json',
      '.jsx',
    ],
  }),
  commonjs(),
  babel({
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
  }),
];

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: `${modulePath}.es.js`,
        format: 'es',
        sourcemap: true,
      },
      {
        file: `${modulePath}.es.min.js`,
        format: 'es',
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      ...plugins,
      scss({
        output: `${modulePath}.css`,
        outputStyle: 'compressed',
        failOnError: true,
        // Search for Sass in third-party packages e.g. Momentum UI
        includePaths: ['node_modules'],
        // Remove Webpack-style imports
        // Webpack-style imports are left in code because Storybook uses Webpack
        importer: (path) => ({file: path[0] === '~' ? path.slice(1) : path}),
      }),
      visualizer({
        filename: 'docs/bundle-analysis-esm.html',
        title: 'Webex Components Library ESM Bundle Analysis',
      }),
    ],
    external: [
      /^@babel\/runtime/,
      /^@momentum-ui/,
      /^prop-types/,
      /^react/,
      /^rxjs/,
    ],
  },
  {
    // TODO: Remove UMD entry point when there is a Momentum UI UMD bundle
    input: 'src/index.umd.js',
    output: [
      {
        file: `${modulePath}.umd.js`,
        format: 'umd',
        sourcemap: true,
        name: 'WebexComponents',
        globals: {
          'prop-types': 'PropTypes',
          react: 'React',
          'react-dom': 'ReactDOM',
          rxjs: 'rxjs',
          'rxjs/operators': 'rxjs.operators',
        },
      },
      {
        file: `${modulePath}.umd.min.js`,
        format: 'umd',
        sourcemap: true,
        name: 'WebexComponents',
        globals: {
          'prop-types': 'PropTypes',
          react: 'React',
          'react-dom': 'ReactDOM',
          rxjs: 'rxjs',
          'rxjs/operators': 'rxjs.operators',
        },
        plugins: [terser()],
      },
    ],
    plugins: [
      ...plugins,
      // TODO: Remove JSON plugin when there is a Momentum UI UMD bundle
      json(),
      // TODO: Remove separate UMD CSS when there is a Momentum UI UMD bundle
      scss({
        output: `${modulePath}.umd.css`,
        outputStyle: 'compressed',
        failOnError: true,
        // Search for Sass in third-party packages e.g. Momentum UI
        includePaths: ['node_modules'],
        // Remove Webpack-style imports
        // Webpack-style imports are left in code because Storybook uses Webpack
        importer: (path) => ({file: path[0] === '~' ? path.slice(1) : path}),
      }),
      visualizer({
        filename: 'docs/bundle-analysis-umd.html',
        title: 'Webex Components Library UMD Bundle Analysis',
      }),
    ],
    external: [
      /^prop-types/,
      /^react/,
      /^rxjs/,
    ],
  },
];
