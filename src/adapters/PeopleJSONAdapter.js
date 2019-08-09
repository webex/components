import {Observable} from 'rxjs';

import person from './../data/person';
import PeopleAdapter from './PeopleAdapter';

export default class PeopleJSONAdapter extends PeopleAdapter {
  /**
   * Returns an observable that emits person data.
   * Person data comes from JSON file `person.json` in the data folder.
   *
   * @param {String} id - ID of person to get
   * @returns {Observable<PersonObject>}
   * @memberof PeopleJSONAdapter
   */
  getPerson(id) {
    return Observable.create((observer) => {
      if (person.id === id) observer.next(person);
      else observer.error(new Error(`Could not find person with id "${id}"`));

      observer.complete();
    });
  }
}
