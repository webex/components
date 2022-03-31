import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import WebexAvatar from '../WebexAvatar/WebexAvatar';
import usePerson from '../hooks/usePerson';
import webexComponentClasses, {formatMessageDate} from '../helpers';
import Attachment from './Attachment';

/**
 * Activity component displays activity content.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {object} props.style  Custom style to apply
 * @param {string} props.ID ID of the activity
 * @param {string} props.text Text content to display
 * @param {boolean} props.displayHeader Show the header or not
 * @param {string} props.attachments An array of attachments
 * @param {string} props.cards An array of cards
 * @param {string} props.created Created date
 * @param {string} props.children Child components to render
 * @param {string} props.personID ID of the person
 * @param {boolean} props.isSelected Activity selected state
 * @param {boolean} props.isReply Activity is a reply
 * @param {boolean} props.isUnread Activity read state
 * @returns {object} JSX of the component
 */
export default function Activity({
  ID,
  personID,
  text,
  displayHeader,
  attachments,
  cards,
  created,
  isSelected,
  isUnread,
  isReply,
  children,
  style,
  className,
}) {
  const [cssClasses, sc] = webexComponentClasses('activity', className);
  const {displayName} = usePerson(personID);
  const stateClasses = {
    'wxc-activity--reply': isReply,
    'wxc-activity--selected': isSelected,
    'wxc-activity--unread': isUnread,
  };

  return (
    <div className={classNames(cssClasses, stateClasses)} style={style} data-id={ID}>
      <div className={sc('avatar')}>
        <WebexAvatar personID={personID} />
      </div>
      <div className={sc('content')}>
        {displayHeader && (
        <div className={sc('author')}>
          <span className={sc('person')}>{displayName}</span>
          {created && <span className={sc('timestamp')}>{formatMessageDate(new Date(created))}</span>}
        </div>
        )}
        {(!children && attachments) && attachments.map((attachment) => (
          <Attachment key={attachment.id} {...attachment} />
        ))}
        {(!cards || cards.length === 0) && <div className={sc('message')}>{text}</div>}
        {children}
      </div>
    </div>
  );
}

Activity.propTypes = {
  ID: PropTypes.string,
  personID: PropTypes.string,
  text: PropTypes.string,
  created: PropTypes.string,
  displayHeader: PropTypes.bool,
  isReply: PropTypes.bool,
  isSelected: PropTypes.bool,
  isUnread: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  attachments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
    mimeType: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string,
    fileSize: PropTypes.number,
  })),
  cards: PropTypes.arrayOf(PropTypes.shape()),
  style: PropTypes.shape(),
};

Activity.defaultProps = {
  className: '',
  ID: undefined,
  created: '',
  text: undefined,
  personID: undefined,
  displayHeader: true,
  isSelected: false,
  isUnread: false,
  isReply: false,
  style: undefined,
  attachments: undefined,
  cards: undefined,
  children: undefined,
};

Activity.displayName = 'Activity';
