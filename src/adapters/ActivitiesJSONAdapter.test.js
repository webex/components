import {isObservable} from 'rxjs';

import activities from '../data/activities.json';
import ActivitiesJSONAdapter from './ActivitiesJSONAdapter';

describe('Activities JSON Adapter Interface', () => {
  let activityID;
  let activitiesJSONAdapter;

  beforeEach(() => {
    [activityID] = Object.keys(activities);
    activitiesJSONAdapter = new ActivitiesJSONAdapter(activities);
  });

  afterEach(() => {
    activityID = null;
    activitiesJSONAdapter = null;
  });

  test('getActivity() returns an observable', () => {
    expect(isObservable(activitiesJSONAdapter.getActivity())).toBeTruthy();
  });

  test('getActivity() returns an activity', (done) => {
    activitiesJSONAdapter.getActivity(activityID).subscribe((data) => {
      expect(data).toEqual(activities[activityID]);
      done();
    });
  });

  test('getActivity() throws a proper error message when activity doesn\'t exist', (done) => {
    const wrongActivityID = 'wrongActivityID';

    activitiesJSONAdapter.getActivity(wrongActivityID).subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe(`Could not find activity with ID "${wrongActivityID}"`);
        done();
      },
    );
  });

  test('getActivity() completes the observable', (done) => {
    activitiesJSONAdapter.getActivity(activityID).subscribe(
      () => {},
      () => {},
      () => {
        expect(true).toBeTruthy();
        done();
      },
    );
  });
});
