import {isObservable} from 'rxjs';
import {last} from 'rxjs/operators';
import activities from '../data/activities';
import ActivitiesJSONAdapter from './ActivitiesJSONAdapter';

describe('Activities JSON Adapter', () => {
  const activityID = 'activity9';
  let activitiesJSONAdapter;
  let mockActivitiesString;
  let mockActivitiesCopy;
  let testActivity;

  beforeEach(() => {
    mockActivitiesString = JSON.stringify(activities);
    mockActivitiesCopy = JSON.parse(mockActivitiesString);

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

  describe('postActivity()', () => {
    const activityData = {
      roomID: 'roomID',
      text: 'text',
      card: {
        $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
        type: 'AdaptiveCard',
        version: '1.2',
        body: [
          {
            type: 'TextBlock',
            text: 'Adaptive Cards',
            size: 'large',
          },
        ],
        actions: [
          {
            type: 'Action.OpenUrl',
            url: 'http://adaptivecards.io',
            title: 'Learn More',
          },
        ],
      },
      displayHeader: true,
    };

    test('returns an observable', () => {
      expect(isObservable(activitiesJSONAdapter.postActivity())).toBeTruthy();
    });

    test('emits the posted Activity object', (done) => {
      activitiesJSONAdapter.postActivity(activityData).pipe(last()).subscribe((activity) => {
        expect(activity).toMatchObject(mockActivitiesCopy[
          Object.keys(mockActivitiesCopy).slice(-1)[0]
        ]);
        done();
      });
    });

    test('emits an error on invalid room id', (done) => {
      activitiesJSONAdapter.postActivity({roomID: undefined}).subscribe(
        () => {},
        (error) => {
          expect(error.message).toBe('Unable to post an activity in room with id undefined');
          done();
        },
      );
    });
  });
});
