import {useContext, useEffect, useState} from 'react';

import {AdapterContext, MeetingContext} from './contexts';

// TODO: Figure out how to import JS Doc definitions and remove duplication.
/**
 * Display options of a meeting control.
 *
 * @external MeetingControlDisplay
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MeetingsAdapter.js#L58}
 */

/**
 * Custom hook that returns the display state of the requested meeting control.
 *
 * @param {string} type  Type of meeting control for which to get display data
 * @returns {Array.<Function, MeetingControlDisplay>}  Action function and data state of the meeting control
 */
export default function useMeetingControl(type) {
  const [display, setDisplay] = useState({});
  const {meetingsAdapter} = useContext(AdapterContext);
  const meetingID = useContext(MeetingContext);
  const controls = meetingsAdapter.meetingControls;
  let control;

  if (controls[type]) {
    control = controls[type];
  } else {
    // eslint-disable-next-line no-console
    console.error(`${type} control is not defined. Available controls are "${Object.keys(controls).join(', ')}".`);
  }

  useEffect(() => {
    const subscription = control.display(meetingID).subscribe(setDisplay);

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [() => control.action(meetingID), display];
}
