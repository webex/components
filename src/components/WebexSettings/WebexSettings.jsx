import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';
import Tabs from './Tabs';

/**
 * Webex Settings component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting to set the preferred devices for
 *
 * @returns {object} JSX of the component
 */
export default function WebexSettings({className, meetingID}) {
  const mainClasses = {
    [`${WEBEX_COMPONENTS_CLASS_PREFIX}-settings`]: true,
    [className]: !!className,
  };
  const [tab, setTab] = useState('audio');
  const tabs = [{
    key: 'audio',
    heading: 'Audio',
    content: () => (
      <div>
        Audio Settings for meeting
        {' '}
        {meetingID}
        {' '}
        (TBD)
      </div>
    ),
  }, {
    key: 'video',
    heading: 'Video',
    content: () => (
      <div>
        Video Settings for meeting
        {' '}
        {meetingID}
        {' '}
        (TBD)
      </div>
    ),
  }];

  return (
    <div className={classNames(mainClasses)}>
      <Tabs tabs={tabs} selected={tab} onSelect={setTab} />
    </div>
  );
}

WebexSettings.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
};

WebexSettings.defaultProps = {
  className: '',
};
