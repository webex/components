import {MembershipsAdapter} from '@webex/component-adapter-interfaces';
import {Observable} from 'rxjs';

// TODO: Figure out how to import JS Doc definitions and remove duplication.
/**
 * A relationship between a destination (e.g. room, meeting) in Webex and people.
 *
 * @external Membership
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MembershipsAdapter.js#L6}
 */

// TODO: Figure out how to import JS Doc definitions and remove duplication.
/**
 * Enum for types of destinations.
 *
 * @external DestinationType
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MembershipsAdapter.js#L21}
 */

/**
 * @typedef MembershipsJSON
 * @param {object} datasource An object that contains memberships keyed by ID
 * @example
 * {
 *   "membership-1": {
 *     "ID": "membership-1",
 *     "destinationID": "room-3",
 *     "destinationType": "room"
 *     "members": [
 *       {"personID": "person-1"},
 *       {"personID": "person-2"},
 *       {"personID": "person-5"},
 *     ]
 *   }
 * }
 */

/**
 * `MembershipsJSONAdapter` is an implementation of the `MembershipAdapter` interface.
 * The implementation utilizes a JSON object as its source of membership data.
 *
 * @see {@link MembershipsJSON}
 * @implements {MembershipsAdapter}
 */
export default class MembershipJSONAdapter extends MembershipsAdapter {
  /**
   * Returns an observable that emits membership data for the given destination.
   * For this implementation, once the data is emitted, the observable completes.
   *
   * @param {string} destinationID A unique identifier for a meeting/space location
   * @param {DestinationType} destinationType Type of destination of the membership
   * @returns {Observable.<Membership>} Observable that emits data of the given ID
   */
  getMembers(destinationID, destinationType) {
    return Observable.create((observer) => {
      const data = this.datasource[destinationID];

      if (data && data.destinationType === destinationType) {
        observer.next(data);
      } else {
        observer.error(new Error(`Could not find members for destination "${destinationID}"`));
      }

      observer.complete();
    });
  }
}
