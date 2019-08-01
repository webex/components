import React from 'react';
import {storiesOf} from '@storybook/react';

import WebexAvatar from './WebexAvatar';

storiesOf('Webex Avatar', module).add('Avatar with title', () => <WebexAvatar title="Tom Smith" />);
