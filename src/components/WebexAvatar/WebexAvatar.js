import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from '@momentum-ui/react';

import {usePerson} from '../hooks';

export default function WebexAvatar({personID, displayStatus}) {
  const {avatar, displayName, status} = usePerson(personID);
  const type = displayStatus ? status : undefined;

  return <Avatar src={avatar} title={displayName} type={type} alt={displayName} />;
}

WebexAvatar.propTypes = {
  personID: PropTypes.string.isRequired,
  displayStatus: PropTypes.bool,
};

WebexAvatar.defaultProps = {
  displayStatus: true,
};
