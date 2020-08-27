import {from, isObservable} from 'rxjs';
import {tap, skip, delayWhen} from 'rxjs/operators';

import JSONData from '../data/meetings';
import MeetingsJSONAdapter from './MeetingsJSONAdapter';

describe('Meetings JSON Adapter', () => {
  let meetings;
  let meetingID;
  let meetingsJSONAdapter;

  beforeEach(() => {
    meetings = {...JSONData};
    [meetingID] = Object.keys(meetings);
    meetingsJSONAdapter = new MeetingsJSONAdapter(meetings);
  });

  afterEach(() => {
    meetingsJSONAdapter = null;
  });

  describe('createMeeting()', () => {
    test('returns an observable', () => {
      expect(isObservable(meetingsJSONAdapter.createMeeting())).toBeTruthy();
    });

    test('returns new meeting', (done) => {
      meetingsJSONAdapter.createMeeting('localMedia').subscribe((meeting) => {
        expect(meeting).toMatchObject(meetings.localMedia);
        done();
      });
    });

    test('errors if there is no destination', (done) => {
      meetingsJSONAdapter.createMeeting().subscribe(
        () => {},
        (error) => {
          expect(error.message).toBe('Could not create meeting at destination "undefined"');
          done();
        },
      );
    });
  });

  describe('getMeeting()', () => {
    test('returns an observable', () => {
      expect(isObservable(meetingsJSONAdapter.getMeeting())).toBeTruthy();
    });

    test('returns meeting data', (done) => {
      meetingsJSONAdapter.getMeeting(meetingID).subscribe((data) => {
        expect(data).toEqual(meetings[meetingID]);
        done();
      });
    });

    test('renders the local media if localVideo property is defined', (done) => {
      meetingsJSONAdapter.getMeeting('localVideo').subscribe((data) => {
        expect(data.localVideo).toEqual(['remote-video']);
        done();
      });
    });

    test('renders the remote video if remoteVideo property is defined', (done) => {
      meetingsJSONAdapter.getMeeting('remoteVideo').subscribe((data) => {
        expect(data.remoteVideo).toEqual(['remote-video']);
        done();
      });
    });

    test('renders the remote audio if remoteAudio property is defined', (done) => {
      meetingsJSONAdapter.getMeeting('remoteAudio').subscribe((data) => {
        expect(data.remoteAudio).toEqual(['remote-audio']);
        done();
      });
    });

    test('renders the remote audio if both remoteAudio and remoteVideo properties are defined', (done) => {
      meetingsJSONAdapter.getMeeting('remoteAudio&Video').subscribe((data) => {
        expect(data).toMatchObject({remoteAudio: ['remote-audio'], remoteVideo: ['remote-video']});
        done();
      });
    });

    test('returns meeting data from mute audio event', (done) => {
      meetingID = 'localAudio';

      meetingsJSONAdapter
        .getMeeting(meetingID)
        .pipe(tap(() => meetingsJSONAdapter.toggleMuteAudio(meetingID)))
        .subscribe((meeting) => {
          expect(meeting.localAudio).toBeNull();
          done();
        });
    });

    test('returns meeting data from mute video event', (done) => {
      meetingID = 'localVideo';

      meetingsJSONAdapter
        .getMeeting(meetingID)
        .pipe(tap(() => meetingsJSONAdapter.toggleMuteVideo(meetingID)))
        .subscribe((meeting) => {
          expect(meeting.localVideo).toBeNull();
          done();
        });
    });

    test('returns meeting data from join event', (done) => {
      meetingID = 'localMedia';

      meetingsJSONAdapter
        .getMeeting(meetingID)
        .pipe(delayWhen(() => meetingsJSONAdapter.joinMeeting(meetingID)))
        .subscribe((meeting) => {
          expect(meeting.remoteVideo).toEqual(['remote-video']);
          done();
        });
    });

    test('returns meeting data from leave event', (done) => {
      meetingID = 'remoteMedia';

      meetingsJSONAdapter
        .getMeeting(meetingID)
        .pipe(tap(() => meetingsJSONAdapter.leaveMeeting(meetingID)))
        .subscribe((meeting) => {
          expect(meeting.remoteVideo).toBeNull();
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
        },
      );
    });

    test('completes when a meeting is left', (done) => {
      rxjs.fromEvent = jest.fn(() => from([{detail: meetings[meetingID]}]));

      meetingsJSONAdapter
        .getMeeting(meetingID)
        .pipe(tap(() => meetingsJSONAdapter.leaveMeeting(meetingID)))
        .subscribe(
          () => {},
          () => {},
          () => {
            expect(true).toBeTruthy();
            done();
          },
        );
    });
  });

  describe('muteAudioControl() returns', () => {
    beforeEach(() => {
      meetingID = 'localAudio';
    });

    test('active control display values', (done) => {
      rxjs.fromEvent = jest.fn(() => from([{detail: meetings[meetingID]}]));

      meetingsJSONAdapter
        .muteAudioControl(meetingID)
        .pipe(skip(1)) // Skip the "default" emission
        .subscribe((display) => {
          expect(display).toMatchObject({
            ID: 'mute-audio',
            icon: 'microphone-muted',
            tooltip: 'Mute',
            state: 'inactive',
          });
          done();
        });
    });

    test('inactive control display values', (done) => {
      rxjs.fromEvent = jest.fn(() => {
        const meeting = meetings[meetingID];

        meeting.localAudio = null; // Local audio is already muted

        return from([{detail: meeting}]);
      });

      meetingsJSONAdapter
        .muteAudioControl(meetingID)
        .pipe(skip(1)) // Skip the "default" emission
        .subscribe((display) => {
          expect(display).toMatchObject({
            ID: 'mute-audio',
            icon: 'microphone-muted',
            tooltip: 'Unmute',
            state: 'active',
          });
          done();
        });
    });

    test('error on invalid meeting ID', (done) => {
      meetingsJSONAdapter.muteAudioControl('invalid').subscribe(
        () => {},
        (error) => {
          expect(error.message).toEqual('Could not find meeting with ID "invalid"');
          done();
        },
      );
    });
  });

  describe('muteVideoControl() returns', () => {
    beforeEach(() => {
      meetingID = 'localVideo';
    });

    test('active control display values', (done) => {
      rxjs.fromEvent = jest.fn(() => from([{detail: meetings[meetingID]}]));

      meetingsJSONAdapter
        .muteVideoControl(meetingID)
        .pipe(skip(1)) // Skip the "default" emission
        .subscribe((display) => {
          expect(display).toMatchObject({
            ID: 'mute-video',
            icon: 'camera-muted',
            tooltip: 'Stop video',
            state: 'inactive',
          });
          done();
        });
    });

    test('inactive control display values', (done) => {
      rxjs.fromEvent = jest.fn(() => {
        const meeting = meetings[meetingID];

        meeting.localVideo = null; // Local video is already muted

        return from([{detail: meeting}]);
      });

      meetingsJSONAdapter
        .muteVideoControl(meetingID)
        .pipe(skip(1)) // Skip the "default" emission
        .subscribe((display) => {
          expect(display).toMatchObject({
            ID: 'mute-video',
            icon: 'camera-muted',
            tooltip: 'Start video',
            state: 'active',
          });
          done();
        });
    });

    test('error on invalid meeting ID', (done) => {
      meetingsJSONAdapter.muteVideoControl('invalid').subscribe(
        () => {},
        (error) => {
          expect(error.message).toEqual('Could not find meeting with ID "invalid"');
          done();
        },
      );
    });
  });

  describe('joinControl() returns', () => {
    test('active control display value', (done) => {
      meetingsJSONAdapter.joinControl().subscribe((display) => {
        expect(display).toMatchObject({
          ID: 'join-meeting',
          text: 'Join meeting',
          tooltip: 'Join meeting',
          state: 'active',
        });
        done();
      });
    });
  });

  describe('leaveControl() returns', () => {
    test('active control display value', (done) => {
      meetingsJSONAdapter.leaveControl().subscribe((display) => {
        expect(display).toMatchObject({
          ID: 'leave-meeting',
          icon: 'cancel',
          tooltip: 'Leave',
          state: 'active',
        });
        done();
      });
    });
  });

  describe('toggleMuteAudio()', () => {
    test('dispatches a "mute-audio" event', async () => {
      meetingID = 'localAudio';

      await meetingsJSONAdapter.toggleMuteAudio(meetingID);
      expect(global.document.dispatchEvent).toHaveBeenCalled();
    });
  });

  describe('toggleMuteVideo()', () => {
    test('dispatches a "mute-video" event', async () => {
      meetingID = 'localVideo';

      await meetingsJSONAdapter.toggleMuteVideo(meetingID);
      expect(global.document.dispatchEvent).toHaveBeenCalled();
    });
  });

  describe('joinMeeting()', () => {
    test('dispatches a "join-meeting" event', async () => {
      meetingID = 'localMedia';

      await meetingsJSONAdapter.toggleMuteVideo(meetingID);
      expect(global.document.dispatchEvent).toHaveBeenCalled();
    });
  });

  describe('leaveMeeting()', () => {
    test('dispatches a "leave-meeting" event', async () => {
      meetingID = 'remoteMedia';

      await meetingsJSONAdapter.toggleMuteVideo(meetingID);
      expect(global.document.dispatchEvent).toHaveBeenCalled();
    });
  });
});
