import {concat, fromEvent, Observable} from 'rxjs';
import {filter, map, takeWhile} from 'rxjs/operators';
import {MeetingsAdapter, MeetingState} from '@webex/component-adapter-interfaces';

import {deepMerge} from '../util';

import DisabledJoinControl from './MeetingsJSONAdapter/controls/DisabledJoinControl';
import DisabledMuteAudioControl from './MeetingsJSONAdapter/controls/DisabledMuteAudioControl';
import JoinControl from './MeetingsJSONAdapter/controls/JoinControl';
import LeaveControl from './MeetingsJSONAdapter/controls/LeaveControl';
import MuteAudioControl from './MeetingsJSONAdapter/controls/MuteAudioControl';
import MuteVideoControl from './MeetingsJSONAdapter/controls/MuteVideoControl';
import ProceedWithoutCameraControl from './MeetingsJSONAdapter/controls/ProceedWithoutCameraControl';
import ProceedWithoutMicrophoneControl from './MeetingsJSONAdapter/controls/ProceedWithoutMicrophoneControl';
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
export const PROCEED_WITHOUT_CAMERA_CONTROL = 'proceed-without-camera';
export const PROCEED_WITHOUT_MICROPHONE_CONTROL = 'proceed-without-microphone';
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
      [PROCEED_WITHOUT_CAMERA_CONTROL]:
        new ProceedWithoutCameraControl(this, PROCEED_WITHOUT_CAMERA_CONTROL),
      [PROCEED_WITHOUT_MICROPHONE_CONTROL]:
        new ProceedWithoutMicrophoneControl(this, PROCEED_WITHOUT_MICROPHONE_CONTROL),
      [LEAVE_CONTROL]: new LeaveControl(this, LEAVE_CONTROL),
      [DISABLED_MUTE_AUDIO_CONTROL]:
        new DisabledMuteAudioControl(this, DISABLED_MUTE_AUDIO_CONTROL),
      [DISABLED_JOIN_CONTROL]: new DisabledJoinControl(this, DISABLED_JOIN_CONTROL),
      [ROSTER_CONTROL]: new RosterControl(this, ROSTER_CONTROL),
      [SETTINGS_CONTROL]: new SettingsControl(this, SETTINGS_CONTROL),
      [SWITCH_CAMERA_CONTROL]: new SwitchCameraControl(this, SWITCH_CAMERA_CONTROL),
      [SWITCH_MICROPHONE_CONTROL]: new SwitchMicrophoneControl(this, SWITCH_MICROPHONE_CONTROL),
      [SWITCH_SPEAKER_CONTROL]: new SwitchSpeakerControl(this, SWITCH_SPEAKER_CONTROL),
    };
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
          speakerID: null,
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
          meeting.localVideo.stream = await this.getStream({video: true, audio: false});
        }

        // Add an audio stream as if it were a local audio
        if (this.emptyStream(meeting.localAudio.stream)) {
          meeting.localAudio.stream = await this.getStream({video: false, audio: true});
        }

        // Add a share stream as if it were a local sharing
        if (this.emptyStream(meeting.localShare.stream)) {
          meeting.localShare.stream = await this.getDisplayStream();
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

      if (meeting.password && !options.password) {
        updates = {passwordRequired: true};
      } else if (meeting.password && options.password !== meeting.password) {
        updates = {invalidPassword: true};
      } else {
        updates = {
          remoteVideo: await this.getStream({video: true, audio: false}),
          remoteAudio: await this.getStream({video: false, audio: true}),
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
   * @returns {Promise.<MediaStream>} Media stream that matches given constraints
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  async getStream(constraints) {
    let stream;

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

      // Filter out either video or audio from a given constraints and return a new media stream
      if (constraints.video) {
        stream = new MediaStream([mediaStream.getVideoTracks()[0]]);
      }

      if (constraints.audio) {
        stream = new MediaStream([mediaStream.getAudioTracks()[0]]);
      }
    } catch (reason) {
      // eslint-disable-next-line no-console
      console.error('Meetings JSON adapter can not display the local user stream', reason);
    }

    return stream;
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
   * @param {'videoinput'|'audioinput'|'audiooutput'} type  String specifying the device type.
   * See {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/kind|MDN}
   * @returns {MediaDeviceInfo[]|null} Array containing media devices or null if devices can't be read.
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  async getAvailableDevices(type) {
    let devices = null;

    try {
      devices = await navigator.mediaDevices.enumerateDevices();
      devices = devices.filter((device) => device.kind === type && device.deviceId);
    } catch (reason) {
      // eslint-disable-next-line no-console
      console.error('Meetings JSON adapter can not enumerate media devices', reason);
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
            ? null : await this.getStream({video: false, audio: true}),
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
            ? null : await this.getStream({video: true, audio: false}),
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
    await this.updateMeeting(ID, async (meeting) => ({
      settings: {
        visible: !meeting.settings.visible,
      },
    }));
  }

  /**
   * Switches the camera control.
   *
   * @param {string} ID  Id of the meeting for which to switch camera
   * @param {string} cameraID  Id of the camera device to switch to
   */
  async switchCamera(ID, cameraID) {
    await this.updateMeeting(ID, async (meeting) => {
      this.stopStream(meeting.localVideo.stream);

      return {
        localVideo: {
          stream: await this.getStream({video: {deviceId: {exact: cameraID}}}),
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
      this.stopStream(meeting.localAudio.stream);

      return {
        localAudio: {
          stream: await this.getStream({audio: {deviceId: {exact: microphoneID}}}),
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
   * Sets the password required flag.
   *
   * @param {string} ID  Id of the meeting
   * @param {boolean} passwordRequired  Flag indicating if this meeting requires password authentication
   */
  async setPasswordRequired(ID, passwordRequired) {
    await this.updateMeeting(ID, async () => ({passwordRequired}));
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
}
