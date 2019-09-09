import {Observable} from 'rxjs';

import RoomsAdapter from './RoomsAdapter';

/**
 * @typedef RoomJSON
 * @param {object} datasource An object that contains a set of rooms keyed by ID.
 * @example
 * {
 *  "room-1": {
 *     "ID": "room-1",
 *     "title": "title",
 *     "roomType": "group"
 *  },
 *  "room-1-activities": []
 * }
 */

/*
 * Implements the RoomsAdapter interface with a JSON object as its datasource. See @RoomsJSON
 */
export default class RoomsJSONAdapter extends RoomsAdapter {
  constructor(datasource) {
    super(datasource);
    this.getRoom = this.getRoom.bind(this);
    this.getPreviousRoomActivities = this.getPreviousRoomActivities.bind(this);
    this.getRoomActivities = this.getRoomActivities.bind(this);
  }

  /**
   * Returns an observable that emits room data of the given ID.
   *
   * @param {string} ID ID of room to get
   * @returns {Observable.<Room>}
   * @memberof RoomsJSONAdapter
   */
  getRoom(ID) {
    return Observable.create((observer) => {
      if (this.datasource[ID]) {
        observer.next(this.datasource[ID]);
      } else {
        observer.error(new Error(`Could not find room with ID "${ID}"`));
      }

      observer.complete();
    });
  }

  /**
   * Returns an observable that emits an array of previous activity IDs of the given roomID.
   *
   * @param {string} ID  ID of the room to get.
   * @returns {Observable.<Array.<string>>}
   * @memberof RoomsAdapter
   */
  getPreviousRoomActivities(ID) {
    return Observable.create((observer) => {
      const data = !this.datasource[ID] ? [] : this.datasource[ID];

      observer.next(data);

      observer.complete();
    });
  }

  /**
   * Returns an observable that emits an array of current activity IDs of the given roomID.
   *
   * @param {string} ID  ID of the room to get.
   * @returns {Observable.<Array.<string>>}
   * @memberof RoomsAdapter
   */
  getRoomActivities(ID) {
    return Observable.create((observer) => {
      const data = !this.datasource[ID] ? [] : this.datasource[ID];

      observer.next(data);

      observer.complete();
    });
  }
}
