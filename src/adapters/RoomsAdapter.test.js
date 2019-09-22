import RoomsAdapter from './RoomsAdapter';

describe('Rooms Adapter Interface', () => {
  let roomsAdapter;

  beforeEach(() => {
    roomsAdapter = new RoomsAdapter();
  });

  test('getRoom() returns an observable', () => {
    expect(rxjs.isObservable(roomsAdapter.getRoom())).toBeTruthy();
  });

  test('getRoom() errors because it needs to be defined', (done) => {
    roomsAdapter.getRoom('ID').subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe('getRoom(ID) must be defined in RoomsAdapter');
        done();
      }
    );
  });

  test('getRoomActivities() returns an observable', () => {
    expect(rxjs.isObservable(roomsAdapter.getRoomActivities())).toBeTruthy();
  });

  test('getRoomActivities() errors because it needs to be defined', (done) => {
    roomsAdapter.getRoomActivities('id').subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe('getRoomActivities(ID) must be defined in RoomsAdapter');
        done();
      }
    );
  });

  test('getPreviousRoomActivities() returns an observable', () => {
    expect(rxjs.isObservable(roomsAdapter.getRoomActivities())).toBeTruthy();
  });

  test('getPreviousRoomActivities() errors because it needs to be defined', (done) => {
    roomsAdapter.getPreviousRoomActivities('id').subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe('getPreviousRoomActivities(ID) must be defined in RoomsAdapter');
        done();
      }
    );
  });

  test('hasMoreActivities() errors because it needs to be defined', () => {
    try {
      expect(roomsAdapter.hasMoreActivities('ID')).toThrowError();
      // eslint-disable-next-line no-empty
    } catch (error) {}
  });

  afterEach(() => {
    roomsAdapter = null;
  });
});
