import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import scss from 'rollup-plugin-scss';
import visualizer from 'rollup-plugin-visualizer';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

const modulePath = 'dist/webex-components';

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
      json(),
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
        filename: 'docs/bundle-analysis.html',
        title: 'Webex Components Library Bundle Analysis',
      }),
    ],
    external: [
      /^@babel\/runtime/,
      /^prop-types/,
      /^react/,
      /^rxjs/,
    ],
  },
];
