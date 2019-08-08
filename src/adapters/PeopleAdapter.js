import {throwError} from 'rxjs';

/**
 * This is a base class that defines the interface that maps people data.
 * Developers that want to extend `PeopleAdapter` must implement all of its methods,
 * adhering to the exact parameters and structure of the returned objects
 */
export default class PeopleAdapter {
  /**
   * Returns an observable that emits person data
   *
   * @param {String} id - ID of person to get
   * @returns {Observable<PersonObject>}
   * @memberof PeopleAdapter
   */
  // eslint-disable-next-line no-unused-vars
  getPerson(id) {
    return throwError(new Error('getPerson(id) must be defined in PeopleAdapter'));
  }
}
