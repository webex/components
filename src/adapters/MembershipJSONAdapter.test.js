import {isObservable} from 'rxjs';

import JSONData from '../data/memberships';
import MembershipJSONAdapter from './MembershipJSONAdapter';

describe('Membership JSON Adapter', () => {
  const destinationID = 'room1';
  const destinationType = 'room';
  const membershipID = 'membership1';
  let membershipJSONAdapter;
  let testMembership;
  let roomID = '1';
  const personID = 'user1';

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

    test('emits a list of Member objects on subscription', (done) => {
      membershipJSONAdapter.getMembersFromDestination(destinationID, destinationType)
        .subscribe((members) => {
          expect(members).toMatchObject(testMembership.members);
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

  describe('addRoomMember()', () => {
    test('returns an observable', () => {
      expect(isObservable(membershipJSONAdapter.addRoomMember())).toBeTruthy();
    });

    test('add members to room', (done) => {
      membershipJSONAdapter.addRoomMember(personID, roomID).subscribe((data) => {
        expect(data).toMatchObject({
          ID: '1',
          roomID: '1',
          roomType: 'group',
          isModerator: false,
          personID,
        });
        done();
      });
    });

    test('throw an error when invalid room ID', (done) => {
      roomID = 'invalid';
      membershipJSONAdapter.addRoomMember(personID, roomID).subscribe(
        () => {},
        (error) => {
          expect(error.message).toBe('Could not add members to room');
          done();
        },
      );
    });
  });
});
