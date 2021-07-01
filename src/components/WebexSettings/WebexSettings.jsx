import React, {useState} from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';
import Tabs from './Tabs';
import WebexAudioSettings from '../WebexAudioSettings/WebexAudioSettings';
import WebexVideoSettings from '../WebexVideoSettings/WebexVideoSettings';

/**
 * Webex Settings component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting to set the preferred devices for
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 *
 */
export default function WebexSettings({meetingID, className, style}) {
  const cssClasses = webexComponentClasses('settings', className);
  const [tab, setTab] = useState('audio');
  const tabs = [{
    key: 'audio',
    heading: 'Audio',
    content: () => (
      <>
        <WebexAudioSettings type="switch-microphone" meetingID={meetingID} />
        <WebexAudioSettings type="switch-speaker" meetingID={meetingID} />
      </>
    ),
  }, {
    key: 'video',
    heading: 'Video',
    content: () => (
      <WebexVideoSettings type="switch-camera" meetingID={meetingID} />
    ),
  }];

  return (
    <div className={cssClasses} style={style}>
      <Tabs tabs={tabs} selected={tab} onSelect={setTab} />
    </div>
  );
}

WebexSettings.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexSettings.defaultProps = {
  className: '',
  style: undefined,
};
