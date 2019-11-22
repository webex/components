import meetings from './../data/meetings';
import MeetingsJSONAdapter from './MeetingsJSONAdapter';

describe('Meetings JSON Adapter', () => {
  let meetingsJSONAdapter, meetingID;

  beforeEach(() => {
    [meetingID] = Object.keys(meetings);
    meetingsJSONAdapter = new MeetingsJSONAdapter(meetings);
    meetingsJSONAdapter.getLocalVideo = jest.fn(() => Promise.resolve('mock-stream'));
  });

  test('getMeeting() returns an observable', () => {
    expect(rxjs.isObservable(meetingsJSONAdapter.getMeeting())).toBeTruthy();
  });

  test('getMeeting() returns a meeting data', (done) => {
    meetingsJSONAdapter.getMeeting(meetingID).subscribe((data) => {
      expect(data).toEqual(meetings[meetingID]);
      done();
    });
  });

  test('getMeeting() throws a proper error message', (done) => {
    const wrongMeetingID = 'wrongMeetingID';

    meetingsJSONAdapter.getMeeting(wrongMeetingID).subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe(`Could not find meeting with ID "${wrongMeetingID}"`);
        done();
      }
    );
  });

  test('getMeeting() completes the observable', (done) => {
    meetingsJSONAdapter.getMeeting(meetingID).subscribe(
      () => {},
      () => {},
      () => {
        expect(true).toBeTruthy();
        done();
      }
    );
  });

  test('getMeeting() renders the local media if localVideo property is defined', (done) => {
    meetingsJSONAdapter.getMeeting('localVideo').subscribe((data) => {
      expect(data.localVideo).toEqual('mock-stream');
      done();
    });
  });

  afterEach(() => {
    meetingsJSONAdapter = null;
  });
});
