const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss",
    "storybook-addon-themes",
  ],

  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },

  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@webex/component-adapter-interfaces': path.resolve(__dirname, '../node_modules/@webex/component-adapter-interfaces/dist/webex-component-adapter-interfaces.es'),
    };
    return config;
  },
}
