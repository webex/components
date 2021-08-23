import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import Banner from '../generic/Banner/Banner';
import WebexLocalMedia from '../WebexLocalMedia/WebexLocalMedia';
import WebexRemoteMedia from '../WebexRemoteMedia/WebexRemoteMedia';
import webexComponentClasses from '../helpers';
import {useElementDimensions, useMeeting} from '../hooks';
import {TABLET, DESKTOP, DESKTOP_LARGE} from '../breakpoints';

/**
 * Webex In-Meeting component displays the remote stream plus
 * the local stream at the bottom right corner.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting for which to show media
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexInMeeting({className, meetingID, style}) {
  const {remoteShare, localShare} = useMeeting(meetingID);
  const [meetingRef, {width, height}] = useElementDimensions();
  const [maxWidth, setMaxWidth] = useState('none');
  const localMediaType = localShare?.stream ? 'screen' : 'video';
  const cssClasses = webexComponentClasses('in-meeting', className, {
    tablet: width >= TABLET && width < DESKTOP,
    desktop: width >= DESKTOP && width < DESKTOP_LARGE,
    'desktop-xl': width >= DESKTOP_LARGE,
  },
  {
    'remote-sharing': remoteShare !== null,
  });

  useEffect(() => {
    setMaxWidth(height ? (height * 16) / 9 - 1 : 'none');
  }, [height]);

  return (
    <div ref={meetingRef} className={cssClasses} style={style}>
      <div style={{maxWidth}} className="media-container">
        <WebexRemoteMedia className="remote-media-in-meeting" meetingID={meetingID} />
        <WebexLocalMedia className="local-media-in-meeting" meetingID={meetingID} mediaType={localMediaType} />
        {localShare?.stream && <Banner className="share-banner">You&apos;re sharing your screen</Banner>}
      </div>
    </div>
  );
}

WebexInMeeting.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexInMeeting.defaultProps = {
  className: '',
  style: undefined,
};
