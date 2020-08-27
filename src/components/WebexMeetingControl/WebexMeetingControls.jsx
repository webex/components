import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {MeetingContext} from '../hooks';
import {WEBEX_COMPONENTS_CLASS_PREFIX} from '../../constants';

/**
 * WebexMeetingControls is a higher-order component that pass a meeting
 * context to several WebexMeetingControl components.
 *
 * @param {object} props
 * @returns {object} JSX of the component
 */
export default function WebexMeetingControls({children, className, meetingID}) {
  const mainClasses = {
    [`${WEBEX_COMPONENTS_CLASS_PREFIX}-meeting-controls`]: true,
    [className]: !!className,
  };

  return (
    <MeetingContext.Provider value={meetingID}>
      <div className={classNames(mainClasses)}>{children}</div>
    </MeetingContext.Provider>
  );
}

WebexMeetingControls.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
};

WebexMeetingControls.defaultProps = {
  className: '',
};
