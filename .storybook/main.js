const path = require('path');

module.exports = {
  "stories": ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss",
    "storybook-addon-themes",
    "@storybook/addon-webpack5-compiler-babel",
    "@chromatic-com/storybook"
  ],

  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript"
  },

  webpackFinal: async (config, { configType }) => {
    // Add your custom config here, for example:
    config.resolve.alias = {
      ...config.resolve.alias,
      // Define your custom alias
      '@webex/component-adapter-interfaces': path.resolve(__dirname, '../node_modules/@webex/component-adapter-interfaces/dist/webex-component-adapter-interfaces.es.js'),
    };

    // Return the altered config
    return config;
  },

}
