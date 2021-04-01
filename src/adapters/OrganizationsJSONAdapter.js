import {OrganizationsAdapter} from '@webex/component-adapter-interfaces';
import {Observable} from 'rxjs';
/**
 * An Organization object that is a set of people in Webex
 *
 * @external Organization
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/OrganizationsAdapter.js#L6}
 */

/**
 * @typedef OrganizationsJSON
 * @param {object} datasource An object that contains organizations keyed by ID
 * @example
 * {
 *  org1: {
 *    ID: 'org1',
 *    name: 'Cisco',
 *  },
 * }
 */

/**
 * `OrganizationsJSONAdapter` is an implementation of the `OrganizationsAdapter` interface.
 * The implementation utilizes a JSON object as its source of membership data.
 *
 * @see {@link OrganizationsJSON}
 * @implements {OrganizationsAdapter}
 */
export default class OrganizationsJSONAdapter extends OrganizationsAdapter {
  /**
   * Returns an observable that emits the organization object for the given ID.
   *
   * @param {string} ID ID of the organization to get
   * @returns {Observable.<Organization>} Observable stream that emits an organization object
   */
  getOrg(ID) {
    return new Observable((observer) => {
      const organization = Object.values(this.datasource).find(
        (org) => org.ID === ID,
      );

      if (organization) {
        observer.next(organization);
        observer.complete();
      } else {
        observer.error(new Error(`Could not find any organization with ID "${ID}"`));
      }
    });
  }
}
