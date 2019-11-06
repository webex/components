import meetings from './../data/meetings';
import MeetingsJSONAdapter, {MEETING_STATE_ACTIVE} from './MeetingsJSONAdapter';

describe('Meetings JSON Adapter', () => {
  let meetingsJSONAdapter, meetingID;

  beforeEach(() => {
    [meetingID] = Object.keys(meetings);
    meetingsJSONAdapter = new MeetingsJSONAdapter(meetings);
  });

  describe('getMeeting()', () => {
    test('returns an observable', () => {
      expect(rxjs.isObservable(meetingsJSONAdapter.getMeeting())).toBeTruthy();
    });

    test('emits meeting data after subscription', (done) => {
      meetingsJSONAdapter.getMeeting(meetingID).subscribe((data) => {
        expect(data).toEqual(meetings[meetingID]);
        done();
      });
    });

    test('throws a proper error message', (done) => {
      const wrongMeetingID = 'wrongMeetingID';

      meetingsJSONAdapter.getMeeting(wrongMeetingID).subscribe(
        () => {},
        (error) => {
          expect(error.message).toBe(`Could not find meeting with ID "${wrongMeetingID}"`);
          done();
        }
      );
    });

    test('completes the observable', (done) => {
      meetingsJSONAdapter.getMeeting(meetingID).subscribe(
        () => {},
        () => {},
        () => {
          expect(true).toBeTruthy();
          done();
        }
      );
    });
  });

  describe('meetingControls', () => {
    test('exists', () => {
      expect(meetingsJSONAdapter.meetingControls).toBeDefined();
    });

    describe('join control', () => {
      test('exists', () => {
        expect(meetingsJSONAdapter.meetingControls.join).toBeDefined();
      });

      test('action returns an observable', () => {
        expect(rxjs.isObservable(meetingsJSONAdapter.meetingControls.join.action())).toBeTruthy();
      });

      test('action emits active state after joining', (done) => {
        meetingsJSONAdapter.meetingControls.join.action(meetingID).subscribe((data) => {
          expect(data).toEqual(MEETING_STATE_ACTIVE);
          done();
        });
      });

      test('throws a proper error message', (done) => {
        const wrongMeetingID = 'wrongMeetingID';

        meetingsJSONAdapter.meetingControls.join.action(wrongMeetingID).subscribe(
          () => {},
          (error) => {
            expect(error.message).toBe(`Could not find meeting with ID "${wrongMeetingID}"`);
            done();
          }
        );
      });

      test('completes the observable', (done) => {
        meetingsJSONAdapter.meetingControls.join.action(meetingID).subscribe(
          () => {},
          () => {},
          () => {
            expect(true).toBeTruthy();
            done();
          }
        );
      });
    });
  });

  afterEach(() => {
    meetingsJSONAdapter = null;
  });
});
