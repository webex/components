import {RoomsAdapter} from '@webex/component-adapter-interfaces';
import {Observable} from 'rxjs';

// TODO: Figure out how to import JS Doc definitions and remove duplication.
/**
 * A virtual space where people can collaborate in Webex.
 *
 * @external Room
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/RoomsAdapter.js#L7}
 */

// TODO: Figure out how to import JS Doc definitions and remove duplication.
/**
 * An activity that should be displayed as a time ruler.
 *
 * @external ActivityDate
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/RoomsAdapter.js#L16}
 */

/**
 * @typedef RoomJSON
 * @param {object} datasource An object that contains rooms keyed by ID.
 * @example
 * {
 *   "room-1": {
 *     "ID": "room-1",
 *     "title": "title",
 *     "roomType": "group"
 *   },
 *   "room-1-activities": []
 * }
 */

/**
 * `RoomsJSONAdapter` is an implementation of the `RoomsAdapter` interface.
 * This implementation utilizes a JSON object as its source of room data.
 *
 * @see {@link RoomsJSON}
 * @implements {RoomsAdapter}
 */
export default class RoomsJSONAdapter extends RoomsAdapter {
  constructor(datasource) {
    super(datasource);

    this.dataChunkSize = 4; // Arbitrary chunk size
    this.lastDataIndex = {}; // Keeps track of last index returned for each room
  }

  /**
   * Returns an observable that emits room data of the given ID.
   * For this implementation, once the data is emitted, the observable completes.
   *
   * @param {string} ID ID of room to get
   * @returns {Observable.<Room>} Observable that emits data of the given ID
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
   * Returns an observable that emits an array of activities the given roomID.
   * For this implementation, once the data is emitted, the observable completes.
   *
   * @param {string} ID  ID of the room for which to get activities
   * @returns {Observable.<Array.<string|ActivityDate>>} Observable that emits an array of activities
   */
  getActivitiesInRealTime(ID) {
    return Observable.create((observer) => {
      const data = !this.datasource[`${ID}-activities`] ? [] : this.datasource[`${ID}-activities`];

      observer.next(data);
      observer.complete();
    });
  }

  /**
   * Returns an observable that emits an array of past activity data of the given roomID.
   * If `hasMoreActivities` returns false, the observable will complete.
   * **Previous activity data must be sorted newest-to-oldest.**
   *
   * In a real-world scenario, "past" means any moment before the observable subscription.
   * For this implementation, activities considered "past" are stored in a separate attribute
   * than the activities considered "current".
   *
   * Past activities are emitted by chunks.
   * The next chunk is based on the adapter's `dataChunkSize`.
   *
   * @param {string} ID  ID of the room for which to get activities
   * @returns {Observable.<Array.<string|ActivityDate>>} Observable that emits an array of past activities of the room
   */
  getPastActivities(ID) {
    return Observable.create((observer) => {
      if (`${ID}-previous-activities` in this.datasource) {
        if (this.hasMoreActivities(ID)) {
          let data = [];
          const startIndex = this.lastDataIndex[ID] ? this.lastDataIndex[ID] : 0;
          const endIndex = startIndex + this.dataChunkSize;

          data = this.datasource[`${ID}-previous-activities`].slice(startIndex, endIndex);
          this.lastDataIndex[ID] = endIndex;

          observer.next(data);
        } else {
          // If no more data to send, complete observable
          observer.complete();
        }
      } else {
        const message = `Could not find activities for room ${ID}. Make sure room ID is valid!`;

        observer.error(new Error(message));
      }
    });
  }

  /**
   * Returns `true` if there are more activities to load from the room of the given ID.
   * Otherwise, it returns `false`.
   *
   * @param {string} ID ID of the room for which to verify activities
   * @returns {boolean} Whether or not the room has more activities to send
   */
  hasMoreActivities(ID) {
    // If no data yet, initialize data index
    this.lastDataIndex[ID] = this.lastDataIndex[ID] ? this.lastDataIndex[ID] : 0;
    let result = false;

    if (`${ID}-previous-activities` in this.datasource) {
      result = this.lastDataIndex[ID] < this.datasource[`${ID}-previous-activities`].length;
    }

    return result;
  }

  /**
   * Creates a room and returns room ID
   *
   * @param {object} room Information about the room to create.
   * @returns {Observable.<Room>} Observable that emits created room data
   */
  createRoom(room) {
    return new Observable((observer) => {
      if (room.title && this.datasource[room.title]) {
        observer.next(this.datasource[room.title]);
      } else {
        observer.error(new Error('error in creating room'));
      }
      observer.complete();
    });
  }
}
