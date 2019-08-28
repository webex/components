import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from '@momentum-ui/react';

import usePerson from '../hooks/usePerson';

export default function WebexAvatar(props) {
  let component = null;
  const person = usePerson(props.personID, props.adapter);

  if (person) {
    const {avatar, displayName, status} = person;

    component = <Avatar src={avatar} title={displayName} type={status} alt={displayName} />;
  }

  return component;
}

WebexAvatar.propTypes = {
  personID: PropTypes.string.isRequired,
  adapter: PropTypes.object.isRequired,
};
