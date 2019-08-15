import {throwError} from 'rxjs';

/**
 * This is a base class that defines the interface that maps people data.
 * Developers that want to extend `PeopleAdapter` must implement all of its methods,
 * adhering to the exact parameters and structure of the returned objects
 */
export default class PeopleAdapter {
  /**
   * The status a person can have.
   * @typedef {null|'active'|'bot'|'call'|'dnd'|'group'|'inactive'|'meeting'|'ooo'|'presenting'|'self'|'typing'} PersonStatus
   */

  /**
   * A Person object with details about the person.
   * @typedef {Object} Person
   * @property {string}         ID          The person identifier.
   * @property {Array.<string>} emails      An array of emails for the person.
   * @property {string}         displayName The name to be displayed for the person.
   * @property {string}         firstName   The first name of the person.
   * @property {string}         lastName    The last name of the person.
   * @property {string}         nickName    The short name for the person.
   * @property {string}         avatar      The full url to the person's avatar.
   * @property {string}         orgID       The ID of the organization the person belongs to.
   * @property {PersonStatus}   status      The presence status of the user.
   */

  /**
   * Returns an observable that emits person data of the given ID.
   *
   * @param {string} ID ID of person to get.
   * @returns {Observable.<Person>}
   * @memberof PeopleAdapter
   */
  // eslint-disable-next-line no-unused-vars
  getPerson(ID) {
    return throwError(new Error('getPerson(ID) must be defined in PeopleAdapter'));
  }
}
