import {concat, fromEvent, Observable} from 'rxjs';
import {filter, map, takeWhile} from 'rxjs/operators';
import {MeetingsAdapter, MeetingState} from '@webex/component-adapter-interfaces';

import {deepMerge} from '../util';

import DisabledMuteAudioControl from './MeetingsJSONAdapter/controls/DisabledMuteAudioControl';
import JoinControl from './MeetingsJSONAdapter/controls/JoinControl';
import LeaveControl from './MeetingsJSONAdapter/controls/LeaveControl';
import MuteAudioControl from './MeetingsJSONAdapter/controls/MuteAudioControl';
import MuteVideoControl from './MeetingsJSONAdapter/controls/MuteVideoControl';
import RosterControl from './MeetingsJSONAdapter/controls/RosterControl';
import SettingsControl from './MeetingsJSONAdapter/controls/SettingsControl';
import ShareControl from './MeetingsJSONAdapter/controls/ShareControl';
import SwitchCameraControl from './MeetingsJSONAdapter/controls/SwitchCameraControl';
import SwitchMicrophoneControl from './MeetingsJSONAdapter/controls/SwitchMicrophoneControl';
import SwitchSpeakerControl from './MeetingsJSONAdapter/controls/SwitchSpeakerControl';

// Meeting control names
export const DISABLED_MUTE_AUDIO_CONTROL = 'disabled-mute-audio';
export const DISABLED_JOIN_CONTROL = 'disabled-join-meeting';
export const JOIN_CONTROL = 'join-meeting';
export const LEAVE_CONTROL = 'leave-meeting';
export const MUTE_AUDIO_CONTROL = 'mute-audio';
export const MUTE_VIDEO_CONTROL = 'mute-video';
export const ROSTER_CONTROL = 'member-roster';
export const SETTINGS_CONTROL = 'settings';
export const SHARE_CONTROL = 'share-screen';
export const SWITCH_CAMERA_CONTROL = 'switch-camera';
export const SWITCH_MICROPHONE_CONTROL = 'switch-microphone';
export const SWITCH_SPEAKER_CONTROL = 'switch-speaker';

const EMPTY_MEETING = {
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
  showRoster: null,
  settings: {
    visible: false,
    preview: {
      audio: {},
      video: {},
    },
  },
  status: 'NOT_JOINED',
  cameraID: null,
  microphoneID: null,
  speakerID: null,
};

const ON_IOS_15_1 = typeof navigator !== 'undefined'
  && navigator.userAgent.includes('iPhone OS 15_1');

// Adapter Events
const EVENT_MEETING_UPDATE = 'meeting:update';

// TODO: Figure out how to import JS Doc definitions and remove duplication.
/**
 * A video conference in Webex over WebRTC.
 *
 * @external Meeting
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MeetingsAdapter.js#L20}
 * @see {@link https://webrtc.org}
 */

// TODO: Figure out how to import JS Doc definitions and remove duplication.
/**
 * Display options of a meeting control.
 *
 * @external MeetingControlDisplay
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MeetingsAdapter.js#L58}
 */

/**
 * Settings that specify what kind of tracks should be included in a media stream.
 *
 * @external MediaStreamConstraints
 * @see MediaStream
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints}
 */

/**
 * @typedef MeetingsJSON
 * @param {object} datasource  An object that contains meetings keyed by ID
 * @example
 * {
 *   "meeting-1": {
 *     "ID": "meeting-1",
 *     "title": "Development Standup",
 *     "localAudio": {
 *        stream: {}
 *     },
 *     "localVideo": {
 *        stream: {}
 *     },
 *     "localShare": {
 *        stream: {}
 *     },
 *     "remoteAudio": {},
 *     "remoteVideo": {},
 *     "remoteShare": {},
 *     "settings": {
 *        visible: false,
 *        preview: {
 *          audio: {},
 *          video: {},
 *        },
 *      },
 *     "state": "JOINED",
 *   },
 *   "meeting-2": {
 *     "ID": "meeting-2",
 *     "title": "Sprint Demos",
 *     "localAudio": {
 *        stream: {}
 *     },
 *     "localVideo": {
 *        stream: {}
 *     },
 *     "localShare": {
 *        stream: {}
 *     },
 *     "remoteAudio": {},
 *     "remoteVideo": {},
 *     "remoteShare": {},
 *     "settings": {
 *        visible: false,
 *        preview: {
 *          audio: {},
 *          video: {},
 *        },
 *      },
 *     "state": "NOT_JOINED",
 *   }
 * }
 */

