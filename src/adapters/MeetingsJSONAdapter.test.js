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
  SWITCH_MICROPHONE_CONTROL,
  SWITCH_SPEAKER_CONTROL,
} from './MeetingsJSONAdapter';

describe('Meetings JSON Adapter', () => {
  const meetingID = 'meeting1';
  const cameraID = 'cameraDevice1';
  const microphoneID = 'microphoneDevice1';
  const speakerID = 'speakerDevice1';
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
          localAudio: {
            stream: null,
            permission: null,
          },
          localVideo: {
            stream: null,
            permission: null,
          },
          localShare: {
            stream: null,
          },
          remoteAudio: null,
          remoteVideo: null,
          remoteShare: null,
          state: null,
          showRoster: null,
          cameraID: null,
          microphoneID: null,
          speakerID: null,
        });
        done();
      });
    });

    test('emits Meeting object with null local audio stream on mute audio event', (done) => {
      meetingsJSONAdapter
        .getMeeting(meetingID)
        .pipe(skip(1)) // Skip initial emission
        .subscribe((meeting) => {
          expect(meeting.localAudio.stream).toBeNull();
          done();
        });

      // Dispatch mute audio event after subscription
      meetingsJSONAdapter.meetingControls[MUTE_AUDIO_CONTROL].action(meetingID);
    });

    test('emits Meeting object with null local video stream on mute video event', (done) => {
      meetingsJSONAdapter
        .getMeeting(meetingID)
        .pipe(skip(1)) // Skip initial emission
        .subscribe((meeting) => {
          expect(meeting.localVideo.stream).toBeNull();
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

    test('sets local audio stream to null if it is a media stream', async () => {
      testMeeting.localAudio.stream = new MediaStream();

      await meetingsJSONAdapter.meetingControls[MUTE_AUDIO_CONTROL].action(meetingID);
      expect(testMeeting.localAudio.stream).toBeNull();
    });

    test('sets local audio stream to a media stream if it is null', async () => {
      testMeeting.localAudio.stream = null;

      await meetingsJSONAdapter.meetingControls[MUTE_AUDIO_CONTROL].action(meetingID);
      expect(testMeeting.localAudio.stream).toBeInstanceOf(MediaStream);
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

    test('sets local video stream to null if it is a media stream', async () => {
      testMeeting.localVideo = {
        stream: new MediaStream(),
      };

      await meetingsJSONAdapter.meetingControls[MUTE_VIDEO_CONTROL].action(meetingID);
      expect(testMeeting.localVideo.stream).toBeNull();
    });

    test('sets local video stream to a media stream if it is null', async () => {
      testMeeting.localVideo.stream = null;

      await meetingsJSONAdapter.meetingControls[MUTE_VIDEO_CONTROL].action(meetingID);
      expect(testMeeting.localVideo.stream).toBeInstanceOf(MediaStream);
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
      meetingsJSONAdapter.meetingControls[JOIN_CONTROL].display(meetingID).subscribe((display) => {
        expect(display).toMatchObject({
          ID: 'join-meeting',
          text: 'Join meeting',
          tooltip: 'Join meeting',
          hint: 'Unmuted, video on',
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

    test('emits inactive microphone icon control if there is audio stream', (done) => {
      testMeeting.localAudio.stream = new MediaStream();

      meetingsJSONAdapter
        .meetingControls[MUTE_AUDIO_CONTROL]
        .display(meetingID)
        .subscribe((display) => {
          expect(display).toMatchObject({
            ID: 'mute-audio',
            icon: 'microphone_28',
            tooltip: 'Mute',
            state: 'inactive',
          });
          done();
        });
    });

    test('emits active microphone icon control if there is no audio stream', (done) => {
      testMeeting.localAudio.stream = null;

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

    test('emits inactive camera control if there is video stream', (done) => {
      testMeeting.localVideo.stream = new MediaStream();

      meetingsJSONAdapter
        .meetingControls[MUTE_VIDEO_CONTROL]
        .display(meetingID)
        .subscribe((display) => {
          expect(display).toMatchObject({
            ID: 'mute-video',
            icon: 'camera_28',
            tooltip: 'Stop video',
            state: 'inactive',
          });
          done();
        });
    });

    test('emits active camera control if there is no video stream', (done) => {
      testMeeting.localVideo.stream = null;

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

  describe('switchMicrophoneControl()', () => {
    test('returns an observable', () => {
      expect(isObservable(meetingsJSONAdapter
        .meetingControls[SWITCH_MICROPHONE_CONTROL]
        .display())).toBeTruthy();
    });

    test('emits correct options for switch microphone control', (done) => {
      const microphoneOptions = [{
        value: 'default',
        label: 'Default - Headset Microphone (Jabra EVOLVE 20 SE MS) (0b0e:0300)',
      },
      {
        value: 'communications',
        label: 'Communications - Headset Microphone (Jabra EVOLVE 20 SE MS) (0b0e:0300)',
      },
      {
        value: 'fd8f12fdced8098aaac31836c8b98960727060b57d48148e15cc34ad4ba1394a',
        label: 'Microphone Array (Realtek(R) Audio)',
      },
      {
        value: 'df434123000a75a161b1841b08f7318617b419aae3c93683b0fcb3389470b39a',
        label: 'Microphone (Realtek USB2.0 Audio) (0bda:402e)',
      },
      {
        value: '79a2df2a81176acde237e064a9b213cd1bd32608106bd4ee5c30242eee01945f',
        label: 'Headset Microphone (Jabra EVOLVE 20 SE MS) (0b0e:0300)',
      },
      {
        value: 'f4491e7c9ad16139cc485d99e39234313172be31fc00c086acbdecb21236ccf6',
        label: 'Microphone (HD Webcam C525) (046d:0826)',
      }];

      meetingsJSONAdapter
        .meetingControls[SWITCH_MICROPHONE_CONTROL]
        .display(meetingID)
        .pipe(take(2), toArray())
        .subscribe((displays) => {
          expect(displays).toMatchObject([{
            ID: 'switch-microphone',
            tooltip: 'Microphone Devices',
            options: null,
            selected: null,
          }, {
            ID: 'switch-microphone',
            tooltip: 'Microphone Devices',
            options: microphoneOptions,
            selected: null,
          }]);
          done();
        });
    });

    test('throws error on invalid meeting ID', (done) => {
      meetingsJSONAdapter.meetingControls[SWITCH_MICROPHONE_CONTROL].display('invalid').subscribe(
        () => {},
        (error) => {
          expect(error.message).toEqual('Could not find meeting with ID "invalid" to add switch microphone control');
          done();
        },
      );
    });
  });

  describe('switchMicrophone()', () => {
    let dispatchSpy;

    beforeEach(() => {
      dispatchSpy = jest.spyOn(document, 'dispatchEvent');
    });

    afterEach(() => {
      dispatchSpy.mockRestore();
    });

    test('dispatches a "switch-microphone" event', async () => {
      await meetingsJSONAdapter
        .meetingControls[SWITCH_MICROPHONE_CONTROL]
        .action(meetingID, microphoneID);
      expect(meetingsJSONAdapter.getStream).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });

  describe('switchSpeakerControl()', () => {
    test('returns an observable', () => {
      expect(isObservable(meetingsJSONAdapter
        .meetingControls[SWITCH_SPEAKER_CONTROL]
        .display())).toBeTruthy();
    });

    test('emits correct options for switch speaker control', (done) => {
      const speakerOptions = [{
        value: 'default',
        label: 'Default - Headset Earphone (Jabra EVOLVE 20 SE MS) (0b0e:0300)',
      },
      {
        value: 'communications',
        label: 'Communications - Headset Earphone (Jabra EVOLVE 20 SE MS) (0b0e:0300)',
      },
      {
        value: '5e2cade11fab305ca3773e507b06e60d0a65ed8d6a19da2927a287c70e713dc7',
        label: 'Line (Realtek USB2.0 Audio) (0bda:402e)',
      },
      {
        value: '91e9c4b27e0b7bc8f41f3076a66e2968d4e229a5f388c2fe9f251bf8d54d7a34',
        label: 'Headphones (Realtek USB2.0 Audio) (0bda:402e)',
      },
      {
        value: 'a2f1a439c64a73b712a54c16f77716fb6040d87de312d211ef886944877ecea2',
        label: 'Speakers (Realtek(R) Audio)',
      },
      {
        value: '85e52fb55424206524719fab873ea7c3419c496ce1f691a009066ada5feaf813',
        label: 'Headset Earphone (Jabra EVOLVE 20 SE MS) (0b0e:0300)',
      },
      ];

      meetingsJSONAdapter
        .meetingControls[SWITCH_SPEAKER_CONTROL]
        .display(meetingID)
        .pipe(take(2), toArray())
        .subscribe((displays) => {
          expect(displays).toMatchObject([{
            ID: 'switch-speaker',
            tooltip: 'The current browser does not support changing speakers',
            options: null,
            selected: null,
          }, {
            ID: 'switch-speaker',
            tooltip: 'The current browser does not support changing speakers',
            options: speakerOptions,
            selected: null,
          }]);
          done();
        });
    });

    test('throws error on invalid meeting ID', (done) => {
      meetingsJSONAdapter.meetingControls[SWITCH_SPEAKER_CONTROL].display('invalid').subscribe(
        () => {},
        (error) => {
          expect(error.message).toEqual('Could not find meeting with ID "invalid" to add switch speaker control');
          done();
        },
      );
    });
  });

  describe('switchSpeaker()', () => {
    let dispatchSpy;

    beforeEach(() => {
      dispatchSpy = jest.spyOn(document, 'dispatchEvent');
    });

    afterEach(() => {
      dispatchSpy.mockRestore();
    });

    test('dispatches a "switch-speaker" event', async () => {
      await meetingsJSONAdapter
        .meetingControls[SWITCH_SPEAKER_CONTROL]
        .action(meetingID, speakerID);
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });
});
