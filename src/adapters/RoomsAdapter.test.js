import RoomsAdapter from './RoomsAdapter';

describe('Rooms Adapter Interface', () => {
  let roomsAdapter;

  beforeEach(() => {
    roomsAdapter = new RoomsAdapter();
  });

  test('getRoom() returns an observable', () => {
    expect(rxjs.isObservable(roomsAdapter.getRoom())).toBeTruthy();
  });

  test('getRoom() throws a proper error message', (done) => {
    roomsAdapter.getRoom('id').subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe('getRoom(ID) must be defined in RoomsAdapter');
        done();
      }
    );
  });

  test('getPreviousRoomActivities() returns an observable', () => {
    expect(rxjs.isObservable(roomsAdapter.getPreviousRoomActivities())).toBeTruthy();
  });

  test('getPreviousRoomActivities() throws a proper error message', (done) => {
    roomsAdapter.getPreviousRoomActivities('id').subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe('getPreviousRoomActivities(ID) must be defined in RoomsAdapter');
        done();
      }
    );
  });

  test('getRoomActivities() returns an observable', () => {
    expect(rxjs.isObservable(roomsAdapter.getRoomActivities())).toBeTruthy();
  });

  test('getRoomActivities() throws a proper error message', (done) => {
    roomsAdapter.getRoomActivities('id').subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe('getRoomActivities(ID) must be defined in RoomsAdapter');
        done();
      }
    );
  });

  afterEach(() => {
    roomsAdapter = null;
  });
});
