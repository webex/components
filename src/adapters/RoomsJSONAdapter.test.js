import {isObservable} from 'rxjs';

import rooms from '../data/rooms';
import RoomsJSONAdapter from './RoomsJSONAdapter';

describe('Rooms JSON Adapter Interface', () => {
  let roomID;
  let roomsJSONAdapter;

  beforeEach(() => {
    [roomID] = Object.keys(rooms);
    roomsJSONAdapter = new RoomsJSONAdapter(rooms);
  });

  afterEach(() => {
    roomsJSONAdapter = null;
  });

  test('getRoom() returns an observable', () => {
    expect(isObservable(roomsJSONAdapter.getRoom())).toBeTruthy();
  });

  test('getRoom() returns a room data', (done) => {
    roomsJSONAdapter.getRoom(roomID).subscribe((data) => {
      expect(data).toEqual(rooms[roomID]);
      done();
    });
  });

  test('getRoom() throws a proper error message', (done) => {
    const wrongRoomID = 'wrongRoomID';

    roomsJSONAdapter.getRoom(wrongRoomID).subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe(`Could not find room with ID "${wrongRoomID}"`);
        done();
      },
    );
  });

  test('getRoom() completes the observable', (done) => {
    roomsJSONAdapter.getRoom(roomID).subscribe(
      () => {},
      () => {},
      () => {
        expect(true).toBeTruthy();
        done();
      },
    );
  });

  test('getActivitiesInRealTime() returns an observable', () => {
    expect(isObservable(roomsJSONAdapter.getActivitiesInRealTime())).toBeTruthy();
  });

  test('getActivitiesInRealTime() returns an array of previous activity IDs', (done) => {
    roomsJSONAdapter.getActivitiesInRealTime(roomID).subscribe((data) => {
      expect(data).toEqual(rooms[`${roomID}-activities`]);
      done();
    });
  });

  test('getActivitiesInRealTime() returns an observable to an empty array for a given wrong room ID', (done) => {
    const wrongRoomActivitiesID = 'wrongRoomActivitiesID';

    roomsJSONAdapter.getActivitiesInRealTime(wrongRoomActivitiesID).subscribe((data) => {
      expect(data).toEqual([]);
      done();
    });
  });

  test('getActivitiesInRealTime() returns objects with a date parameter for time rulers', (done) => {
    const timeRulerRoomID = 'room2';

    roomsJSONAdapter.getActivitiesInRealTime(timeRulerRoomID).subscribe((data) => {
      expect(data[1].date).toBeDefined();
      done();
    });
  });

  test('getActivitiesInRealTime() completes the observable', (done) => {
    roomsJSONAdapter.getActivitiesInRealTime(roomID).subscribe(
      () => {},
      () => {},
      () => {
        expect(true).toBeTruthy();
        done();
      },
    );
  });

  test('getPastActivities() returns an array of previous activity IDs', (done) => {
    roomsJSONAdapter.getPastActivities(roomID).subscribe((data) => {
      expect(data).toEqual(rooms[`${roomID}-previous-activities`]);
      done();
    });
  });

  test('getPastActivities() returns error on wrong room ID', (done) => {
    const wrongRoomActivitiesID = 'wrongRoomActivitiesID';
    const message = 'Could not find activities for room wrongRoomActivitiesID. Make sure room ID is valid!';

    roomsJSONAdapter.getPastActivities(wrongRoomActivitiesID).subscribe(
      () => {},
      (error) => {
        expect(error.message).toEqual(message);
        done();
      },
    );
  });

  test('getPastActivities() completes the observable when there is no more data', (done) => {
    // Set last searched index to last element in data
    roomsJSONAdapter.lastDataIndex[roomID] = rooms[`${roomID}-previous-activities`].length;

    roomsJSONAdapter.getPastActivities(roomID).subscribe(
      () => {},
      () => {},
      () => {
        expect(true).toBeTruthy();
        done();
      },
    );
  });

  test('hasMoreActivities() returns true if room has more activities to load', () => {
    roomsJSONAdapter.lastDataIndex[roomID] = 2; // Arbitrary small number

    expect(roomsJSONAdapter.hasMoreActivities(roomID)).toBeTruthy();
  });

  test('hasMoreActivities() returns false if the room has no more activities to load', () => {
    // Larger than the total
    roomsJSONAdapter.lastDataIndex[roomID] = rooms[`${roomID}-previous-activities`].length + 1;

    expect(roomsJSONAdapter.hasMoreActivities(roomID)).toBeFalsy();
  });

  describe('create Room()', () => {
    const title = 'widgets';

    test('create a room', (done) => {
      roomsJSONAdapter.createRoom({title}).subscribe((data) => {
        expect(data).toEqual(rooms[title]);
        done();
      });
    });

    test('throw an error when title not defined', (done) => {
      roomsJSONAdapter.createRoom({title: ''}).subscribe(
        () => {},
        (error) => {
          expect(error.message).toBe('error in creating room');
          done();
        },
      );
    });

    test('completes the observable', (done) => {
      roomsJSONAdapter.createRoom({title}).subscribe(
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
