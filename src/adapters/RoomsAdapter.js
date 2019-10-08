/* eslint-disable valid-jsdoc */
/* eslint-disable no-unused-vars */
import {throwError} from 'rxjs';

import WebexAdapter from './WebexAdapter';

/**
 * A Room object with details about the room.
 *
 * @typedef {Object}  Room
 * @property {string}    ID     The room identifier.
 * @property {string}    title  The room title.
 * @property {RoomType}  type   The type of the room. @see RoomType enum
 */

/**
 * @typedef {Object}  ActivityDate
 * @param {string}  date  Date that will render on a time ruler. Must be a valid date-time string.
 *                        See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format
 */

/**
 * Enum for room type values.
 *
 * @readonly
 * @enum {string}
 */
export const RoomType = {
  GROUP: 'group',
  DIRECT: 'direct',
};

/**
 * This is a base class that defines the interface that maps room data.
 * Developers that want to extend `RoomsAdapter` must implement all of its methods,
 * adhering to the exact parameters and structure of the returned objects.
 *
 * `RoomsAdapter` handles data of a room such as details about that room but also
 * activities that happened/will happen within that room. Activities are expected
 * to be lazy loaded, and therefore, chunked.
 */
export default class RoomsAdapter extends WebexAdapter {
  /**
   * Returns an observable that emits room data of the given ID.
   *
   * @param {string} ID  ID of the room to get.
   * @returns {Observable.<Room>}
   * @memberof RoomsAdapter
   */
  getRoom(ID) {
    return throwError(new Error('getRoom(ID) must be defined in RoomsAdapter'));
  }

  /**
   * Returns an observable that emits an array of current and future activities of the given roomID.
   *
   * @param {string} ID  ID of the room for which to get activities.
   * @returns {Observable.<Array.<string|ActivityDate>>}
   * @memberof RoomsAdapter
   */
  getRoomActivities(ID) {
    return throwError(new Error('getRoomActivities(ID) must be defined in RoomsAdapter'));
  }

  /**
   * Returns an observable that emits an array of the next chunk of previous
   * activity data of the given roomID. If `hasMoreActivities` returns false,
   * the observable will complete.
   * **Previous activity data must be sorted newest-to-oldest.**
   *
   * @param {string} ID  ID of the room for which to get activities.
   * @returns {Observable.<Array.<string|ActivityDate>>}
   * @memberof RoomsAdapter
   */
  getPreviousRoomActivities(ID) {
    return throwError(new Error('getPreviousRoomActivities(ID) must be defined in RoomsAdapter'));
  }

  /**
   * Returns `true` if there are more activities to load from the room of the given ID.
   * Otherwise, it returns `false`.
   *
   * @param {string} ID ID of the room for which to verify activities.
   * @returns {boolean}
   * @memberof RoomsAdapter
   */
  hasMoreActivities(ID) {
    throw new Error('hasMoreActivities(ID) must be defined in RoomsAdapter');
  }
}
