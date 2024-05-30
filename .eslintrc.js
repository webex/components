const path = require('path');

module.exports = {
    env: {
      es2020: true,
      browser: true,
      jest: true,
    },
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 11,
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: [
      'jest',
      'jsdoc',
    ],
    extends: [
      'airbnb',
      'airbnb/hooks',
      'plugin:jest/recommended',
      'plugin:jest/style',
      'plugin:jsdoc/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
    ],
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['@webex/component-adapter-interfaces', path.join(__dirname, 'node_modules/@webex/component-adapter-interfaces/dist/webex-component-adapter-interfaces.es')],
                ],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    globals: {
      rxjs: 'readonly',
      shallow: 'readonly',
    },
    rules: {
      'func-style': [
        'warn',
        'declaration',
        {
          allowArrowFunctions: true,
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
        },
        {
          selector: 'LabeledStatement',
          message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        },
        {
          selector: 'WithStatement',
          message: 'with is disallowed in strict mode because it makes code impossible to predict and optimize.',
        },
      ],
      'object-curly-spacing': [
        'error',
        'never',
      ],
      'max-len': [
        'error',
        {
          code: 100,
          tabWidth: 2,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      'accessor-pairs': [
        'error',
        {
          setWithoutGet: true,
          getWithoutSet: false,
          enforceForClassMembers: true,
        },
      ],
      'no-dupe-keys': 'error',
      'no-dupe-class-members': 'error',
      'newline-after-var': 'error',
      'newline-before-return': 'error',
      'lines-around-directive': 'error',
      'no-useless-call': 'error',
      'operator-linebreak': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-array-index-key': 'off',
      'jsx-a11y/tabindex-no-positive': 'off',
    },
    overrides: [
      {
        files: [
          '*.test.js',
        ],
        rules: {
          'jest/no-test-callback': 'off',
          'react/jsx-filename-extension': 'off',
        },
      },
      {
        files: [
          '*.stories.js',
        ],
        rules: {
          'import/no-extraneous-dependencies': 'off',
          'react/jsx-filename-extension': 'off',
          'react/jsx-props-no-spreading': 'off',
        },
      },
    //   {
    //     files: [
    //       '/mocks/',
    //     ],
    //     rules: {
    //       'jsdoc/require-jsdoc': 'off',
    //     },
    //   },
    //   {
    //     files: [
    //       '*.js', '*.jsx', // The glob patterns should be separate strings in the array.
    //     ],
    //     rules: {
    //       'import/no-unresolved': 'error',
    //       'import/extensions': ['error', 'ignorePackages', {
    //         js: 'never',
    //         jsx: 'never',
    //         ts: 'never',
    //         tsx: 'never',
    //       }],
    //     },
    //   },
    ],
  };