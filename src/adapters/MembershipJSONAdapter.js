import {MembershipsAdapter} from '@webex/component-adapter-interfaces';
import {Observable} from 'rxjs';

// TODO: Figure out how to import JS Doc definitions and remove duplication.
/**
 * A Member object that is part of a membership
 *
 * @external Member
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
 *       {"ID": "person-1"},
 *       {"ID": "person-2"},
 *       {"ID": "person-5"},
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
   * Returns an observable that emits a list of members for the first destination
   * found that matches the given ID and type.
   * For this implementation, once the list of members is emitted, the observable completes.
   *
   * @param {string} destinationID A unique identifier for a meeting/space location
   * @param {DestinationType} destinationType Type of destination of the membership
   * @returns {Observable.<Array.<Member>>} Observable that emits data of the given ID
   */
  getMembersFromDestination(destinationID, destinationType) {
    return Observable.create((observer) => {
      const membership = Object.values(this.datasource).find(
        (destination) => destination.destinationID === destinationID
          && destination.destinationType === destinationType,
      );

      if (membership) {
        observer.next(membership.members);
      } else {
        observer.error(new Error(`Could not find members for destination "${destinationID}"`));
      }

      observer.complete();
    });
  }
}
