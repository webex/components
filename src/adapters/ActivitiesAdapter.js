import {throwError} from 'rxjs';

import WebexAdapter from './WebexAdapter';

/**
 * This is a base class that defines the interface that maps activity data.
 * Developers that want to extend `ActivitiesAdapter` must implement all of its methods,
 * adhering to the exact parameters and structure of the returned objects.
 */
export default class ActivitiesAdapter extends WebexAdapter {
  /**
   * An activity a person performs in Webex.
   *
   * @typedef  {Object} Activity
   * @property {string}  ID             The activity identifier.
   * @property {string}  roomID         ID of the room where the activity happens.
   * @property {string}  text           Any text the activity may contain.
   * @property {string}  personID       ID of the person performing the activity.
   * @property {Date}    created        Timestamp of the time when the activity happened.
   * @property {Boolean} displayAuthor  Whether to display author information or not.
   */

  /**
   * Returns an observable that emits activity data of the given ID.
   *
   * @param {string} ID  ID of the activity to get.
   * @returns {Observable.<Activity>}
   * @memberof ActivityAdapter
   */
  // eslint-disable-next-line no-unused-vars
  getActivity(ID) {
    return throwError(new Error('getActivity(ID) must be defined in ActivitiesAdapter'));
  }
}
