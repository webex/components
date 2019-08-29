const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = async ({config, mode}) => {
  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader',
      // Load both momentum and project styles globally, to avoid manual import on every SASS module
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            path.resolve(__dirname, '../src/styles/index.scss'),
            path.resolve(__dirname, '../momentum-ui.scss'),
          ],
        },
      },
    ],
  });

  return config;
};
