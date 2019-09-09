import rooms from './../data/rooms';
import RoomsJSONAdapter from './RoomsJSONAdapter';

describe('Rooms JSON Adapter Interface', () => {
  let roomsJSONAdapter, roomID, roomActivitiesID;

  beforeEach(() => {
    [roomID, roomActivitiesID] = Object.keys(rooms);
    roomsJSONAdapter = new RoomsJSONAdapter(rooms);
  });

  test('getRoom() returns an observable', () => {
    expect(rxjs.isObservable(roomsJSONAdapter.getRoom())).toBeTruthy();
  });

  test('getRoom() returns a person data', (done) => {
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
      }
    );
  });

  test('getRoom() completes the observable', (done) => {
    roomsJSONAdapter.getRoom(roomID).subscribe(
      () => {},
      () => {},
      () => {
        expect(true).toBeTruthy();
        done();
      }
    );
  });

  test('getPreviousRoomActivities() returns an observable', () => {
    expect(rxjs.isObservable(roomsJSONAdapter.getPreviousRoomActivities())).toBeTruthy();
  });

  test('getPreviousRoomActivities() returns an array of previous activity IDs', (done) => {
    roomsJSONAdapter.getPreviousRoomActivities(roomActivitiesID).subscribe((data) => {
      expect(data).toEqual(rooms[roomActivitiesID]);
      done();
    });
  });

  test('getPreviousRoomActivities() returns an observable to an empty array for a given wrong room ID', (done) => {
    const wrongRoomActivitiesID = 'wrongRoomActivitiesID';

    roomsJSONAdapter.getRoomActivities(wrongRoomActivitiesID).subscribe((data) => {
      expect(data).toEqual([]);
      done();
    });
  });

  test('getPreviousRoomActivities() completes the observable', (done) => {
    roomsJSONAdapter.getPreviousRoomActivities(roomID).subscribe(
      () => {},
      () => {},
      () => {
        expect(true).toBeTruthy();
        done();
      }
    );
  });

  test('getRoomActivities() returns an observable', () => {
    expect(rxjs.isObservable(roomsJSONAdapter.getRoomActivities())).toBeTruthy();
  });

  test('getRoomActivities() returns an array of previous activity IDs', (done) => {
    roomsJSONAdapter.getRoomActivities(roomActivitiesID).subscribe((data) => {
      expect(data).toEqual(rooms[roomActivitiesID]);
      done();
    });
  });

  test('getRoomActivities() returns an observable to an empty array for a given wrong room ID', (done) => {
    const wrongRoomActivitiesID = 'wrongRoomActivitiesID';

    roomsJSONAdapter.getRoomActivities(wrongRoomActivitiesID).subscribe((data) => {
      expect(data).toEqual([]);
      done();
    });
  });

  test('getRoomActivities() completes the observable', (done) => {
    roomsJSONAdapter.getRoomActivities(roomID).subscribe(
      () => {},
      () => {},
      () => {
        expect(true).toBeTruthy();
        done();
      }
    );
  });

  afterEach(() => {
    roomsJSONAdapter = null;
  });
});
