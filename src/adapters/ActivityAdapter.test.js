import ActivityAdapter from './ActivityAdapter';

describe('Activity Adapter Interface', () => {
  let activityAdapter;

  beforeEach(() => {
    activityAdapter = new ActivityAdapter();
  });

  test('getMessage() returns an observable', () => {
    expect(rxjs.isObservable(activityAdapter.getMessage())).toBeTruthy();
  });

  test('getMessage() throws a proper error message', (done) => {
    activityAdapter.getMessage('msgID').subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe('getMessage(ID) must be defined in ActivityAdapter');
        done();
      }
    );
  });

  afterEach(() => {
    activityAdapter = null;
  });
});
