import {isObservable} from 'rxjs';
import {skip} from 'rxjs/operators';

import JSONData from '../data/meetings.json';
import MeetingsJSONAdapter from './MeetingsJSONAdapter';

describe('Meetings JSON Adapter', () => {
  const meetingID = 'meeting1';
  let meetingsJSONAdapter;
  let testMeeting;

  beforeEach(() => {
    meetingsJSONAdapter = new MeetingsJSONAdapter(JSONData);
    meetingsJSONAdapter.getStream = jest.fn(() => new MediaStream());
    testMeeting = JSONData[meetingID];
  });

  afterEach(() => {
    meetingsJSONAdapter = null;
    testMeeting = null;
    JSONData[meetingID] = {
      ID: 'meeting1',
      title: 'Weekly Backlog Grooming',
      localAudio: new MediaStream(),
      localVideo: new MediaStream(),
      localShare: new MediaStream(),
      remoteAudio: null,
      remoteVideo: null,
      remoteShare: null,
    };
  });

  describe('createMeeting()', () => {
    test('returns an observable', () => {
      expect(isObservable(meetingsJSONAdapter.createMeeting())).toBeTruthy();
    });

    test('emits a Meeting object on subscription', (done) => {
      meetingsJSONAdapter.createMeeting(meetingID).subscribe((meeting) => {
        expect(meeting).toMatchObject(testMeeting);
        done();
      });
    });

    test('throws error if there is no meeting destination', (done) => {
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

    test('emits a Meeting object on subscription', (done) => {
      meetingsJSONAdapter.getMeeting(meetingID).subscribe((meeting) => {
        expect(meeting).toMatchObject(testMeeting);
        done();
      });
    });

    test('emits Meeting object with null local audio on mute audio event', (done) => {
      meetingsJSONAdapter
        .getMeeting(meetingID)
        .pipe(skip(1)) // Skip initial emission
        .subscribe((meeting) => {
          expect(meeting.localAudio).toBeNull();
          done();
        });

      // Dispatch mute audio event after subscription
      meetingsJSONAdapter.toggleMuteAudio(meetingID);
    });

    test('emits Meeting object with null local video on mute video event', (done) => {
      meetingsJSONAdapter
        .getMeeting(meetingID)
        .pipe(skip(1)) // Skip initial emission
        .subscribe((meeting) => {
          expect(meeting.localVideo).toBeNull();
          done();
        });

      // Dispatch mute video event after subscription
      meetingsJSONAdapter.toggleMuteVideo(meetingID);
    });

    test('emits Meeting object with remote media on join event', (done) => {
      meetingsJSONAdapter
        .getMeeting(meetingID)
        .pipe(skip(1)) // Skip initial emission
        .subscribe((meeting) => {
          expect(meeting.remoteAudio).toBeInstanceOf(MediaStream);
          expect(meeting.remoteVideo).toBeInstanceOf(MediaStream);
          done();
        });

      // Dispatch join event after subscription
      meetingsJSONAdapter.joinMeeting(meetingID);
    });

    test('completes when the meeting is left', (done) => {
      meetingsJSONAdapter
        .getMeeting(meetingID)
        .subscribe(
          () => {},
          () => {},
          () => {
            expect(true).toBeTruthy();
            done();
          },
        );

      // Dispatch leave event after subscription
      meetingsJSONAdapter.leaveMeeting(meetingID);
    });

    test('throws error on invalid meeting ID', (done) => {
      meetingsJSONAdapter.getMeeting('invalid').subscribe(
        () => {},
        (error) => {
          expect(error.message).toBe('Could not find meeting with ID "invalid"');
          done();
        },
      );
    });
  });

  describe('joinMeeting()', () => {
    let dispatchSpy;

    beforeEach(() => {
      dispatchSpy = jest.spyOn(document, 'dispatchEvent');
    });

    afterEach(() => {
      dispatchSpy.mockRestore();
    });

    test('sets remote media streams', async () => {
      await meetingsJSONAdapter.joinMeeting(meetingID);
      expect(testMeeting.remoteAudio).toBeInstanceOf(MediaStream);
      expect(testMeeting.remoteVideo).toBeInstanceOf(MediaStream);
    });

    test('dispatches a "join-meeting" event', async () => {
      await meetingsJSONAdapter.joinMeeting(meetingID);
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });

  describe('leaveMeeting()', () => {
    let dispatchSpy;

    beforeEach(() => {
      dispatchSpy = jest.spyOn(document, 'dispatchEvent');
    });

    afterEach(() => {
      dispatchSpy.mockRestore();
    });

    test('sets remote media streams to null', async () => {
      await meetingsJSONAdapter.leaveMeeting(meetingID);
      expect(testMeeting.remoteAudio).toBeNull();
      expect(testMeeting.remoteVideo).toBeNull();
    });

    test('dispatches a "leave-meeting" event', async () => {
      await meetingsJSONAdapter.toggleMuteVideo(meetingID);
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });

  describe('toggleMuteAudio()', () => {
    let dispatchSpy;

    beforeEach(() => {
      dispatchSpy = jest.spyOn(document, 'dispatchEvent');
    });

    afterEach(() => {
      dispatchSpy.mockRestore();
    });

    test('sets local audio to null if it is a media stream', async () => {
      testMeeting.localAudio = new MediaStream();

      await meetingsJSONAdapter.toggleMuteAudio(meetingID);
      expect(testMeeting.localAudio).toBeNull();
    });

    test('sets local audio to a media stream if it is null', async () => {
      testMeeting.localAudio = null;

      await meetingsJSONAdapter.toggleMuteAudio(meetingID);
      expect(testMeeting.localAudio).toBeInstanceOf(MediaStream);
    });

    test('dispatches a "mute-audio" event', async () => {
      await meetingsJSONAdapter.toggleMuteAudio(meetingID);
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });

  describe('toggleMuteVideo()', () => {
    let dispatchSpy;

    beforeEach(() => {
      dispatchSpy = jest.spyOn(document, 'dispatchEvent');
    });

    afterEach(() => {
      dispatchSpy.mockRestore();
    });

    test('sets local video to null if it is a media stream', async () => {
      testMeeting.localVideo = new MediaStream();

      await meetingsJSONAdapter.toggleMuteVideo(meetingID);
      expect(testMeeting.localVideo).toBeNull();
    });

    test('sets local video to a media stream if it is null', async () => {
      testMeeting.localVideo = null;

      await meetingsJSONAdapter.toggleMuteVideo(meetingID);
      expect(testMeeting.localVideo).toBeInstanceOf(MediaStream);
    });

    test('dispatches a "mute-video" event', async () => {
      await meetingsJSONAdapter.toggleMuteVideo(meetingID);
      expect(global.document.dispatchEvent).toHaveBeenCalled();
    });
  });

  describe('joinControl()', () => {
    test('returns an observable', () => {
      expect(isObservable(meetingsJSONAdapter.joinControl())).toBeTruthy();
    });

    test('emits active text control', (done) => {
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

  describe('leaveControl()', () => {
    test('returns an observable', () => {
      expect(isObservable(meetingsJSONAdapter.leaveControl())).toBeTruthy();
    });

    test('emits active cancel icon control', (done) => {
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

  describe('muteAudioControl()', () => {
    test('returns an observable', () => {
      expect(isObservable(meetingsJSONAdapter.muteAudioControl())).toBeTruthy();
    });

    test('emits inactive microphone icon control if there is audio', (done) => {
      testMeeting.localAudio = new MediaStream();

      meetingsJSONAdapter
        .muteAudioControl(meetingID)
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

    test('emits active microphone icon control if there is no audio', (done) => {
      testMeeting.localAudio = null;

      meetingsJSONAdapter
        .muteAudioControl(meetingID)
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

    test('emits microphone icon control update on mute audio event', (done) => {
      meetingsJSONAdapter
        .muteAudioControl(meetingID)
        .pipe(skip(1)) // Skip the initial emission
        .subscribe((display) => {
          expect(display).toMatchObject({
            ID: 'mute-audio',
            icon: 'microphone-muted',
            tooltip: 'Unmute',
            state: 'active',
          });
          done();
        });

      // Dispatch mute audio event after subscription
      meetingsJSONAdapter.toggleMuteAudio(meetingID);
    });

    test('throws error on invalid meeting ID', (done) => {
      meetingsJSONAdapter.muteAudioControl('invalid').subscribe(
        () => {},
        (error) => {
          expect(error.message).toEqual('Could not find meeting with ID "invalid"');
          done();
        },
      );
    });
  });

  describe('muteVideoControl()', () => {
    test('returns an observable', () => {
      expect(isObservable(meetingsJSONAdapter.muteAudioControl())).toBeTruthy();
    });

    test('emits inactive camera control if there is video', (done) => {
      testMeeting.localVideo = new MediaStream();

      meetingsJSONAdapter
        .muteVideoControl(meetingID)
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

    test('emits active camera control if there is no video', (done) => {
      testMeeting.localVideo = null;

      meetingsJSONAdapter
        .muteVideoControl(meetingID)
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

    test('emits camera icon control on mute video event', (done) => {
      meetingsJSONAdapter
        .muteVideoControl(meetingID)
        .pipe(skip(1)) // Skip the initial emission
        .subscribe((display) => {
          expect(display).toMatchObject({
            ID: 'mute-video',
            icon: 'camera-muted',
            tooltip: 'Start video',
            state: 'active',
          });
          done();
        });

      // Dispatch mute video event after subscription
      meetingsJSONAdapter.toggleMuteVideo(meetingID);
    });

    test('throws error on invalid meeting ID', (done) => {
      meetingsJSONAdapter.muteVideoControl('invalid').subscribe(
        () => {},
        (error) => {
          expect(error.message).toEqual('Could not find meeting with ID "invalid"');
          done();
        },
      );
    });
  });
});
