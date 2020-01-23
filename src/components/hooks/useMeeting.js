import {useEffect, useContext, useState} from 'react';
import {from} from 'rxjs';
import {delayWhen, flatMap, take} from 'rxjs/operators';

import {AdapterContext} from '../../components/';

/**
 * Custom hook that returns meeting data of the given ID.
 * If no ID is given, a `meetingDestination` must be provided to
 * create a new meeting.
 *
 * @param {string} meetingID           ID of the meeting for which to return data.
 * @param {string} meetingDestination  Virtual location where the meeting should take place.
 * @returns {Meeting} Data of the meeting
 */
export default function useMeeting(meetingID, meetingDestination) {
  const [meeting, setMeeting] = useState({});
  const {meetingsAdapter} = useContext(AdapterContext);

  useEffect(() => {
    let subscription;
    const onError = (error) => {
      throw error;
    };
    const onMeeting = (newMeeting) => {
      // React won't recognize the meeting attributes have been updated
      // since the state is the meeting object itself. We need to create a new
      // meeting object trigger the state change
      setMeeting({...newMeeting});
    };

    if (meetingID) {
      subscription = meetingsAdapter.getMeeting(meetingID).subscribe(onMeeting, onError);
    } else if (meetingDestination) {
      // Create a meeting, start event listeners by subscribing to getMeeting,
      // wait for local media to get added and complete
      subscription = meetingsAdapter
        .createMeeting(meetingDestination)
        .pipe(
          flatMap(({ID}) => meetingsAdapter.getMeeting(ID)),
          take(1),
          delayWhen(({ID}) => from(meetingsAdapter.addLocalMedia(ID)))
        )
        .subscribe(onMeeting, onError);
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingID, meetingDestination]);

  return meeting;
}