/**
 * `MeetingsJSONAdapter` is an implementation of the `MeetingsAdapter` interface.
 * This implementation utilizes a JSON object as its source of meeting data.
 *
 * @see {@link MeetingsJSON}
 * @implements {MeetingsAdapter}
 */
export default class MeetingsJSONAdapter extends MeetingsAdapter {
  constructor(datasource) {
    super(datasource);

    this.meetingControls = {
      [MUTE_AUDIO_CONTROL]: new MuteAudioControl(this, MUTE_AUDIO_CONTROL),
      [MUTE_VIDEO_CONTROL]: new MuteVideoControl(this, MUTE_VIDEO_CONTROL),
      [SHARE_CONTROL]: new ShareControl(this, SHARE_CONTROL),
      [JOIN_CONTROL]: new JoinControl(this, JOIN_CONTROL),
      [LEAVE_CONTROL]: new LeaveControl(this, LEAVE_CONTROL),
      [DISABLED_MUTE_AUDIO_CONTROL]:
        new DisabledMuteAudioControl(this, DISABLED_MUTE_AUDIO_CONTROL),
      [ROSTER_CONTROL]: new RosterControl(this, ROSTER_CONTROL),
      [SETTINGS_CONTROL]: new SettingsControl(this, SETTINGS_CONTROL),
      [SWITCH_CAMERA_CONTROL]: new SwitchCameraControl(this, SWITCH_CAMERA_CONTROL),
      [SWITCH_MICROPHONE_CONTROL]: new SwitchMicrophoneControl(this, SWITCH_MICROPHONE_CONTROL),
      [SWITCH_SPEAKER_CONTROL]: new SwitchSpeakerControl(this, SWITCH_SPEAKER_CONTROL),
    };

    // While the browser is asking for sharing permission, this variable is set to a promise that resolves when the user allows/denies access
    this.displayStreamPromise = null;
  }

  /**
   * Creates a meeting for the given destination.
   * Returns an observable that emits a Meeting object with the data from the newly created meeting.
   * Observable completes after meeting is created and data is emitted.
   *
   * @param {string} destination  Virtual location where the meeting should take place
   * @returns {Observable.<Meeting>} Observable that emits data of the newly created meeting
   */
  createMeeting(destination) {
    return Observable.create((observer) => {
      if (destination) {
        observer.next({...EMPTY_MEETING, ID: destination});
        observer.next(this.datasource[destination]);
      } else {
        observer.error(new Error(`Could not create meeting at destination "${destination}"`));
      }

      observer.complete();
    });
  }

