import {configure} from '@storybook/react';
import '@momentum-ui/core/css/momentum-ui.min.css';

function loadStories() {
  const req = require.context('../src', true, /\.stories\.js$/);
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
