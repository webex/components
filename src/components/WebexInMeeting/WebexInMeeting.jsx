import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {MeetingState} from '@webex/component-adapter-interfaces';
import Banner from '../generic/Banner/Banner';
import WebexLocalMedia from '../WebexLocalMedia/WebexLocalMedia';
import WebexRemoteMedia from '../WebexRemoteMedia/WebexRemoteMedia';
import webexComponentClasses from '../helpers';
import {
  AdapterContext,
  useElementDimensions,
  useMeeting,
  useRef,
} from '../hooks';
import {TABLET, DESKTOP, DESKTOP_LARGE} from '../breakpoints';
import {Modal} from '../generic';
import WebexMeetingGuestAuthentication from '../WebexMeetingGuestAuthentication/WebexMeetingGuestAuthentication';
import WebexMeetingHostAuthentication from '../WebexMeetingHostAuthentication/WebexMeetingHostAuthentication';

/**
 * Webex In-Meeting component displays the remote stream plus
 * the local stream at the bottom right corner
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.layout  Layout to apply on remote video
 * @param {string} props.meetingID  ID of the meeting for which to show media
 * @param {object} props.style  Custom style to apply
 * @param {object} props.setEscapedAuthentication Set true if user escapes authentication
 * @returns {object} JSX of the component
 */
export default function WebexInMeeting({
  className, layout, meetingID, style, setEscapedAuthentication,
}) {
  const adapter = useContext(AdapterContext);
  const {
    remoteShare,
    localShare,
    passwordRequired,
    state,
  } = useMeeting(meetingID);
  const meetingRef = useRef();
  const {width, height} = useElementDimensions(meetingRef);
  const [maxWidth, setMaxWidth] = useState('none');
  const [authModal, setAuthModal] = useState('guest');
  const localMediaType = localShare?.stream ? 'screen' : 'video';
  const [cssClasses, sc] = webexComponentClasses('in-meeting', className, {
    tablet: width >= TABLET && width < DESKTOP,
    desktop: width >= DESKTOP && width < DESKTOP_LARGE,
    'desktop-xl': width >= DESKTOP_LARGE,
    'remote-sharing': remoteShare !== null,
  });
  const {NOT_JOINED} = MeetingState;

  useEffect(() => {
    setMaxWidth(height ? (height * 16) / 9 : 'none');
  }, [height]);

  const onCloseHandler = () => {
    adapter.meetingsAdapter.clearPasswordRequiredFlag(meetingID);
    setEscapedAuthentication(true);
  };

  return (
    <div ref={meetingRef} className={cssClasses} style={style}>
      {passwordRequired && state === NOT_JOINED && (
      <Modal
        onClose={onCloseHandler}
        otherClassName={[sc('authentication')]}
        onBack={authModal === 'host' && (() => setAuthModal('guest'))}
        ariaLabel={authModal === 'guest' ? 'Meeting guest authentication' : 'Meeting host authentication'}
      >
        {
          authModal === 'guest'
            ? (
              <WebexMeetingGuestAuthentication
                meetingID={meetingID}
                className={sc('authentication-guest')}
                switchToHostModal={() => setAuthModal('host')}
                style={style}
              />
            )
            : <WebexMeetingHostAuthentication meetingID={meetingID} className={sc('authentication-host')} />
        }
      </Modal>
      )}
      <div style={{maxWidth}} className={sc('media-container')}>
        <WebexRemoteMedia className={sc('remote-media-in-meeting')} layout={layout} meetingID={meetingID} />
        <WebexLocalMedia className={sc('local-media-in-meeting')} meetingID={meetingID} mediaType={localMediaType} />
        {localShare?.stream && <Banner className={sc('share-banner')}>You&apos;re sharing your screen</Banner>}
      </div>
    </div>
  );
}

WebexInMeeting.propTypes = {
  className: PropTypes.string,
  layout: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
  setEscapedAuthentication: PropTypes.func,
};

WebexInMeeting.defaultProps = {
  className: '',
  layout: undefined,
  style: undefined,
  setEscapedAuthentication: undefined,
};
