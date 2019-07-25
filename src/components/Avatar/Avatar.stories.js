import React from 'react';
import {storiesOf} from '@storybook/react';

import Avatar from './Avatar';

storiesOf('Avatar', module).add('Avatar with title', () => <Avatar title="Tom Smith" />);