  /**
   * Returns an observable that emits data of a meeting of the given ID.
   * Observable will complete once the current user leaves the meeting.
   * The observable will emit whenever there is a change in the meeting.
   * Changes observed:
   * - Initial data request
   * - Screen share/unshare
   * - Audio & video mute/unmute
   *
   * @param {string} ID  Id of the meeting to get
   * @returns {Observable.<Meeting>} Observable that emits data of the given ID
   */
  getMeeting(ID) {
    const getMeeting$ = Observable.create(async (observer) => {
      // A falsy ID signifies that the meeting was not yet created, or is invalid
      if (!ID) {
        observer.next({
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
          showRoster: null,
          settings: {
            visible: false,
            preview: {
              audio: {},
              video: {},
            },
          },
          state: null,
          cameraID: null,
          microphoneID: null,
          speakerID: '',
        });
      } else if (this.fetchMeeting(ID)) {
        const meeting = this.fetchMeeting(ID);

        // Add a video stream as if it were a remote meeting
        if (meeting.remoteVideo instanceof MediaStream) {
          meeting.remoteVideo = this.getVideoStream();
        }

        // Add a share stream as if it were a remote sharing
        if (meeting.remoteShare instanceof MediaStream) {
          meeting.remoteShare = this.getShareStream();
        }

        // Add a video stream as if it were a local video
        if (this.emptyStream(meeting.localVideo.stream)) {
          const {stream, perm, deviceId} = await this.getStream({video: true, audio: false});

          meeting.localVideo.stream = stream;
          meeting.localVideo.permission = perm;
          meeting.cameraID = deviceId;
        }

        // Add an audio stream as if it were a local audio
        if (this.emptyStream(meeting.localAudio.stream)) {
          const {stream, perm, deviceId} = await this.getStream({video: false, audio: true});

          meeting.localAudio.stream = stream;
          meeting.localAudio.permission = perm;
          meeting.microphoneID = deviceId;
        }

        if (this.displayStreamPromise) {
          // The browser is currently asking the user for share permission, wait for that to finish
          await this.displayStreamPromise;
        }

        // Get a real screen share stream if this meeting requires one
        if (this.emptyStream(meeting.localShare.stream)) {
          this.displayStreamPromise = this.getDisplayStream();
          meeting.localShare.stream = await this.displayStreamPromise;
          this.displayStreamPromise = null;
        }

        observer.next(meeting);
      } else {
        observer.error(new Error(`Could not find meeting with ID "${ID}"`));
      }

      observer.complete();
    });

    // Send updates on the meeting when an action is triggered
    const meetingEvents$ = fromEvent(document, EVENT_MEETING_UPDATE).pipe(
      filter((event) => event.detail.ID === ID),
      // Make a copy of the meeting to treat it as if were immutable
      map((event) => ({...event.detail})),
    );

    return concat(getMeeting$, meetingEvents$).pipe(
      takeWhile((meeting) => meeting.state !== MeetingState.LEFT, true),
    );
  }

  /**
   * Joins the meeting by adding remote media streams.
   * Used by "join-meeting" meeting control.
   *
   * @param {string} ID  Id of the meeting for which to join
   * @param {object} options  An optional parameter that can contain authentication data
   */
  async joinMeeting(ID, options = {}) {
    await this.updateMeeting(ID, async (meeting) => {
      let updates;

      if (meeting.password && !(options.password || options.hostKey)) {
        updates = {passwordRequired: true};
      } else if (meeting.password && options.password && options.password !== meeting.password) {
        updates = {invalidPassword: true};
      } else if (meeting.hostKey && options.hostKey && options.hostKey !== meeting.hostKey) {
        updates = {invalidHostKey: true};
      } else {
        updates = {
          remoteVideo: (await this.getStream({video: true, audio: false})).stream,
          remoteAudio: (await this.getStream({video: false, audio: true})).stream,
          state: MeetingState.JOINED,
        };
      }

      return updates;
    });
  }

  /**
   * Allows user to join the meeting without allowing camera access
   *
   * @param {string} ID  Id of the meeting for which to join
   */
  async ignoreVideoAccessPrompt(ID) {
    await this.updateMeeting(ID, async () => ({
      localVideo: {
        permission: 'IGNORED',
      },
    }
    ));
  }

  /**
   * Allows user to join the meeting without allowing microphone access
   *
   * @param {string} ID  Id of the meeting for which to join
   */
  async ignoreAudioAccessPrompt(ID) {
    await this.updateMeeting(ID, async () => ({
      localAudio: {
        permission: 'IGNORED',
      },
    }
    ));
  }

  /**
   * Leaves the meeting and removes the remote media streams.
   * Used by "leave-meeting" meeting control.
   *
   * @param {string} ID  Id of the meeting for which to leave
   */
  async leaveMeeting(ID) {
    await this.updateMeeting(ID, async (meeting) => {
      this.stopStream(meeting.localVideo.stream);
      this.stopStream(meeting.localAudio.stream);

      return {
        remoteVideo: null,
        remoteAudio: null,
        state: MeetingState.LEFT,
      };
    });
  }

