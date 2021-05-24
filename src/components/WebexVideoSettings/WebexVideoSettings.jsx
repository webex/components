import React from 'react';
import {Icon} from '@momentum-ui/react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import WebexLocalMedia from '../WebexLocalMedia/WebexLocalMedia';
import WebexMeetingControl from '../WebexMeetingControl/WebexMeetingControl';
import {useMeetingControl} from '../hooks';

const noCameraMsg = 'Can\'t detect your camera. Make sure your camera is connected and try again.';

/**
 * Webex Video Settings component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting from which to obtain local media
 * @returns {object} JSX of the component
 */
export default function WebexVideoSettings({className, meetingID}) {
  const [, display] = useMeetingControl('switch-camera', meetingID);
  const classBaseName = `${WEBEX_COMPONENTS_CLASS_PREFIX}-video-settings`;
  const mainClasses = {
    [classBaseName]: true,
    [className]: !!className,
  };

  const renderNoVideoDevices = () => (
    <div className="camera-warning">
      <Icon color="red" name="icon-clear_24" />
      <p className="message">{noCameraMsg}</p>
    </div>
  );

  const renderVideoDevices = () => (
    <>
      <WebexMeetingControl type="switch-camera" meetingID={meetingID} />
      <div className="media">
        <WebexLocalMedia mediaType="video" meetingID={meetingID} />
        <div className="preview"><h3>Preview</h3></div>
      </div>
    </>
  );

  return (
    <div className={classNames(mainClasses)}>
      <h2>Camera</h2>
      {display && display.options && display.options.length === 0
        ? renderNoVideoDevices()
        : renderVideoDevices()}
    </div>
  );
}

WebexVideoSettings.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
};

WebexVideoSettings.defaultProps = {
  className: '',
};
