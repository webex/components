import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from '@momentum-ui/react';

import usePerson from '../hooks/usePerson';

export default function WebexAvatar({personID, adapter}) {
  const {avatar, displayName, status} = usePerson(personID, adapter);

  return <Avatar src={avatar} title={displayName} type={status} alt={displayName} />;
}

WebexAvatar.propTypes = {
  personID: PropTypes.string.isRequired,
  adapter: PropTypes.object.isRequired,
};
