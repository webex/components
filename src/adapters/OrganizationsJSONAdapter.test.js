import {isObservable} from 'rxjs';

import organizations from '../data/organizations';
import OrganizationsJSONAdapter from './OrganizationsJSONAdapter';

describe('Organization JSON Adapter', () => {
  let ID;
  let organizationsJSONAdapter;

  beforeEach(() => {
    [ID] = Object.keys(organizations);
    organizationsJSONAdapter = new OrganizationsJSONAdapter(organizations);
  });

  afterEach(() => {
    ID = null;
    organizationsJSONAdapter = null;
  });

  describe('getOrg()', () => {
    test('returns an observable', () => {
      expect(isObservable(organizationsJSONAdapter.getOrg())).toBeTruthy();
    });

    test('emits an organization object', (done) => {
      organizationsJSONAdapter.getOrg(ID).subscribe((org) => {
        expect(org).toEqual(organizations[ID]);
        done();
      });
    });

    test('throws a proper error message', (done) => {
      const wrongOrgID = 'wrongOrgID';

      organizationsJSONAdapter.getOrg(wrongOrgID).subscribe(
        () => {},
        (error) => {
          expect(error.message).toBe(`Could not find any organization with ID "${wrongOrgID}"`);
          done();
        },
      );
    });

    test('completes the observable', (done) => {
      organizationsJSONAdapter.getOrg(ID).subscribe(
        () => {},
        () => {},
        () => {
          expect(true).toBeTruthy();
          done();
        },
      );
    });
  });
});
