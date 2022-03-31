import {PeopleAdapter} from '@webex/component-adapter-interfaces';
import {Observable} from 'rxjs';

// TODO: Figure out how to import JS Doc definitions and remove duplication.
/**
 * A Webex user.
 *
 * @external Person
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/PeopleAdapter.js#L6}
 */

/**
 * @typedef PeopleJSON
 * @param {object} datasource An object that contains people keyed by ID.
 * @example
 * {
 *   "user-1": {
 *     "ID": "user-1",
 *     "emails": [
 *       "barbara.german@acme.com"
 *     ],
 *     "displayName": "Barbara German",
 *     "firstName": "Barbara",
 *     "lastName": "German",
 *     "nickName": "",
 *     "avatar": "<URL to avatar>",
 *     "orgID": "",
 *     "status": null
 *   },
 *   "user-2": {
 *     "ID": "user-2",
 *     "emails": [
 *       "giacomo.drago@acme.com"
 *     ],
 *     "displayName": "Giacomo Drago",
 *     "firstName": "Giacomo",
 *     "lastName": "Drago",
 *     "nickName": "",
 *     "avatar": "<URL to avatar>",
 *     "orgID": "",
 *     "status": "active"
 *   }
 * }
 */

/**
 * Helper to simulate network requests.
 *
 * @param {number} min Min number
 * @param {number} max Max number
 * @returns {number} A random number
 */
export function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * `PersonJSONAdapter` is an implementation of the `PeopleAdapter` interface.
 * This implementation utilizes a JSON object as its source of people data.
 *
 * @see {@link PeopleJSON}
 * @implements {PeopleAdapter}
 */
export default class PeopleJSONAdapter extends PeopleAdapter {
  /**
   * Returns an observable that emits person data of the current user.
   * Once the data is emitted, the observable completes.
   * To listen for data updates, `getMe()` should be concatenated with `getPerson()`.
   *
   * @see {@link getPerson}
   * @returns {Observable.<Person>} Observable that emits data of the "current" user
   */
  getMe() {
    const defaultUserID = 'user1';

    return Observable.create((observer) => {
      observer.next(this.datasource[defaultUserID]);
      observer.complete();
    });
  }

  /**
   * Returns an observable that emits person data of the given ID.
   * For this implementation, once the data is emitted, the observable completes.
   *
   * @param {string} ID ID of person to get
   * @returns {Observable.<Person>} Observable that emits data of the given person ID
   */
  getPerson(ID) {
    return Observable.create((observer) => {
      if (this.datasource[ID]) {
        setTimeout(() => {
          observer.next(this.datasource[ID]);
          observer.complete();
        }, randomIntFromInterval(500, 1000));
      } else {
        observer.error(new Error(`Could not find person with ID "${ID}"`));
      }
    });
  }
}
