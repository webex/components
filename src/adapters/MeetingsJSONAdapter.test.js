import {isObservable} from 'rxjs';
import {
  skip,
  take,
  toArray,
  last,
} from 'rxjs/operators';
import {MeetingState} from '@webex/component-adapter-interfaces';
import JSONData from '../data/meetings';
import MeetingsJSONAdapter, {
  JOIN_CONTROL,
  LEAVE_CONTROL,
  MUTE_AUDIO_CONTROL,
  MUTE_VIDEO_CONTROL,
  ROSTER_CONTROL,
  SWITCH_CAMERA_CONTROL,
} from './MeetingsJSONAdapter';

describe('Meetings JSON Adapter', () => {
  const meetingID = 'meeting1';
  const cameraID = 'cameraDevice1';
  let meetingsJSONAdapter;
  let testMeeting;

  beforeEach(() => {
    const mockMeetings = JSON.parse(JSON.stringify(JSONData));

    meetingsJSONAdapter = new MeetingsJSONAdapter(mockMeetings);
    meetingsJSONAdapter.getStream = jest.fn(() => new MediaStream());
    testMeeting = mockMeetings[meetingID];
  });

  afterEach(() => {
    meetingsJSONAdapter = null;
    testMeeting = null;
  });

  describe('createMeeting()', () => {
    test('returns an observable', () => {
      expect(isObservable(meetingsJSONAdapter.createMeeting())).toBeTruthy();
    });

    test('emits a Meeting object on subscription', (done) => {
      meetingsJSONAdapter.createMeeting(meetingID).pipe(last()).subscribe((meeting) => {
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
      meetingsJSONAdapter.meetingControls[MUTE_AUDIO_CONTROL].action(meetingID);
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
      meetingsJSONAdapter.meetingControls[MUTE_VIDEO_CONTROL].action(meetingID);
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
      meetingsJSONAdapter.meetingControls[JOIN_CONTROL].action(meetingID);
    });

    test('when the meeting is left, emits a last meeting object with state=LEFT and then completes', (done) => {
      meetingsJSONAdapter
        .getMeeting(meetingID)
        .pipe(last())
        .subscribe(
          (meeting) => {
            expect(meeting.state).toBe(MeetingState.LEFT);
            done();
          },
        );

      // Dispatch leave event after subscription
      meetingsJSONAdapter.meetingControls[LEAVE_CONTROL].action(meetingID);
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
      await meetingsJSONAdapter.meetingControls[JOIN_CONTROL].action(meetingID);
      expect(testMeeting.remoteAudio).toBeInstanceOf(MediaStream);
      expect(testMeeting.remoteVideo).toBeInstanceOf(MediaStream);
    });

    test('sets meeting state to JOINED', async () => {
      await meetingsJSONAdapter.meetingControls[JOIN_CONTROL].action(meetingID);
      expect(testMeeting.state).toBe(MeetingState.JOINED);
    });

    test('dispatches a "join-meeting" event', async () => {
      await meetingsJSONAdapter.meetingControls[JOIN_CONTROL].action(meetingID);
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
      await meetingsJSONAdapter.meetingControls[LEAVE_CONTROL].action(meetingID);
      expect(testMeeting.remoteAudio).toBeNull();
      expect(testMeeting.remoteVideo).toBeNull();
    });

    test('sets meeting state to LEFT', async () => {
      await meetingsJSONAdapter.meetingControls[LEAVE_CONTROL].action(meetingID);
      expect(testMeeting.state).toBe(MeetingState.LEFT);
    });

    test('dispatches a "leave-meeting" event', async () => {
      await meetingsJSONAdapter.meetingControls[MUTE_VIDEO_CONTROL].action(meetingID);
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

      await meetingsJSONAdapter.meetingControls[MUTE_AUDIO_CONTROL].action(meetingID);
      expect(testMeeting.localAudio).toBeNull();
    });

    test('sets local audio to a media stream if it is null', async () => {
      testMeeting.localAudio = null;

      await meetingsJSONAdapter.meetingControls[MUTE_AUDIO_CONTROL].action(meetingID);
      expect(testMeeting.localAudio).toBeInstanceOf(MediaStream);
    });

    test('dispatches a "mute-audio" event', async () => {
      await meetingsJSONAdapter.meetingControls[MUTE_AUDIO_CONTROL].action(meetingID);
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

      await meetingsJSONAdapter.meetingControls[MUTE_VIDEO_CONTROL].action(meetingID);
      expect(testMeeting.localVideo).toBeNull();
    });

    test('sets local video to a media stream if it is null', async () => {
      testMeeting.localVideo = null;

      await meetingsJSONAdapter.meetingControls[MUTE_VIDEO_CONTROL].action(meetingID);
      expect(testMeeting.localVideo).toBeInstanceOf(MediaStream);
    });

    test('dispatches a "mute-video" event', async () => {
      await meetingsJSONAdapter.meetingControls[MUTE_VIDEO_CONTROL].action(meetingID);
      expect(global.document.dispatchEvent).toHaveBeenCalled();
    });
  });

  describe('joinControl()', () => {
    test('returns an observable', () => {
      // eslint-disable-next-line
      expect(isObservable(meetingsJSONAdapter.meetingControls[JOIN_CONTROL].display())).toBeTruthy();
    });

    test('emits active text control', (done) => {
      meetingsJSONAdapter.meetingControls[JOIN_CONTROL].display().subscribe((display) => {
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
      // eslint-disable-next-line
      expect(isObservable(meetingsJSONAdapter.meetingControls[LEAVE_CONTROL].display())).toBeTruthy();
    });

    test('emits active cancel icon control', (done) => {
      meetingsJSONAdapter.meetingControls[LEAVE_CONTROL].display().subscribe((display) => {
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
      // eslint-disable-next-line
      expect(isObservable(meetingsJSONAdapter.meetingControls[MUTE_AUDIO_CONTROL].display())).toBeTruthy();
    });

    test('emits inactive microphone icon control if there is audio', (done) => {
      testMeeting.localAudio = new MediaStream();

      meetingsJSONAdapter
        .meetingControls[MUTE_AUDIO_CONTROL]
        .display(meetingID)
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
        .meetingControls[MUTE_AUDIO_CONTROL]
        .display(meetingID)
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
        .meetingControls[MUTE_AUDIO_CONTROL]
        .display(meetingID)
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
      meetingsJSONAdapter.meetingControls[MUTE_AUDIO_CONTROL].action(meetingID);
    });

    test('throws error on invalid meeting ID', (done) => {
      meetingsJSONAdapter.meetingControls[MUTE_AUDIO_CONTROL].display('invalid').subscribe(
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
      // eslint-disable-next-line
      expect(isObservable(meetingsJSONAdapter.meetingControls[MUTE_VIDEO_CONTROL].display())).toBeTruthy();
    });

    test('emits inactive camera control if there is video', (done) => {
      testMeeting.localVideo = new MediaStream();

      meetingsJSONAdapter
        .meetingControls[MUTE_VIDEO_CONTROL]
        .display(meetingID)
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
        .meetingControls[MUTE_VIDEO_CONTROL]
        .display(meetingID)
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
        .meetingControls[MUTE_VIDEO_CONTROL]
        .display(meetingID)
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
      meetingsJSONAdapter.meetingControls[MUTE_VIDEO_CONTROL].action(meetingID);
    });

    test('throws error on invalid meeting ID', (done) => {
      meetingsJSONAdapter.meetingControls[MUTE_VIDEO_CONTROL].display('invalid').subscribe(
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
      await meetingsJSONAdapter.meetingControls[ROSTER_CONTROL].action(meetingID);
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });

  describe('rosterControl()', () => {
    test('returns an observable', () => {
      // eslint-disable-next-line
      expect(isObservable(meetingsJSONAdapter.meetingControls[ROSTER_CONTROL].display())).toBeTruthy();
    });

    test('emits inactive roster icon control if roster is not displayed', (done) => {
      meetingsJSONAdapter
        .meetingControls[ROSTER_CONTROL]
        .display(meetingID)
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
        .meetingControls[ROSTER_CONTROL]
        .display(meetingID)
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
      meetingsJSONAdapter.meetingControls[ROSTER_CONTROL].display('invalid').subscribe(
        () => {},
        (error) => {
          expect(error.message).toEqual('Could not find meeting with ID "invalid"');
          done();
        },
      );
    });
  });

  describe('switchCameraControl()', () => {
    test('returns an observable', () => {
      // eslint-disable-next-line
      expect(isObservable(meetingsJSONAdapter.meetingControls[SWITCH_CAMERA_CONTROL].display())).toBeTruthy();
    });

    test('emits correct options for switch camera control', (done) => {
      const cameraOptions = [{
        value: '2a9f83242466302e2130134a57162f3562c59bd9ea34daa7f6fc2ad43a29265b',
        label: 'Logitech HD Webcam C525 (046d:0826)',
      },
      {
        value: 'c2fcaf0c6b0bc7adc1192ba0b2dd236f7926e2ae163c56f80fa51613f9b9ec77',
        label: 'Integrated Camera (04f2:b6d9)',
      }];

      meetingsJSONAdapter
        .meetingControls[SWITCH_CAMERA_CONTROL]
        .display(meetingID)
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
      meetingsJSONAdapter.meetingControls[SWITCH_CAMERA_CONTROL].display('invalid').subscribe(
        () => {},
        (error) => {
          expect(error.message).toEqual('Could not find meeting with ID "invalid" to add a switch camera control');
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
      await meetingsJSONAdapter.meetingControls[SWITCH_CAMERA_CONTROL].action(meetingID, cameraID);
      expect(meetingsJSONAdapter.getStream).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });
});
