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
export default function WebexMeetingControls(props) {
  const {
    className, meetingID, centerControls, rightControls, leftControls,
  } = props;

  const mainClasses = {
    [`${WEBEX_COMPONENTS_CLASS_PREFIX}-meeting-controls`]: true,
    [className]: !!className,
  };

  return (
    <MeetingContext.Provider value={meetingID}>
      <div className={classNames(mainClasses)}>
        <div className="control-left">{leftControls}</div>
        <div className="control-center">{centerControls}</div>
        <div className="control-right">{rightControls}</div>
      </div>
    </MeetingContext.Provider>
  );
}

WebexMeetingControls.propTypes = {
  centerControls: PropTypes.node,
  rightControls: PropTypes.node,
  leftControls: PropTypes.node,
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
};

WebexMeetingControls.defaultProps = {
  className: '',
  centerControls: null,
  rightControls: null,
  leftControls: null,
};
