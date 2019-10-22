import MeetingsAdapter from './MeetingsAdapter';

describe('Meetings Adapter Interface', () => {
  let meetingsAdapter;

  beforeEach(() => {
    meetingsAdapter = new MeetingsAdapter();
  });

  test('getMeeting() returns an observable', () => {
    expect(rxjs.isObservable(meetingsAdapter.getMeeting())).toBeTruthy();
  });

  test('getMeeting() throws a proper error message', (done) => {
    meetingsAdapter.getMeeting('msgID').subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe('getMeeting(ID) must be defined in MeetingsAdapter');
        done();
      }
    );
  });

  test('getMeetingID() errors because it needs to be defined', (done) => {
    meetingsAdapter.getMeetingID().subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe('getMeetingID(destinationID, destinationType) must be defined in MeetingsAdapter');
        done();
      }
    );
  });

  test('setLocalAudioMuted() errors because it needs to be defined', (done) => {
    meetingsAdapter.setLocalAudioMuted().subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe('setLocalAudioMuted(audioMuted, meetingID) must be defined in MeetingsAdapter');
        done();
      }
    );
  });

  test('setLocalVideoMuted() errors because it needs to be defined', (done) => {
    meetingsAdapter.setLocalVideoMuted().subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe('setLocalAudioMuted(videoMuted, meetingID) must be defined in MeetingsAdapter');
        done();
      }
    );
  });

  test('joinMeeting() errors because it needs to be defined', (done) => {
    meetingsAdapter.joinMeeting().subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe('joinMeeting(meetingID) must be defined in MeetingsAdapter');
        done();
      }
    );
  });

  afterEach(() => {
    meetingsAdapter = null;
  });
});
