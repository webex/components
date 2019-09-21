import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from '@momentum-ui/react';

import {usePerson} from '../hooks';

export default function WebexAvatar({personID}) {
  const {avatar, displayName, status} = usePerson(personID);

  return <Avatar src={avatar} title={displayName} type={status} alt={displayName} />;
}

WebexAvatar.propTypes = {
  personID: PropTypes.string.isRequired,
};
