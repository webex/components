import {Observable} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {
  useContext,
  useEffect,
  useState,
} from 'react';

import {AdapterContext} from './contexts';
import useRef from './useRef';

// TODO: Figure out how to import JS Doc definitions and remove duplication.
/**
 * An activity that should be displayed as a time ruler.
 *
 * @external ActivityDate
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/RoomsAdapter.js#L16}
 */

/**
 * Callback function to execute once data has been fetched.
 *
 * @callback previousActivitiesCallback
 * @param {Array.<string|ActivityDate>} previousActivities Array of previous activities fetched
 * @returns undefined
 */

/**
 * Custom hook that returns a reference to the DOM element of the last activity.
 * Requests previous activity data for the given room, and executes
 * the given callback with that data.
 * It completes once there is enough data to fill the viewport of the
 * parent container, finishing by scrolling into view the last activity.
 *
 * @param {string} roomID  ID of the room for which to load data.
 * @param {object} elementRef  DOM reference of the parent component.
 * @param {previousActivitiesCallback} callback  Callback to execute once data has been fetched.
 * @returns {object}  DOM reference to the the last activity.
 */
export default function useOverflowActivities(roomID, elementRef, callback) {
  const lastElementRef = useRef();
  const {roomsAdapter} = useContext(AdapterContext);
  const [scrollToLastActivity, setScrollToLastActivity] = useState(false);
  const [lastActivityBottom, setLastActivityBottom] = useState(0);

  useEffect(() => {
    const activityStreamBoundaries = elementRef.current.getBoundingClientRect();
    const lastActivityBoundaries = lastElementRef.current.getBoundingClientRect();

    // If the bottom position of the last activity is less than
    // the bottom position of the container that means that the last
    // activity is visible and there is not enough content to overflow
    // the container
    const loadMoreActivities = Observable.create((observer) => {
      if (lastActivityBoundaries.bottom < activityStreamBoundaries.bottom) {
        observer.next();
      } else {
        if (!scrollToLastActivity) {
          lastElementRef.current.scrollIntoView();
          setScrollToLastActivity(true);
        }

        // Once enough content has loaded, complete
        observer.complete();
      }
    })
      .pipe(flatMap(() => roomsAdapter.getPastActivities(roomID)))
      .subscribe((previousActivities) => {
        callback(previousActivities);
        setLastActivityBottom(lastActivityBoundaries.bottom);
      });

    return () => {
      loadMoreActivities.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastActivityBottom]);

  return lastElementRef;
}
