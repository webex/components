import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

const output = (name, format) => ({
  name,
  file: `dist/webexComponents.${format}.js`,
  format,
  sourcemap: true,
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
});

export default [
  {
    input: 'src/index.js',
    output: [
      output('WebexComponents', 'cjs'),
      output('UMDWebexComponents', 'umd'),
      output('ESMWebexComponents', 'esm'),
    ],
    plugins: [resolve(), babel(), commonJS(), json()],
    onwarn(warning, warn) {
      // skip circular dependency warnings from @momentum-ui/react library
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;

      // skip unused external import warning from @momentum-ui/react library
      if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;

      // Use default for everything else
      warn(warning);
    },
    external: ['react', 'react-dom', 'prop-types'],
    context: 'null',
  },
];
