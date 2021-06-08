import {isObservable} from 'rxjs';
import {skip, take, toArray} from 'rxjs/operators';
import {MeetingState} from '@webex/component-adapter-interfaces';

import JSONData from '../data/meetings';
import MeetingsJSONAdapter from './MeetingsJSONAdapter';

describe('Meetings JSON Adapter', () => {
  const meetingID = 'meeting1';
  const cameraID = 'cameraDevice1';
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
      status: MeetingState.NOT_JOINED,
      showRoster: null,
      cameraID: null,
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

    test('emits an empty Meeting object when ID is null', (done) => {
      meetingsJSONAdapter.getMeeting(null).subscribe((meeting) => {
        expect(meeting).toMatchObject({
          ID: null,
          title: null,
          localAudio: null,
          localVideo: null,
          localShare: null,
          remoteAudio: null,
          remoteVideo: null,
          remoteShare: null,
          state: null,
          showRoster: null,
          cameraID: null,
        });
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
            expect(testMeeting.state).toBe(MeetingState.LEFT);
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
      testMeeting.state = MeetingState.NOT_JOINED;
    });

    afterEach(() => {
      dispatchSpy.mockRestore();
    });

    test('sets remote media streams', async () => {
      await meetingsJSONAdapter.joinMeeting(meetingID);
      expect(testMeeting.remoteAudio).toBeInstanceOf(MediaStream);
      expect(testMeeting.remoteVideo).toBeInstanceOf(MediaStream);
    });

    test('sets meeting state to JOINED', async () => {
      await meetingsJSONAdapter.joinMeeting(meetingID);
      expect(testMeeting.state).toBe(MeetingState.JOINED);
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
      testMeeting.state = MeetingState.JOINED;
    });

    afterEach(() => {
      dispatchSpy.mockRestore();
    });

    test('sets remote media streams to null', async () => {
      await meetingsJSONAdapter.leaveMeeting(meetingID);
      expect(testMeeting.remoteAudio).toBeNull();
      expect(testMeeting.remoteVideo).toBeNull();
    });

    test('sets meeting state to LEFT', async () => {
      await meetingsJSONAdapter.leaveMeeting(meetingID);
      expect(testMeeting.state).toBe(MeetingState.LEFT);
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
          icon: 'cancel_28',
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
            icon: 'microphone-muted_28',
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
            icon: 'microphone-muted_28',
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
            icon: 'microphone-muted_28',
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
            icon: 'camera-muted_28',
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
            icon: 'camera-muted_28',
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
            icon: 'camera-muted_28',
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

  describe('toggleRoster()', () => {
    let dispatchSpy;

    beforeEach(() => {
      dispatchSpy = jest.spyOn(document, 'dispatchEvent');
    });

    afterEach(() => {
      dispatchSpy.mockRestore();
    });

    test('dispatches a "member-roster" event', async () => {
      await meetingsJSONAdapter.toggleRoster(meetingID);
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });

  describe('rosterControl()', () => {
    test('returns an observable', () => {
      expect(isObservable(meetingsJSONAdapter.rosterControl())).toBeTruthy();
    });

    test('emits inactive roster icon control if roster is not displayed', (done) => {
      meetingsJSONAdapter
        .rosterControl(meetingID)
        .subscribe((display) => {
          expect(display).toMatchObject({
            ID: 'member-roster',
            icon: 'participant-list_28',
            tooltip: 'Show participants panel',
            state: 'inactive',
            text: 'Participants',
          });
          done();
        });
    });

    test('emits active roster icon control if roster is displayed', (done) => {
      testMeeting.showRoster = true;

      meetingsJSONAdapter
        .rosterControl(meetingID)
        .subscribe((display) => {
          expect(display).toMatchObject({
            ID: 'member-roster',
            icon: 'participant-list_28',
            tooltip: 'Hide participants panel',
            state: 'active',
            text: 'Participants',
          });
          done();
        });
    });

    test('throws error on invalid meeting ID', (done) => {
      meetingsJSONAdapter.rosterControl('invalid').subscribe(
        () => {},
        (error) => {
          expect(error.message).toEqual('Could not find meeting with ID "invalid" to add roster control');
          done();
        },
      );
    });
  });

  describe('cameraSwitcherControl()', () => {
    test('returns an observable', () => {
      expect(isObservable(meetingsJSONAdapter.cameraSwitcherControl())).toBeTruthy();
    });

    test('emits correct options for camera switcher control', (done) => {
      const cameraOptions = [{
        value: '2a9f83242466302e2130134a57162f3562c59bd9ea34daa7f6fc2ad43a29265b',
        label: 'Logitech HD Webcam C525 (046d:0826)',
      },
      {
        value: 'c2fcaf0c6b0bc7adc1192ba0b2dd236f7926e2ae163c56f80fa51613f9b9ec77',
        label: 'Integrated Camera (04f2:b6d9)',
      }];

      meetingsJSONAdapter
        .cameraSwitcherControl(meetingID)
        .pipe(take(2), toArray())
        .subscribe((displays) => {
          expect(displays).toMatchObject([{
            ID: 'switch-camera',
            tooltip: 'Video Devices',
            options: null,
            selected: null,
          }, {
            ID: 'switch-camera',
            tooltip: 'Video Devices',
            options: cameraOptions,
            selected: null,
          }]);
          done();
        });
    });

    test('throws error on invalid meeting ID', (done) => {
      meetingsJSONAdapter.cameraSwitcherControl('invalid').subscribe(
        () => {},
        (error) => {
          expect(error.message).toEqual('Could not find meeting with ID "invalid" to add camera switcher control');
          done();
        },
      );
    });
  });

  describe('switchCamera()', () => {
    let dispatchSpy;

    beforeEach(() => {
      dispatchSpy = jest.spyOn(document, 'dispatchEvent');
    });

    afterEach(() => {
      dispatchSpy.mockRestore();
    });

    test('dispatches a "switch-camera" event', async () => {
      await meetingsJSONAdapter.switchCamera(meetingID, cameraID);
      expect(meetingsJSONAdapter.getStream).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });
});