  /**
   * Returns a promise to a MediaStream object obtained from the user's browser.
   *
   * @param {MediaStreamConstraints} constraints  Object specifying media settings
   * @returns {Promise.<{MediaStream, string, string}>} Media stream that matches given constraints and the corresponding device id
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  async getStream(constraints) {
    let stream;
    let deviceId;
    let perm;

    if (constraints.video && ON_IOS_15_1) {
      return {
        stream: null,
        perm: 'ERROR',
      };
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      const availableDevices = await this.getAvailableDevices();
      const deviceLabel = mediaStream.getTracks()[0].label;

      deviceId = availableDevices.find((device) => device.label === deviceLabel)?.deviceId;

      // Filter out either video or audio from a given constraints and return a new media stream
      if (constraints.video) {
        stream = new MediaStream([mediaStream.getVideoTracks()[0]]);
      }

      if (constraints.audio) {
        stream = new MediaStream([mediaStream.getAudioTracks()[0]]);
      }

      perm = 'ALLOWED';
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Meetings JSON adapter can not display the local user stream', err);

      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError') {
          if (err.message === 'Permission dismissed') {
            perm = 'DISMISSED';
          } else if (err.message === 'Permission denied by system') {
            perm = 'DISABLED';
          } else {
            perm = 'DENIED';
          }
        } else if (err.name === 'NotReadableError') {
          perm = 'DISABLED';
        } else {
          perm = 'ERROR';
        }
      } else {
        perm = 'ERROR';
      }
    }

    return {stream, perm, deviceId};
  }

  /**
   * Returns a promise to a MediaStream object that captures the contents of a user display.
   *
   * @returns {Promise.<MediaStream>} Media stream that captures display
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  async getDisplayStream() {
    let captureStream = null;

    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia();
    } catch (reason) {
      // eslint-disable-next-line no-console
      console.error('Meetings JSON adapter can not display the local user sharing stream', reason);
    }

    return captureStream;
  }

  /**
   * Returns available media devices.
   *
   * @param {string} [meetingID]  Id of the meeting to get devices for
   * @param {'videoinput'|'audioinput'|'audiooutput'} [type]  String specifying the device type.
   * See {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/kind|MDN}
   * @returns {MediaDeviceInfo[]|null} Array containing media devices or null if devices can't be read.
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  async getAvailableDevices(meetingID, type) {
    const meeting = this.datasource[meetingID];
    let devices = [];

    if (
      !(type === 'videoinput' && ['ERROR', 'DISABLED'].includes(meeting.localVideo.permission)) &&
      !(type === 'audioinput' && ['ERROR', 'DISABLED'].includes(meeting.localAudio.permission))
    ) {
      try {
        devices = await navigator.mediaDevices.enumerateDevices();
        devices = devices.filter((device) => !type || (device.kind === type && device.deviceId));
      } catch (reason) {
        // eslint-disable-next-line no-console
        console.error('Meetings JSON adapter can not enumerate media devices', reason);
      }
    }

    return devices;
  }

  /**
   * Returns a promise to a MediaStream object that captures the contents of a video.
   *
   * @returns {Promise.<MediaStream>} Media stream that captures display
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  getStreamFromElement(id) {
    const video = document.getElementById(id);
    let stream = new MediaStream();

    if (video && video.captureStream) {
      stream = video.captureStream();
    } else if (video && video.mozCaptureStream) {
      stream = video.mozCaptureStream();
    }

    return stream;
  }

  /**
   * Returns a promise to a MediaStream object that captures the contents of a video.
   *
   * @returns {Promise.<MediaStream>} Media stream that captures display
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  getVideoStream() {
    return this.getStreamFromElement('remote-video');
  }

  /**
   * Returns a promise to a MediaStream object that captures the contents of a screen share
   *
   * @returns {Promise.<MediaStream>} Media stream that captures display
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  getShareStream() {
    return this.getStreamFromElement('remote-share');
  }

  /**
   * Stops the tracks of the given media stream.
   *
   * @see {@link MediaStream|https://developer.mozilla.org/en-US/docs/Web/API/MediaStream}.
   *
   * @private
   * @static
   * @param {MediaStream} stream Media stream for which to stop tracks
   */
  // eslint-disable-next-line class-methods-use-this
  stopStream(stream) {
    if (stream?.getTracks) {
      const tracks = stream.getTracks();

      tracks.forEach((track) => track.stop());
    }
  }

