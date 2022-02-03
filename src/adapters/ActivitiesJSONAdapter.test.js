import {isObservable} from 'rxjs';
import {last} from 'rxjs/operators';
import activities from '../data/activities';
import ActivitiesJSONAdapter from './ActivitiesJSONAdapter';

describe('Activities JSON Adapter', () => {
  const activityID = 'activity9';
  let activitiesJSONAdapter;
  let testActivity;

  beforeEach(() => {
    const mockActivitiesString = JSON.stringify(activities);
    const mockActivitiesCopy = JSON.parse(mockActivitiesString);

    activitiesJSONAdapter = new ActivitiesJSONAdapter(mockActivitiesCopy);
    testActivity = mockActivitiesCopy[activityID];
  });

  afterEach(() => {
    activitiesJSONAdapter = null;
    testActivity = null;
  });

  describe('getActivity()', () => {
    test('returns an observable', () => {
      expect(isObservable(activitiesJSONAdapter.getActivity())).toBeTruthy();
    });

    test('emits an Activity object on subscription', (done) => {
      activitiesJSONAdapter.getActivity(activityID).subscribe((data) => {
        expect(data).toEqual({
          ...testActivity,
          card: testActivity.attachments && testActivity.attachments[0].content,
        });
        done();
      });
    });

    test('throws a proper error message when activity doesn\'t exist', (done) => {
      const wrongActivityID = 'wrongActivityID';

      activitiesJSONAdapter.getActivity(wrongActivityID).subscribe(
        () => {
          done.fail('Emits activity instead of returning error');
        },
        (error) => {
          expect(error.message).toBe(`Could not find activity with ID "${wrongActivityID}"`);
          done();
        },
      );
    });

    test('completes the observable', (done) => {
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

  describe('postAction()', () => {
    const inputs = {
      firstName: 'Simon',
      lastName: 'Damiano',
    };

    test('returns an observable', () => {
      expect(isObservable(activitiesJSONAdapter.postAction())).toBeTruthy();
    });

    test('emits the posted action object', (done) => {
      activitiesJSONAdapter.postAction(activityID, inputs).pipe(last()).subscribe((action) => {
        expect(action).toMatchObject(testActivity.actions.slice(-1)[0]);
        done();
      });
    });

    test('emits an error on invalid activity ID', (done) => {
      activitiesJSONAdapter.postAction('activity10', {}).subscribe(
        () => {},
        (error) => {
          expect(error.message).toBe('Unable to create an attachment action for activity with id "activity10"');
          done();
        },
      );
    });
  });
});
