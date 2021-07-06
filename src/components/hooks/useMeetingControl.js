import {useContext, useEffect, useState} from 'react';

import {AdapterContext} from './contexts';

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
 * @param {string} meetingID  ID of the meeting
 * @returns {Array.<Function, MeetingControlDisplay>}  Action function and data state of the meeting control
 */
export default function useMeetingControl(type, meetingID) {
  const [display, setDisplay] = useState({});
  const {meetingsAdapter} = useContext(AdapterContext);
  const controls = meetingsAdapter.meetingControls;
  const control = controls[type];

  useEffect(() => {
    if (!control) {
      // eslint-disable-next-line no-console
      console.error(`${type} control is not defined. Available controls are "${Object.keys(controls).join(', ')}".`);
    }
  }, [type, controls, control]);

  useEffect(() => {
    let cleanup;

    if (control) {
      const subscription = control.display(meetingID).subscribe(setDisplay);

      cleanup = () => {
        subscription.unsubscribe();
      };
    }

    return cleanup;
  }, [meetingID, control]);

  return control
    ? [(value) => control.action(meetingID, value), display]
    : [() => {}, {}];
}
