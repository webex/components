import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import WebexLocalMedia from '../WebexLocalMedia/WebexLocalMedia';
import WebexRemoteMedia from '../WebexRemoteMedia/WebexRemoteMedia';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import {useElementDimensions, useMeeting} from '../hooks';
import {TABLET, DESKTOP, DESKTOP_LARGE} from '../breakpoints';

/**
 * Webex In-Meeting component displays the remote stream plus
 * the local stream at the bottom right corner.
 *
 * @param {string} props.meetingID  ID of the meeting for which to show media
 * @returns {Object} JSX of the component
 */
export default function WebexInMeeting({meetingID}) {
  const {remoteShare, localShare} = useMeeting(meetingID);
  const [meetingRef, {width}] = useElementDimensions();
  const classBaseName = `${WEBEX_COMPONENTS_CLASS_PREFIX}-in-meeting`;
  const mainClasses = {
    [`${classBaseName}`]: true,
    [`${classBaseName}-tablet`]: width >= TABLET && width < DESKTOP,
    [`${classBaseName}-desktop`]: width >= DESKTOP && width < DESKTOP_LARGE,
    [`${classBaseName}-desktop-xl`]: width >= DESKTOP_LARGE,
    'remote-sharing': remoteShare !== null,
  };

  return (
    <div ref={meetingRef} className={classNames(mainClasses)}>
      <WebexRemoteMedia className="remote-media-in-meeting" meetingID={meetingID} />
      <WebexLocalMedia className="local-media-in-meeting" meetingID={meetingID} />
      {localShare && <div className="share-notice">You&apos;re sharing your screen</div>}
    </div>
  );
}

WebexInMeeting.propTypes = {
  meetingID: PropTypes.string.isRequired,
};
