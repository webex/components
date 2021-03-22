import React from 'react';
import PropTypes from 'prop-types';

import {usePerson} from '../hooks';
import WebexAvatar from '../WebexAvatar/WebexAvatar';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';

/**
 * Displays a webex meeting member.
 *
 * @param {string} props.personID  ID of the person for which to display avatar
 * @param {boolean} props.displayStatus  Whether or not to display the user's status
 *
 * @returns {object} JSX of the component
 */
export default function WebexMember({personID, displayStatus}) {
  const {firstName, lastName} = usePerson(personID);

    
  return (
    <div className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-member`}>
      <WebexAvatar personID={personID} displayStatus={displayStatus} />
      <div className="member-name">{`${firstName} ${lastName}`}</div>
    </div>
  );
}

WebexMember.propTypes = {
  personID: PropTypes.string.isRequired,
  displayStatus: PropTypes.bool,
};

WebexMember.defaultProps = {
  displayStatus: false,
};
