import activities from './../data/activities';
import ActivitiesJSONAdapter from './ActivitiesJSONAdapter';

describe('Activities JSON Adapter Interface', () => {
  let activitiesJSONAdapter, activityID;

  beforeEach(() => {
    [activityID] = Object.keys(activities);
    activitiesJSONAdapter = new ActivitiesJSONAdapter(activities);
  });

  test('getActivity() returns an observable', () => {
    expect(rxjs.isObservable(activitiesJSONAdapter.getActivity())).toBeTruthy();
  });

  test('getActivity() returns an activity', (done) => {
    activitiesJSONAdapter.getActivity(activityID).subscribe((data) => {
      expect(data).toEqual(activities[activityID]);
      done();
    });
  });

  test(`getActivity() throws a proper error message when activity doesn't exist`, (done) => {
    const wrongActivityID = 'wrongActivityID';

    activitiesJSONAdapter.getActivity(wrongActivityID).subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe(`Could not find activity with ID "${wrongActivityID}"`);
        done();
      }
    );
  });

  test('getActivity() completes the observable', (done) => {
    activitiesJSONAdapter.getActivity(activityID).subscribe(
      () => {},
      () => {},
      () => {
        expect(true).toBeTruthy();
        done();
      }
    );
  });

  afterEach(() => {
    activityID = null;
    activitiesJSONAdapter = null;
  });
});
