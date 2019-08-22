import {Observable} from 'rxjs';

import ActivitiesAdapter from './ActivitiesAdapter';

/**
 * @typedef ActivitiesJSON
 * @param {object} datasource An object that contains a set of activities keyed by ID.
 * @example
 * {
 *   "activity-1": {
 *     "ID": "activity-1",
 *     "roomID": "roomID",
 *     "text": "text",
 *     "personID": "personID",
 *     "created": "created",
 *     "displayAuthor": false
 *    }
 * }
 */

/*
 * Implements the ActivitiesAdapter interface with a JSON object as its datasource. See @ActivitiesJSON
 */
export default class ActivitiesJSONAdapter extends ActivitiesAdapter {
  constructor(datasource) {
    super(datasource);
    this.getActivity = this.getActivity.bind(this);
  }

  /**
   * Returns an observable that emits activity data of the given ID.
   *
   * @param {string} ID ID of activity to get
   * @returns {Observable.<Activity>}
   * @memberof ActivityJSONAdapter
   */
  getActivity(ID) {
    return Observable.create((observer) => {
      if (this.datasource[ID]) {
        observer.next(this.datasource[ID]);
      } else {
        observer.error(new Error(`Could not find activity with ID "${ID}"`));
      }

      observer.complete();
    });
  }
}
