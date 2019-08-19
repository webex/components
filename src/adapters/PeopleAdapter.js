import {throwError} from 'rxjs';

import WebexAdapter from './WebexAdapter';

/**
 * Enum for person status values.
 *
 * @readonly
 * @enum {string}
 */
export const PersonStatus = {
  ACTIVE: 'active',
  BOT: 'bot',
  CALL: 'call',
  DO_NOT_DISTURB: 'dnd',
  INACTIVE: 'inactive',
  MEETING: 'meeting',
  OUT_OF_OFFICE: 'ooo',
  PRESENTING: 'presenting',
  SELF: 'self',
  TYPING: 'typing',
};

/**
 * This is a base class that defines the interface that maps people data.
 * Developers that want to extend `PeopleAdapter` must implement all of its methods,
 * adhering to the exact parameters and structure of the returned objects.
 */
export default class PeopleAdapter extends WebexAdapter {
  /**
   * A Person object with details about the person.
   * @typedef {Object} Person
   * @property {string}               ID          The person identifier.
   * @property {Array.<string>}       emails      An array of emails for the person.
   * @property {string}               displayName The name to be displayed for the person.
   * @property {string}               firstName   The first name of the person.
   * @property {string}               lastName    The last name of the person.
   * @property {string}               nickName    The short name for the person.
   * @property {string}               avatar      The full url to the person's avatar.
   * @property {string}               orgID       The ID of the organization the person belongs to.
   * @property {null|PersonStatus}    status      The presence status of the user. @see PersonStatus enum
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
