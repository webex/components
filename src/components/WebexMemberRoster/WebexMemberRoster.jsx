import React from 'react';
import PropTypes from 'prop-types';
import {DestinationType} from '@webex/component-adapter-interfaces';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';

import WebexMember from '../WebexMember/WebexMember';
import useMemberships from '../hooks/useMemberships';

// TODO: Figure out how to import JS Doc definitions and remove duplication.
/**
 * Enum for types of destinations.
 *
 * @external DestinationType
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MembershipsAdapter.js#L21}
 */

/**
 * Displays the roster of Webex meeting or room members.
 *
 * @param {string} props.destinationID  ID of the destination for which to get members
 * @param {string} props.destinationType Type of destination of the membership roster
 *
 * @returns {object} JSX of the component
 */
export default function WebexMemberRoster({destinationID, destinationType}) {
  const members = useMemberships(destinationID, destinationType);

  const renderMembers = (members) => members.map(
    (member) => <WebexMember key={member.personID} personID={member.personID} />,
  );

  const renderSection = (members, title) => members.length > 0 && (
    <>
      <h4 className="section-title">{title}</h4>
      {renderMembers(members)}
    </>
  )

  return (
    <div className={`${WEBEX_COMPONENTS_CLASS_PREFIX}-member-roster`}>
      {destinationType !== DestinationType.MEETING
      ? renderMembers(members) 
      : (
        <>
          {renderSection(members.filter(member => member.inMeeting), 'In meeting')}
          {renderSection(members.filter(member => !member.inMeeting), 'Not in meeting')}
        </>
      )}
    </div>
  );
}

WebexMemberRoster.propTypes = {
  destinationID: PropTypes.string.isRequired,
  destinationType: PropTypes.string.isRequired,
};