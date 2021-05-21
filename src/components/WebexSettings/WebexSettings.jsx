import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Tab,
  TabContent,
  TabList,
  TabPane,
  Tabs,
} from '@momentum-ui/react';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';

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

  return (
    <div className={classNames(mainClasses)}>
      <Tabs>
        <TabList>
          <Tab heading="Audio" />
          <Tab heading="Video" />
        </TabList>
        <TabContent>
          <TabPane>
            Audio Settings for meeting
            {' '}
            {meetingID}
            {' '}
            (TBD)
          </TabPane>
          <TabPane>
            Video Settings for meeting
            {' '}
            {meetingID}
            {' '}
            (TBD)
          </TabPane>
        </TabContent>
      </Tabs>
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
