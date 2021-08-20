import React from 'react';
import PropTypes from 'prop-types';
import {DestinationType} from '@webex/component-adapter-interfaces';
import Icon from '../generic/Icon/Icon';
import webexComponentClasses from '../helpers';

import WebexMember from '../WebexMember/WebexMember';
import useMembers from '../hooks/useMembers';
import {useMe} from '../hooks';

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
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.destinationID  ID of the destination for which to get members
 * @param {string} props.destinationType Type of destination of the membership roster
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 *
 */
export default function WebexMemberRoster({
  className,
  destinationID,
  destinationType,
  style,
}) {
  const members = useMembers(destinationID, destinationType);
  const {orgID} = useMe();

  const cssClasses = webexComponentClasses('member-roster', className);

  const renderMembers = (data) => data.map(
    ({ID}) => (
      <WebexMember
        destinationType={destinationType}
        destinationID={destinationID}
        personID={ID}
        key={ID}
      />
    ),
  );

  const renderSection = (data, title) => data.length > 0 && (
    <>
      <h4 className="section-title">{title}</h4>
      {renderMembers(data)}
    </>
  );

  const warningExternalMembers = members.some(
    (member) => member.orgID !== undefined && orgID !== undefined && member.orgID !== orgID,
  ) && (
    <div className="external-user-warning">
      <Icon name="external-user_20" size={20} />
      <h5>People outside your company are included in this space</h5>
    </div>
  );

  const title = (
    <div className="title">
      Participants (
      {members ? members.length : <i>loading...</i>}
      )
    </div>
  );

  return (
    <div className={cssClasses} style={style}>
      {title}
      {warningExternalMembers}
      <div className="members">
        {destinationType !== DestinationType.MEETING
          ? renderMembers(members)
          : (
            <>
              {renderSection(members.filter((member) => member.inMeeting), 'In meeting')}
              {renderSection(members.filter((member) => !member.inMeeting), 'Not in meeting')}
            </>
          )}
      </div>
    </div>
  );
}

WebexMemberRoster.propTypes = {
  className: PropTypes.string,
  destinationID: PropTypes.string.isRequired,
  destinationType: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexMemberRoster.defaultProps = {
  className: '',
  style: undefined,
};
