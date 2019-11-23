import {useContext, useEffect, useState} from 'react';

import {AdapterContext, MeetingContext} from '../../components/';

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

  const control = meetingsAdapter.meetingControls[type];
  const {action} = control;

  useEffect(() => {
    const subscription = control.display(meetingID).subscribe(setDisplay);

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [() => action(meetingID), display];
}
