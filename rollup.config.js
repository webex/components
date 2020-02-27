import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import scss from 'rollup-plugin-scss';

const output = (name, format) => ({
  name,
  file: `dist/webexComponents.${format}.js`,
  format,
  sourcemap: true,
  globals: {
    'prop-types': 'PropTypes',
    react: 'React',
    'react-dom': 'ReactDOM',
    rxjs: 'rxjs',
    'rxjs/operators': 'rxjs.operators',
  },
});

export default [
  {
    input: 'src/index.js',
    output: [output('ESMWebexComponents', 'esm')],
    plugins: [
      resolve(),
      babel({runtimeHelpers: true}),
      commonJS(),
      json(),
      scss({
        includePaths: ['node_modules'],
        output: 'dist/webexComponents.css',
        failOnError: true,
        // remove `~` from node_modules import declarations.
        // more info: https://github.com/facebook/create-react-app/issues/2859#issuecomment-318059618
        importer(path) {
          return {file: path[0] === '~' ? path.slice(1) : path};
        },
      }),
    ],
    onwarn(warning, warn) {
      // skip circular dependency warnings from @momentum-ui/react library
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;

      // skip unused external import warning from @momentum-ui/react library
      if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;

      // Use default for everything else
      warn(warning);
    },
    external: ['prop-types', 'react', 'react-dom', 'rxjs', 'rxjs/operators'],
    context: 'null',
  },
];
