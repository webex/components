import React from 'react';
import PropTypes from 'prop-types';
import {useMeetingControl} from '../hooks';
import webexComponentClasses from '../helpers';
import Banner from '../generic/Banner/Banner';
import Title from '../generic/Title/Title';
import WebexLocalMedia from '../WebexLocalMedia/WebexLocalMedia';
import WebexMeetingControl from '../WebexMeetingControl/WebexMeetingControl';
import WebexNoMedia from '../WebexNoMedia/WebexNoMedia';

/**
 * Webex Video Settings component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting from which to obtain local media
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexVideoSettings({meetingID, className, style}) {
  const [cssClasses, sc] = webexComponentClasses('video-settings', className);
  const [, display] = useMeetingControl('switch-camera', meetingID);

  return (
    <div className={cssClasses} style={style}>
      {display.options?.length !== 0
        ? (
          <>
            <Title type="subsection">Camera</Title>
            <WebexMeetingControl type="switch-camera" meetingID={meetingID} tabIndex={102} />
            <div className={sc('media')}>
              <WebexLocalMedia mediaType="preview" meetingID={meetingID} />
              <Banner type="bottom">Preview</Banner>
            </div>
          </>
        ) : (
          <WebexNoMedia media="camera" className={sc('no-media')} />
        )}
    </div>
  );
}

WebexVideoSettings.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexVideoSettings.defaultProps = {
  className: '',
  style: undefined,
};
