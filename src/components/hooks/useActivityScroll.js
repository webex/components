import {useContext, useEffect, useState} from 'react';
import {empty, fromEvent} from 'rxjs';
import {filter, flatMap} from 'rxjs/operators';

import {AdapterContext} from './contexts';

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
 * @param {Array.<string|ActivityDate>} previousActivities Array of previous activities fetched.
 * @returns undefined
 */

/**
 * Custom hook returns a loading state to indicate when data is being fetched,
 * once user has scrolled to the top of the component of the given DOM reference.
 *
 * @param {string} roomID  ID of the room from which to fetch data.
 * @param {object} elementRef  reference to the element to attach scroll listener.
 * @param {previousActivitiesCallback} callback  Callback to execute once data has been fetched.
 * @returns {boolean}  Data loading state.
 */
export default function useActivityScroll(roomID, elementRef, callback) {
  const {roomsAdapter} = useContext(AdapterContext);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let scrollListener = empty();

    if (elementRef.current) {
      // Listen to scroll event, and on reaching the top,
      // And load previous activities if there are any
      scrollListener = fromEvent(elementRef.current, 'scroll')
        .pipe(
          filter((event) => {
            const isViewportTop = event.target.scrollTop === 0;
            const loadMoreItems = isViewportTop && roomsAdapter.hasMoreActivities(roomID);

            if (loadMoreItems) {
              setShowLoader(true);
            }

            return loadMoreItems;
          }),
          flatMap(() => roomsAdapter.getPastActivities(roomID)),
        )
        .subscribe((previousActivities) => {
          // Show loader for half second
          setTimeout(() => {
            callback(previousActivities);
            setShowLoader(false);
          }, 500);
        });
    }

    return () => {
      scrollListener.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return showLoader;
}
