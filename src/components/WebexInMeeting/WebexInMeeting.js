import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import {WebexLocalMedia, WebexRemoteMedia} from '../';
import {useElementDimensions} from '../hooks';
import {TABLET, DESKTOP} from '../breakpoints';

import './WebexInMeeting.scss';

/**
 * Webex In-Meeting component displays the remote stream plus
 * the local stream at the bottom right corner.
 *
 * @param {string} props.meetingID  ID of the meeting for which to show media
 * @returns {Object} JSX of the component
 */
export default function WebexInMeeting({meetingID}) {
  const [meetingRef, {width}] = useElementDimensions();
  const classBaseName = 'in-meeting';
  const classObjects = {};

  classObjects[`${WEBEX_COMPONENTS_CLASS_PREFIX}-${classBaseName}`] = true;
  classObjects[`${WEBEX_COMPONENTS_CLASS_PREFIX}-${classBaseName}-tablet`] = width >= TABLET && width < DESKTOP;
  classObjects[`${WEBEX_COMPONENTS_CLASS_PREFIX}-${classBaseName}-desktop`] = width >= DESKTOP;

  const cssClasses = classNames(classObjects);

  return (
    <div ref={meetingRef} className={cssClasses}>
      <WebexRemoteMedia meetingID={meetingID} />
      <WebexLocalMedia meetingID={meetingID} />
    </div>
  );
}

WebexInMeeting.propTypes = {
  meetingID: PropTypes.string.isRequired,
};
