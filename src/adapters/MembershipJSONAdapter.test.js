import {isObservable} from 'rxjs';

import JSONData from '../data/memberships';
import MembershipJSONAdapter from './MembershipJSONAdapter';

describe('Membership JSON Adapter', () => {
  const destinationID = 'room1';
  const destinationType = 'room';
  const membershipID = 'membership1';
  let membershipJSONAdapter;
  let testMembership;

  beforeEach(() => {
    membershipJSONAdapter = new MembershipJSONAdapter(JSONData);
    testMembership = JSONData[membershipID];
  });

  afterEach(() => {
    membershipJSONAdapter = null;
    testMembership = null;
  });

  describe('getMembersFromDestination()', () => {
    test('returns an observable', () => {
      expect(isObservable(membershipJSONAdapter.getMembersFromDestination())).toBeTruthy();
    });

    test('emits a Membership object on subscription', (done) => {
      membershipJSONAdapter.getMembersFromDestination(destinationID, destinationType)
        .subscribe((membership) => {
          expect(membership).toMatchObject(testMembership);
          done();
        });
    });

    test('throws error on invalid destinationID', (done) => {
      membershipJSONAdapter.getMembersFromDestination('invalid').subscribe(
        () => { },
        (error) => {
          expect(error.message).toBe('Could not find members for destination "invalid"');
          done();
        },
      );
    });
  });
});
