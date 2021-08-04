import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {MeetingState} from '@webex/component-adapter-interfaces';

import {useElementDimensions, useMeeting} from '../hooks';
import webexComponentClasses from '../helpers';
import WebexMeetingControl from '../WebexMeetingControl/WebexMeetingControl';

/**
 * WebexMeetingControlBar
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {object} props.controls  Controls to display
 * @param {string} props.meetingID  ID of the meeting to control
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 *
 */
export default function WebexMeetingControlBar({
  className,
  controls,
  meetingID,
  style,
}) {
  const {state} = useMeeting(meetingID);
  const [ref, {width}] = useElementDimensions();
  const [controlsRef, {width: controlsWidth}] = useElementDimensions();
  const [showText, setShowText] = useState(true);
  const [prevWidth, setPrevWidth] = useState();

  const {JOINED} = MeetingState;
  const isActive = state === JOINED;
  const cssClasses = webexComponentClasses('meeting-control-bar', className);

  // hide text when controls width is bigger than container width and text is shown
  if (width < controlsWidth && showText) {
    setShowText(false);
  }

  // show text when controls width is smaller than container width and text is shown
  useEffect(() => {
    if (prevWidth < width && !showText) {
      setShowText(true);
    }

    setPrevWidth(width);
  }, [width, prevWidth, showText]);

  const meetingControls = controls(isActive).map(
    (key) => <WebexMeetingControl key={key} type={key} meetingID={meetingID} showText={showText} />,
  );

  return (
    <div ref={ref} className={cssClasses} style={style}>
      <div ref={controlsRef} className="controls">{meetingControls}</div>
    </div>
  );
}

WebexMeetingControlBar.propTypes = {
  className: PropTypes.string,
  controls: PropTypes.func,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexMeetingControlBar.defaultProps = {
  /**
   * A function that returns an array of control names for the meeting.
   * Control name must match with the adapter implementation of the control.
   *
   * @param {boolean} isActive  Whether or not the meeting is active
   * @returns {Array.<string>} List of controls to display
   */

  className: '',
  controls: (isActive) => (
    isActive
      ? ['mute-audio', 'mute-video', 'share-screen', 'member-roster', 'settings', 'leave-meeting']
      : ['mute-audio', 'mute-video', 'join-meeting']
  ),
  style: undefined,
};
