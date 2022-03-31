import React from 'react';
import PropTypes from 'prop-types';
import {DestinationType} from '@webex/component-adapter-interfaces';
import webexComponentClasses from '../helpers';

import Button from '../generic/Button/Button';
import Icon from '../generic/Icon/Icon';
import Title from '../generic/Title/Title';
import useMembers from '../hooks/useMembers';
import {useMe} from '../hooks';
import WebexMeetingParticipant from '../WebexMeetingParticipant/WebexMeetingParticipant';

// TODO: Figure out how to import JS Doc definitions and remove duplication.
/**
 * Enum for types of destinations.
 *
 * @external DestinationType
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MembershipsAdapter.js#L21}
 */

/**
 * Displays the roster of Webex meeting.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting for which to get members
 * @param {object} props.style  Custom style to apply
 * @param {Function} props.onClose  Action to close the roster
 * @returns {object} JSX of the component
 *
 */
export default function WebexMeetingRoster({
  className,
  meetingID,
  style,
  onClose,
}) {
  const members = useMembers(meetingID, DestinationType.MEETING);
  const {orgID} = useMe();

  const [cssClasses, sc] = webexComponentClasses('meeting-roster', className);

  const renderMembers = (data) => data.map(
    ({ID}) => (
      <WebexMeetingParticipant
        meetingID={meetingID}
        personID={ID}
        key={ID}
      />
    ),
  );

  const renderSection = (data, title) => data.length > 0 && (
    <>
      <h5 className={sc('section-title')}>{title}</h5>
      {renderMembers(data)}
    </>
  );

  const warningExternalMembers = members.some(
    (member) => member.orgID !== undefined && orgID !== undefined && member.orgID !== orgID,
  ) && (
    <div className={sc('external-user-warning')}>
      <Icon name="external-user" size={20} className={sc('external-user-icon')} />
      <div className={sc('external-user-message')}>People outside your company are included in this space</div>
    </div>
  );

  return (
    <div className={cssClasses} style={style}>
      <div className={sc('header')}>
        <Title type="section" className={sc('title')}>
          Participants (
          {members ? members.length : <i>loading...</i>}
          )
        </Title>
        <Button
          type="ghost"
          size={28}
          onClick={onClose}
          tabIndex={50}
          ariaLabel="Close participants panel"
        >
          <Icon name="cancel" size={16} />
        </Button>
      </div>
      {warningExternalMembers}
      <div className={sc('members')}>
        {renderSection(members.filter((member) => member.inMeeting), 'In the meeting')}
        {renderSection(members.filter((member) => !member.inMeeting), 'Not in the meeting')}
      </div>
    </div>
  );
}

WebexMeetingRoster.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
  onClose: PropTypes.func,
};

WebexMeetingRoster.defaultProps = {
  className: '',
  style: undefined,
  onClose: undefined,
};
