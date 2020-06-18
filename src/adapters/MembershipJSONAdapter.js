import {Observable} from 'rxjs';

/**
 * @typedef MembershipJSON
 * @param {object} datasource An object that maps meeting/space "locations" (some unique identifier) to
 * an array of member objects
 * @example
 * {
 *   "default_membership": {
 *   "ID": "default",
 *   "destinationID": "",
 *   "members": [{"personID": "default"}, {"personID": "self"}, {"personID": "call"}, {"personID": "presenting"}]
 * }
}

 */

/**
 * @see {@link MemberJSON}
 * @class
 */
export default class MembershipJSONAdapter {
  /**
   * @param {object} datasource An object that maps meeting/space "locations" (some unique identifier) to
   * an array of member objects
   */
  constructor(datasource) {
    this.datasource = datasource;
  }

  /**
   * @param {string} destinationID A unique identifier for a meeting/space location
   * @returns {Observable.<Membership>}
   */
  getMembers(destinationID) {
    return Observable.create((observer) => {
      if (this.datasource[destinationID]) {
        observer.next(this.datasource[destinationID]);
      } else {
        observer.error(new Error(`Could not find members for destination "${destinationID}"`));
      }
    });
  }
}
