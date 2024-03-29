import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {MeetingState} from '@webex/component-adapter-interfaces';

import {
  AdapterContext,
  useElementDimensions,
  useMeeting,
  useRef,
} from '../hooks';
import webexComponentClasses from '../helpers';
import {Button, Icon, OptionsList} from '../generic';
import WebexMeetingControl from '../WebexMeetingControl/WebexMeetingControl';

const MAX_CONTROLS = 20;
const CONTROL_MARGIN = 10;
const nonZero = (x) => !!x;

/**
 * WebexMeetingControlBar
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {number} [props.collapseRangeStart=0]  Zero-based index of the first collapsible control (can be negative)
 * @param {number} [props.collapseRangeEnd=-1]  Zero-based index before the last collapsible control (can be negative)
 * @param {Function} props.controls  Controls to display
 * @param {string} props.meetingID  ID of the meeting to control
 * @param {object} props.style  Custom style to apply
 * @param {Function} props.tabIndexes  TabIndexes for controls
 * @returns {object} JSX of the component
 *
 */
export default function WebexMeetingControlBar({
  className,
  collapseRangeStart,
  collapseRangeEnd,
  controls,
  meetingID,
  style,
  tabIndexes,
}) {
  const {meetingsAdapter} = useContext(AdapterContext);
  const {state} = useMeeting(meetingID);
  const containerRef = useRef();
  const collapseButtonRef = useRef();
  const collapseButtonRefHidden = useRef();
  const {width: containerWidth} = useElementDimensions(containerRef);
  const {width: collapseButtonWidth} = useElementDimensions(collapseButtonRefHidden);
  const {JOINED} = MeetingState;
  const isActive = state === JOINED;
  const [cssClasses, sc] = webexComponentClasses('meeting-control-bar', className);
  const controlNames = controls(isActive);
  const controlsTabIndexes = tabIndexes(isActive);
  const controlCount = controlNames.length;
  const [controlTexts, setControlTexts] = useState();
  const [[collapseStart, collapseEnd], setCollapseRange] = useState([0, 0]);
  const [collapsedShown, setCollapsedShown] = useState(undefined);

  const iconControlRefs = [];
  const textControlRefs = [];
  const iconControlWidths = [];
  const textControlWidths = [];

  for (let i = 0; i < MAX_CONTROLS; i += 1) {
    /* eslint-disable react-hooks/rules-of-hooks */
    const iconRef = useRef();
    const textRef = useRef();
    const {width: iconWidth} = useElementDimensions(iconRef);
    const {width: textWidth} = useElementDimensions(textRef);
    /* eslint-enable react-hooks/rules-of-hooks */
    const inRange = i < controlCount;

    iconControlRefs[i] = inRange && iconRef;
    textControlRefs[i] = inRange && textRef;
    iconControlWidths[i] = inRange && (iconWidth + CONTROL_MARGIN);
    textControlWidths[i] = inRange && (textWidth + CONTROL_MARGIN);
  }

  const hideCollapsed = () => setCollapsedShown(undefined);
  const toggleCollapsedShown = (withKey) => {
    setCollapsedShown((shown) => (shown ? undefined : {withKey}));
  };

  useEffect(() => {
    iconControlWidths.splice(controlCount);
    textControlWidths.splice(controlCount);

    if (
      containerWidth
      && collapseButtonWidth
      && iconControlWidths.every(nonZero)
      && textControlWidths.every(nonZero)
    ) {
      let totalWidth = textControlWidths.reduce((a, b) => a + b, 0);

      // Phase 1 - remove texts from controls until they fit

      const texts = textControlWidths.map(() => true);

      for (let i = controlCount - 1; i >= 0 && totalWidth > containerWidth; i -= 1) {
        totalWidth -= textControlWidths[i] - iconControlWidths[i];
        texts[i] = false;
      }

      setControlTexts(texts);

      // Phase 2 - collapse controls until they fit

      if (totalWidth <= containerWidth) {
        setCollapseRange([0, 0]);
        hideCollapsed();
      } else {
        const rangeStart = (collapseRangeStart + controlCount) % controlCount;
        const rangeEnd = (collapseRangeEnd + controlCount) % controlCount;

        totalWidth += collapseButtonWidth + CONTROL_MARGIN; // add collapse button

        let start = rangeEnd; // where the actual collapse starts

        for (let i = rangeEnd - 1; i >= rangeStart && totalWidth > containerWidth; i -= 1) {
          totalWidth -= iconControlWidths[i];
          start = i;
        }

        setCollapseRange([start, rangeEnd]);
      }
    }
  /* eslint-disable react-hooks/exhaustive-deps */
  }, [
    containerWidth,
    collapseButtonWidth,
    collapseRangeStart,
    collapseRangeEnd,
    controlCount,
    ...iconControlWidths,
    ...textControlWidths,
  ]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const range = (start, end) => Array(Math.max(0, end - start)).fill().map((_, i) => start + i);

  const renderControls = (start, end) => range(start, end).map(
    (i) => (
      <WebexMeetingControl
        key={controlNames[i]}
        type={controlNames[i]}
        meetingID={meetingID}
        showText={controlTexts[i]}
        autoFocus={controlsTabIndexes[i] === Math.min(...controlsTabIndexes) || false}
        tabIndex={controlsTabIndexes[i]}
      />
    ),
  );

  const renderCollapsedControls = () => {
    const names = controlNames.slice(collapseStart, collapseEnd);
    const options = names.map(
      (name) => ({
        value: name,
        label: <WebexMeetingControl key={name} type={name} meetingID={meetingID} asItem />,
      }),
    );
    const onSelect = (opt) => {
      meetingsAdapter.meetingControls[opt.value].action(meetingID);
      hideCollapsed();
      collapseButtonRef.current.focus();
    };

    return (
      <OptionsList
        className={sc('collapsed-controls')}
        options={options}
        onSelect={onSelect}
        onBlur={hideCollapsed}
        withKey={collapsedShown.withKey}
        tabIndex={controlsTabIndexes[collapseStart]}
      />
    );
  };

  const renderCollapseButton = (shown, onClick, ref, tabIndex) => (
    <div ref={ref} key="collapse-button" className={sc('collapse-button')}>
      <Button
        onClick={onClick}
        type="toggle"
        size={48}
        pressed={!!shown}
        tabIndex={tabIndex}
        tooltip="More options"
        ariaLabel={shown ? 'Collapse additional controls' : 'Expand additional controls'}
      >
        <Icon name={shown ? 'more-adr' : 'more'} />
      </Button>
    </div>
  );

  useEffect(() => {
    let cleanup;

    if (collapsedShown) {
      const onOutsideClick = () => hideCollapsed();

      setTimeout(() => document.addEventListener('click', onOutsideClick));
      cleanup = () => document.removeEventListener('click', onOutsideClick);
    }

    return cleanup;
  }, [collapsedShown]);

  return (
    <div ref={containerRef} className={cssClasses} style={style}>
      {collapsedShown && renderCollapsedControls()}
      {controlTexts && (
        <div className={sc('controls')}>
          {renderControls(0, collapseStart)}
          {
            collapseStart < collapseEnd
            && renderCollapseButton(
              collapsedShown,
              (event) => toggleCollapsedShown(!event.detail),
              collapseButtonRef,
              controlsTabIndexes[collapseStart],
            )
          }
          {renderControls(collapseEnd, controlCount)}
        </div>
      )}
      <div className={`${sc('controls')} ${sc('controls--control-refs')}`} aria-hidden="true">
        {controlNames.map((name, i) => (
          <React.Fragment key={name}>
            <div ref={iconControlRefs[i]} key="icon">
              <WebexMeetingControl type={name} meetingID={meetingID} showText={false} />
            </div>
            <div ref={textControlRefs[i]} key="text">
              <WebexMeetingControl type={name} meetingID={meetingID} showText />
            </div>
          </React.Fragment>
        ))}
        {renderCollapseButton(collapsedShown, () => {}, collapseButtonRefHidden)}
      </div>
    </div>
  );
}

WebexMeetingControlBar.propTypes = {
  className: PropTypes.string,
  collapseRangeStart: PropTypes.number,
  collapseRangeEnd: PropTypes.number,
  controls: PropTypes.func,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
  tabIndexes: PropTypes.func,
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
  collapseRangeStart: 0,
  collapseRangeEnd: -1,
  controls: (isActive) => (
    isActive
      ? ['mute-audio', 'mute-video', 'leave-meeting']
      : ['mute-audio', 'mute-video', 'join-meeting']
  ),
  tabIndexes: (isActive) => (
    isActive
      ? [1, 2, 3]
      : [2, 3, 1]
  ),
  style: undefined,
};
