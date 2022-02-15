import React from 'react';
import PropTypes from 'prop-types';
import {DestinationType} from '@webex/component-adapter-interfaces';
import Spinner from '../generic/Spinner/Spinner';

import Icon from '../generic/Icon/Icon';
import {
  useMembers,
  useMe,
  useOrganization,
  usePerson,
} from '../hooks';
import WebexAvatar from '../WebexAvatar/WebexAvatar';
import webexComponentClasses from '../helpers';

/**
 * Displays a webex meeting member.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.destinationID  ID of the destination for which to get members
 * @param {string} props.destinationType  Type of destination of the membership roster
 * @param {boolean} props.displayStatus  Whether or not to display the user's status
 * @param {string} props.personID  ID of the person for which to display avatar
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 *
 */
export default function WebexMember({
  className,
  destinationID,
  destinationType,
  displayStatus,
  personID,
  style,
}) {
  const {displayName, orgID, emails} = usePerson(personID);
  const me = useMe();
  const members = useMembers(destinationID, destinationType);
  const member = members
    .find((itemMember) => itemMember.ID === personID);
  const organization = useOrganization(orgID);

  const isMuted = member?.muted;
  const isSpeaking = member?.speaking;
  const isExternal = orgID !== undefined && me.orgID !== undefined && me.orgID !== orgID;
  const isSharing = member?.sharing;
  const isInMeeting = member?.inMeeting;
  const showMe = me.ID === personID && destinationType === DestinationType.MEETING;
  const isHost = member?.host;
  const isGuest = member?.guest;

  const roles = [
    showMe && 'You',
    isHost && 'Host',
    isSharing && 'Presenter',
  ].filter((role) => role);
  const emailDomain = emails?.[0]?.split('@')[1] || <i>Unknown organization</i>;

  const [cssClasses, sc] = webexComponentClasses('member', className);

  return (
    <div className={cssClasses} style={style}>
      <WebexAvatar personID={personID} displayStatus={displayStatus} className={sc('avatar')} />
      <div className={sc('details')}>
        <div className={sc('name')}>
          {(displayName ?? <Spinner size={18} />) || <i>Name not available</i>}
          {isGuest && <span className={sc('guest')}> (Guest)</span>}
        </div>
        {roles.length > 0 && <div className={sc('roles')}>{roles.join(', ')}</div>}
        {isExternal && <div className={sc('organization')}>{organization.name || emailDomain}</div>}
      </div>
      {isInMeeting && isSharing && <Icon name="content-share" size={16} className={sc('sharing')} />}
      {isInMeeting && isSpeaking && <Icon name="microphone" size={16} className={sc('speaking')} />}
      {isInMeeting && isMuted && <Icon name="microphone-muted" size={16} className={sc('muted')} />}
    </div>
  );
}

WebexMember.propTypes = {
  className: PropTypes.string,
  destinationID: PropTypes.string.isRequired,
  destinationType: PropTypes.string.isRequired,
  displayStatus: PropTypes.bool,
  personID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexMember.defaultProps = {
  className: '',
  displayStatus: false,
  style: undefined,
};
