import ActivitiesAdapter from './ActivitiesAdapter';

describe('Activities Adapter Interface', () => {
  let activitiesAdapter;

  beforeEach(() => {
    activitiesAdapter = new ActivitiesAdapter();
  });

  test('getActivity() returns an observable', () => {
    expect(rxjs.isObservable(activitiesAdapter.getActivity())).toBeTruthy();
  });

  test('getActivity() throws a proper error message', (done) => {
    activitiesAdapter.getActivity('msgID').subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe('getActivity(ID) must be defined in ActivitiesAdapter');
        done();
      }
    );
  });

  afterEach(() => {
    activitiesAdapter = null;
  });
});
