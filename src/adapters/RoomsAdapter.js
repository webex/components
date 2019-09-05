import {throwError} from 'rxjs';

import WebexAdapter from './WebexAdapter';

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
 */
export default class RoomsAdapter extends WebexAdapter {
  /**
   * A Room object with details about the room.
   *
   * @typedef {Object} Room
   * @property {string}    ID      The room identifier.
   * @property {string}    title   The room title.
   * @property {RoomType}  type    The type of the room. @see RoomType enum
   */

  /**
   * Returns an observable that emits room data of the given ID.
   *
   * @param {string} ID  ID of the room to get.
   * @returns {Observable.<Room>}
   * @memberof RoomsAdapter
   */
  // eslint-disable-next-line no-unused-vars
  getRoom(ID) {
    return throwError(new Error('getRoom(ID) must be defined in RoomsAdapter'));
  }

  /**
   * Returns an observable that emits an array of previous activity IDs of the given roomID.
   *
   * @param {string} ID  ID of the room to get.
   * @returns {Observable.<Array.<string>>}
   * @memberof RoomsAdapter
   */
  // eslint-disable-next-line no-unused-vars
  getPreviousRoomActivities(ID) {
    return throwError(new Error('getPreviousRoomActivities(ID) must be defined in RoomsAdapter'));
  }

  /**
   * Returns an observable that emits an array of current activity IDs of the given roomID.
   *
   * @param {string} ID  ID of the room to get.
   * @returns {Observable.<Array.<string>>}
   * @memberof RoomsAdapter
   */
  // eslint-disable-next-line no-unused-vars
  getRoomActivities(ID) {
    return throwError(new Error('getRoomActivities(ID) must be defined in RoomsAdapter'));
  }
}