  /**
   * A function that checks whether or not a Mediastream object is empty (no tracks).
   *
   * @param {MediaStream|null} [stream]  Media stream object
   * @returns {boolean} True if the received param is a MediaStream object with no tracks
   */
  // eslint-disable-next-line class-methods-use-this
  emptyStream(stream) {
    return stream instanceof MediaStream && stream.getTracks().length === 0;
  }

  /**
   * Toggles muting the local audio media stream track.
   * Used by "mute-audio" meeting control.
   *
   * @param {string} ID  Id of the meeting for which to mute local audio
   */
  async toggleMuteAudio(ID) {
    await this.updateMeeting(ID, async (meeting) => {
      this.stopStream(meeting.localAudio.stream);

      return {
        localAudio: {
          stream: meeting.localAudio.stream
            ? null : (await this.getStream({video: false, audio: true})).stream,
        },
      };
    });
  }

  /**
   * Toggles muting the local audio media stream track.
   * Used by "mute-video" meeting control.
   *
   * @param {string} ID  Id of the meeting for which to mute local video
   */
  async toggleMuteVideo(ID) {
    await this.updateMeeting(ID, async (meeting) => {
      this.stopStream(meeting.localVideo.stream);

      return {
        localVideo: {
          stream: meeting.localVideo?.stream
            ? null : (await this.getStream({video: true, audio: false})).stream,
        },
      };
    });
  }

  /**
   * Handles the starting and stopping of the local screen share.
   *
   * @param {string} ID  Id of the meeting for which to update display
   */
  async handleLocalShare(ID) {
    await this.updateMeeting(ID, async (meeting) => {
      let updates = {};

      if (meeting.localShare.stream) {
        this.stopStream(meeting.localShare.stream);
        updates = {localShare: {stream: null}};
      } else {
        const stream = await this.getDisplayStream();

        if (stream?.getVideoTracks) {
          stream.getVideoTracks()[0].onended = () => {
            this.handleLocalShare(ID);
          };
          updates = {
            remoteShare: null,
            localShare: {stream},
          };
        }
      }

      return updates;
    });
  }

  /**
   * Toggles the roster display flag of a meeting.
   *
   * @param {string} ID  Id of the meeting for which to update display
   */
  async toggleRoster(ID) {
    await this.updateMeeting(ID, async (meeting) => ({
      showRoster: !meeting.showRoster,
    }));
  }

  /**
   * Toggles the settings display flag of a meeting.
   *
   * @param {string} ID  Id of the meeting for which to toggle the settings flag
   */
  async toggleSettings(ID) {
    await this.updateMeeting(ID, async (meeting) => {
      let updates;
      const openingSettings = !meeting.settings.visible;

      if (openingSettings) {
        // Populate the preview streams with clones of the meeting streams
        // so that switching cameras/microphones in preview doesn't stop the meeting streams.
        // If the camera or microphone are muted, start them for the preview.
        updates = {
          settings: {
            visible: true,
            preview: {},
          },
        };

        if (meeting.localVideo.stream) {
          updates.settings.preview.video = meeting.localVideo.stream.clone();
        } else {
          const {stream, deviceId} = await this.getStream(
            {video: {deviceId: {exact: meeting.cameraID}}},
          );

          updates.settings.preview.video = stream;
          updates.cameraID = deviceId;
        }

        if (meeting.localAudio.stream) {
          updates.settings.preview.audio = meeting.localAudio.stream.clone();
        } else {
          const {stream, deviceId} = await this.getStream(
            {audio: {deviceId: {exact: meeting.microphoneID}}},
          );

          updates.settings.preview.microphoneID = stream;
          updates.microphoneID = deviceId;
        }
      } else {
        // When closing settings, stop the existing meeting streams
        // and replace them with the last preview streams.
        this.stopStream(meeting.localVideo.stream);
        this.stopStream(meeting.localAudio.stream);
        updates = {
          settings: {
            visible: false,
          },
          localVideo: {
            stream: meeting.localVideo.stream && meeting.settings.preview.video,
          },
          localAudio: {
            stream: meeting.localAudio.stream && meeting.settings.preview.audio,
          },
        };
      }

      return updates;
    });
  }

