import {ActivitiesAdapter} from '@webex/component-adapter-interfaces';
import {Observable} from 'rxjs';

// TODO: Figure out how to import JS Doc definitions and remove duplication.
/**
 * An activity a person performs in Webex.
 *
 * @external Activity
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/ActivitiesAdapter.js#L6}
 */

/**
 * @typedef ActivitiesJSON
 * @param {object} datasource An object that contains activities keyed by ID
 * @example
 * {
 *   "activity-1": {
 *     "ID": "activity-1",
 *     "roomID": "roomID",
 *     "text": "Hey Barbara, how is it going?",
 *     "personID": "user-2",
 *     "created": "created",
 *     "displayAuthor": false
 *   },
 *   "activity-2": {
 *     "ID": "activity-2",
 *     "roomID": "roomID",
 *     "text": "Oh no! That's terrible 😔",
 *     "personID": "user-2",
 *     "created": "created",
 *     "displayAuthor": true
 *   }
 * }
 */

/**
 * `ActivitiesJSONAdapter` is an implementation of the `ActivitiesAdapter` interface.
 * This implementation utilizes a JSON object as its source of activity data.
 *
 * @see {@link ActivitiesJSON}
 * @implements {ActivitiesAdapter}
 */
export default class ActivitiesJSONAdapter extends ActivitiesAdapter {
  /**
   * Returns an observable that emits activity data of the given ID.
   * For this implementation, once the data is emitted, the observable completes.
   *
   * @param {string} ID ID of activity to get
   * @returns {Observable.<Activity>} Observable that emits data of the given ID
   */
  getActivity(ID) {
    return Observable.create((observer) => {
      if (this.datasource[ID]) {
        observer.next(this.datasource[ID]);
      } else {
        observer.error(new Error(`Could not find activity with ID "${ID}"`));
      }
      console.log(123);
      observer.complete();
    });
  }
}
