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
        observer.next(this.datasource[ID]);
      } else {
        observer.error(new Error(`Could not find person with ID "${ID}"`));
      }

      observer.complete();
    });
  }

  /**
   * Returns an observable that returns the persons list based
   * on search query
   *
   * @param {string} query string to search list of people
   * @returns {Observable.<Person>} Observable that emits person list
   */
  searchPeople(query) {
    return new Observable((observer) => {
      if (this.datasource[query]) {
        setTimeout(() => {
          observer.next(this.datasource[query]);
          observer.complete();
        }, 500);
      } else {
        observer.error(new Error(`could not find the person with query${query}`));
        observer.complete();
      }
    });
  }
}
