import {throwError} from 'rxjs';

import WebexAdapter from './WebexAdapter';

/**
 * This is a base class that defines the interface that maps activity data.
 * Developers that want to extend `ActivityAdapter` must implement all of its methods,
 * adhering to the exact parameters and structure of the returned objects.
 */
export default class ActivityAdapter extends WebexAdapter {
  /**
   * An activity a person performs in Webex.
   *
   * @typedef {Object} Activity
   * @property {string} ID        The activity identifier.
   * @property {string} roomID    ID of the room where the activity happens.
   * @property {string} text      Any text the activity may contain.
   * @property {string} personID  ID of the person performing the activity.
   * @property {Date}   created   Timestamp of the time when the activity happened.
   */

  /**
   * Returns an observable that emits message data of the given ID.
   *
   * @param {string} ID  ID of the message to get.
   * @returns {Observable.<Activity>}
   * @memberof ActivityAdapter
   */
  // eslint-disable-next-line no-unused-vars
  getMessage(ID) {
    return throwError(new Error('getMessage(ID) must be defined in ActivityAdapter'));
  }
}
