/*
 * we use semantic-release to automate the whole
 * package release workflow and the options,
 * mode and plugins can be set here
 * more info: https://github.com/semantic-release/semantic-release
 */
module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    [
      '@semantic-release/release-notes-generator',
      {
        writerOpts: {
          commitsSort: ['subject', 'scope'],
        },
      },
    ],
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'package.json',
            label: 'Package JSON',
          },
          {
            path: 'npm-shrinkwrap.json',
            label: 'NPM',
          },
          {
            path: 'dist/webexComponents.cjs.*',
            label: 'Common JS distribution',
          },
          {
            path: 'dist/webexComponents.umd.*',
            label: 'Universal Module Definition JS distribution',
          },
          {
            path: 'dist/webexComponents.esm.*',
            label: 'ECMAScript module JS distribution',
          },
        ],
      },
    ],
  ],
};