  /**
   * Switches the camera control.
   *
   * @param {string} ID  Id of the meeting for which to switch camera
   * @param {string} cameraID  Id of the camera device to switch to
   */
  async switchCamera(ID, cameraID) {
    await this.updateMeeting(ID, async (meeting) => {
      this.stopStream(meeting.settings.preview.video);

      return {
        settings: {
          preview: {
            video: (await this.getStream({video: {deviceId: {exact: cameraID}}})).stream,
          },
        },
        cameraID,
      };
    });
  }

  /**
   * Switches the microphone control.
   *
   * @param {string} ID  Id of the meeting for which to switch microphone
   * @param {string} microphoneID  Id of the microphone device to switch to
   * @private
   */
  async switchMicrophone(ID, microphoneID) {
    await this.updateMeeting(ID, async (meeting) => {
      this.stopStream(meeting.settings.preview.audio);

      return {
        settings: {
          preview: {
            audio: (await this.getStream({audio: {deviceId: {exact: microphoneID}}})).stream,
          },
        },
        microphoneID,
      };
    });
  }

  /**
   * Switches the speaker.
   *
   * @param {string} ID  Meeting ID
   * @param {string} speakerID  Device id of the speaker to switch to
   * @private
   */
  async switchSpeaker(ID, speakerID) {
    await this.updateMeeting(ID, async () => ({speakerID}));
  }

  /**
   * Sets the password required flag to false.
   *
   * @param {string} ID  Id of the meeting
   */
  async clearPasswordRequiredFlag(ID) {
    await this.updateMeeting(ID, async () => ({passwordRequired: false}));
  }

  /**
   * Sets the invalidPassword flag to false.
   *
   * @param {string} ID  Id of the meeting
   */
  async clearInvalidPasswordFlag(ID) {
    await this.updateMeeting(ID, async () => ({invalidPassword: false}));
  }

  /**
   * Sets the invalidHostKey flag to false.
   *
   * @param {string} ID  Id of the meeting
   */
  async clearInvalidHostKeyFlag(ID) {
    await this.updateMeeting(ID, async () => ({invalidHostKey: false}));
  }

  /**
   * Returns a adapter meeting object retrieved from the collection.
   *
   * @private
   * @param {string} ID  Id of the meeting to fetch.
   * @returns {Meeting} The adapter meeting object from the meetings collection.
   */
  fetchMeeting(ID) {
    return this.datasource[ID];
  }

  /**
   * An async callback that returns an updated meeting
   *
   * @async
   * @callback UpdateMeetingCallback
   * @param {Meeting} meeting  Original meeting object
   * @returns {Promise<Meeting>} Updated meeting object
   */

  /**
   * Updates a meeting and notifies listeners
   *
   * @private
   * @async
   * @param {string} ID  Id of the meeting to fetch.
   * @param {UpdateMeetingCallback} updater  Function to update the meeting
   */
  async updateMeeting(ID, updater) {
    const meeting = this.fetchMeeting(ID);
    const meetingUpdates = await updater(meeting);

    deepMerge(meeting, meetingUpdates);
    document.dispatchEvent(new CustomEvent(EVENT_MEETING_UPDATE, {detail: meeting}));
  }

  /**
   * Displays the names of the available controls.
   *
   * @returns {string[]} Array containing the control names supported.
   */
  supportedControls() {
    return Object.keys(this.meetingControls);
  }

  // eslint-disable-next-line class-methods-use-this
  changeLayout(meetingID, layoutType) {
    console.log('Changing layout to', layoutType);
  }
}
