import {PeopleAdapter} from '@webex/component-adapter-interfaces';
import {Observable} from 'rxjs';

/**
 * @typedef PeopleJSON
 * @param {object} datasource An object that contains a set of people keyed by ID.
 * @example
 * {
 *   "userid-1": {
 *     "ID": "userid-1",
 *     "emails": [
 *       "webexcmps@gmail.com"
 *     ],
 *     "displayName": "Webex Component User",
 *     "firstName": "Webex",
 *     "lastName": "Component User",
 *     "nickName": "Webex",
 *     "avatar": "https://4b4dc97add6b1dcc891a-54bf3b4e4579920861d23cc001530c2a.ssl.cf1.rackcdn.com/V1~b33cb17c-42e3-41ac-a045-497e4002646c~697607d5347442a990719dd5d80ce379~1600",
 *     "orgID": "Y2lzY29zcGFyazovL3VzL09SR0FOSVpBVElPTi9jb25zdW1lcg",
 *     "status": "unknown"
 *    }
 * }
 */

/**
 * Implements the PeopleAdapter interface with a JSON object as its datasource.
 *
 * @see {@link PeopleJSON} for example datasource.
 * @class
 * @implements {PeopleAdapter}
 */
export default class PeopleJSONAdapter extends PeopleAdapter {
  /**
   * Returns an observable that emits person data of the default user.
   *
   * @returns {Observable.<Person>}
   * @memberof PeopleJSONAdapter
   */
  getMe() {
    const defaultUserID = 'default';

    return Observable.create((observer) => {
      observer.next(this.datasource[defaultUserID]);
      observer.complete();
    });
  }

  /**
   * Returns an observable that emits person data of the given ID.
   *
   * @param {string} ID ID of person to get
   * @returns {Observable.<Person>}
   * @memberof PeopleJSONAdapter
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
}
