import {
  concat, fromEvent, merge, Observable, Subject,
} from 'rxjs';
import {
  filter, map, takeUntil, tap,
} from 'rxjs/operators';
import {MeetingsAdapter, MeetingControlState} from '@webex/component-adapter-interfaces';

// Meeting control names
export const MUTE_AUDIO_CONTROL = 'mute-audio';
export const MUTE_VIDEO_CONTROL = 'mute-video';
export const SHOW_PARTICIPANTS = 'participant-list';
export const SHARE_CONTROL = 'share-screen';
export const JOIN_CONTROL = 'join-meeting';
export const LEAVE_CONTROL = 'leave-meeting';
export const DISABLED_MUTE_AUDIO_CONTROL = 'disabled-mute-audio';
export const DISABLED_JOIN_CONTROL = 'disabled-join-meeting';

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
 * @param {object} datasource An object that contains meetings keyed by ID
 * @example
 * {
 *   "meeting-1": {
 *     "ID": "meeting-1",
 *     "title": "Development Standup",
 *     "localAudio": {},
 *     "localVideo": {},
 *     "localShare": null,
 *     "remoteAudio": {},
 *     "remoteVideo": {},
 *     "remoteShare": {}
 *   },
 *   "meeting-2": {
 *     "ID": "meeting-2",
 *     "title": "Sprint Demos",
 *     "localAudio": {},
 *     "localVideo": {},
 *     "localShare": {},
 *     "remoteAudio": {},
 *     "remoteVideo": {},
 *     "remoteShare": {}
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

    this.meetingControls = {};

    this.meetingControls[MUTE_AUDIO_CONTROL] = {
      ID: MUTE_AUDIO_CONTROL,
      action: this.toggleMuteAudio.bind(this),
      display: this.muteAudioControl.bind(this),
    };

    this.meetingControls[SHOW_PARTICIPANTS] = {
      ID: SHOW_PARTICIPANTS,
      action: this.toggleParticipantList.bind(this),
      display: this.participantList.bind(this),
    };

    this.meetingControls[MUTE_VIDEO_CONTROL] = {
      ID: MUTE_VIDEO_CONTROL,
      action: this.toggleMuteVideo.bind(this),
      display: this.muteVideoControl.bind(this),
    };

    this.meetingControls[SHARE_CONTROL] = {
      ID: SHARE_CONTROL,
      action: this.handleLocalShare.bind(this),
      display: this.shareControl.bind(this),
    };

    this.meetingControls[JOIN_CONTROL] = {
      ID: JOIN_CONTROL,
      action: this.joinMeeting.bind(this),
      display: this.joinControl.bind(this),
    };

    this.meetingControls[LEAVE_CONTROL] = {
      ID: LEAVE_CONTROL,
      action: this.leaveMeeting.bind(this),
      display: this.leaveControl.bind(this),
    };

    this.meetingControls[DISABLED_MUTE_AUDIO_CONTROL] = {
      ID: DISABLED_MUTE_AUDIO_CONTROL,
      action: () => {},
      display: this.disabledMuteAudioControl.bind(this),
    };

    this.meetingControls[DISABLED_JOIN_CONTROL] = {
      ID: DISABLED_JOIN_CONTROL,
      action: () => {},
      display: this.disabledJoinControl.bind(this),
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
   * - Screen hare/unshare
   * - Audio & video mute/unmute
   *
   * @param {string} ID  ID of the meeting to get
   * @returns {Observable.<Meeting>} Observable that emits data of the given ID
   */
  getMeeting(ID) {
    const end$ = new Subject();
    const getMeeting$ = Observable.create((observer) => {
      // A null ID signifies that the meeting is over, in the past or invalid
      if (ID === null) {
        observer.next({
          ID: null,
          title: null,
          localAudio: null,
          localVideo: null,
          localShare: null,
          remoteAudio: null,
          remoteVideo: null,
          remoteShare: null,
        });
      } else if (this.datasource[ID]) {
        const meeting = this.datasource[ID];

        // Add a video stream as if it were a remote meeting
        if (meeting.remoteVideo instanceof MediaStream) {
          meeting.remoteVideo = this.getVideoStream();
        }

        observer.next(meeting);
      } else {
        observer.error(new Error(`Could not find meeting with ID "${ID}"`));
      }

      observer.complete();
    });

    // Send updates on the meeting when an action is triggered
    const shareEvents$ = fromEvent(document, SHARE_CONTROL).pipe(
      tap(() => {
        const meeting = this.datasource[ID];

        // Use local screen share to fake a remote user's screen sharing
        meeting.remoteShare = meeting.localShare;
      }),
    );

    const audioEvents$ = fromEvent(document, MUTE_AUDIO_CONTROL);
    const videoEvents$ = fromEvent(document, MUTE_VIDEO_CONTROL);
    const joinEvents$ = fromEvent(document, JOIN_CONTROL);
    const leaveEvents$ = fromEvent(document, LEAVE_CONTROL).pipe(
      filter((event) => event.detail.ID === ID),
      tap(() => end$.next(`Meeting "${ID}" has completed.`)),
    );

    const events$ = merge(audioEvents$, videoEvents$, joinEvents$, leaveEvents$, shareEvents$).pipe(
      filter((event) => event.detail.ID === ID),
      // Make a copy of the meeting to treat it as if were immutable
      map((event) => ({...event.detail})),
    );

    return concat(getMeeting$, events$).pipe(
      tap((meeting) => {
        // Update the static meeting object after each change accordingly
        this.datasource[ID] = meeting;
      }),
      takeUntil(end$),
    );
  }

  /**
   * Joins the meeting by adding remote media streams.
   * Used by "join-meeting" meeting control.
   *
   * @param {string} ID  ID of the meeting for which to join
   * @private
   */
  async joinMeeting(ID) {
    if (this.datasource[ID]) {
      const meeting = this.datasource[ID];

      meeting.remoteVideo = await this.getStream({video: true, audio: false});
      meeting.remoteAudio = await this.getStream({video: false, audio: true});

      document.dispatchEvent(new CustomEvent(JOIN_CONTROL, {detail: meeting}));
    }
  }

  /**
   * Leaves the meeting and removes the remote media streams.
   * Used by "leave-meeting" meeting control.
   *
   * @param {string} ID  ID of the meeting for which to leave
   * @private
   */
  leaveMeeting(ID) {
    if (this.datasource[ID]) {
      const meeting = this.datasource[ID];

      meeting.remoteVideo = null;
      meeting.remoteAudio = null;

      document.dispatchEvent(new CustomEvent(LEAVE_CONTROL, {detail: meeting}));
    }
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
   * Returns a promise to a MediaStream object that captures the contents of a video.
   *
   * @returns {Promise.<MediaStream>} Media stream that captures display
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  getVideoStream() {
    const video = document.getElementById('remote-video');
    let stream = new MediaStream();

    if (video && video.captureStream) {
      stream = video.captureStream();
    } else if (video && video.mozCaptureStream) {
      stream = video.mozCaptureStream();
    }

    return stream;
  }

  /**
   * Toggles muting the local audio media stream track.
   * Used by "mute-audio" meeting control.
   *
   * @param {string} ID  ID of the meeting for which to mute local audio
   * @private
   */
  async toggleMuteAudio(ID) {
    if (this.datasource[ID]) {
      const meeting = this.datasource[ID];

      if (meeting.localAudio) {
        meeting.localAudio = null;
      } else {
        meeting.localAudio = await this.getStream({video: false, audio: true});
      }

      document.dispatchEvent(new CustomEvent(MUTE_AUDIO_CONTROL, {detail: meeting}));
    }
  }

  /**
   * Toggle participant list.
   * Used by "participant-list" meeting control.
   *
   * @param {string} ID  ID of the meeting for which toggle participant list
   * @private
   */
  async toggleParticipantList(ID) {
    if (this.datasource[ID]) {
      // const meeting = this.datasource[ID];
      // TODO: implement event
    }
  }

  /**
   * Toggles muting the local audio media stream track.
   * Used by "mute-video" meeting control.
   *
   * @param {string} ID  ID of the meeting for which to mute local video
   * @private
   */
  async toggleMuteVideo(ID) {
    if (this.datasource[ID]) {
      const meeting = this.datasource[ID];

      if (meeting.localVideo) {
        meeting.localVideo = null;
      } else {
        meeting.localVideo = await this.getStream({video: true, audio: false});
      }

      document.dispatchEvent(new CustomEvent(MUTE_VIDEO_CONTROL, {detail: meeting}));
    }
  }

  /**
   * Returns an observable that emits the display data of the audio mute control.
   *
   * @param {string} ID ID of the meeting for which to update display
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data
   * @private
   */
  muteAudioControl(ID) {
    const unmuted = {
      ID: MUTE_AUDIO_CONTROL,
      icon: 'microphone-muted',
      tooltip: 'Mute',
      state: MeetingControlState.INACTIVE,
    };
    const muted = {
      ID: MUTE_AUDIO_CONTROL,
      icon: 'microphone-muted',
      tooltip: 'Unmute',
      state: MeetingControlState.ACTIVE,
    };

    const default$ = Observable.create((observer) => {
      const meeting = this.datasource[ID];

      if (meeting) {
        observer.next(meeting.localAudio ? unmuted : muted);
      } else {
        observer.error(new Error(`Could not find meeting with ID "${ID}"`));
      }

      observer.complete();
    });

    const muteEvent$ = fromEvent(document, MUTE_AUDIO_CONTROL).pipe(
      filter((event) => event.detail.ID === ID),
      map((event) => (event.detail.localAudio ? unmuted : muted)),
    );

    return concat(default$, muteEvent$);
  }

  participantList(ID) {
    const show = {
      ID: SHOW_PARTICIPANTS,
      icon: 'participant-list',
      tooltip: 'Show',
      state: MeetingControlState.INACTIVE,
    };

    const hide = {
      ID: SHOW_PARTICIPANTS,
      icon: 'participant-list',
      tooltip: 'Hide',
      state: MeetingControlState.ACTIVE,
    };

    const default$ = Observable.create((observer) => {
      const meeting = this.datasource[ID];

      if (meeting) {
        observer.next(meeting.localAudio ? show : hide);
      } else {
        observer.error(new Error(`Could not find meeting with ID "${ID}"`));
      }

      observer.complete();
    });

    const muteEvent$ = fromEvent(document, MUTE_AUDIO_CONTROL).pipe(
      filter((event) => event.detail.ID === ID),
      map((event) => (event.detail.localAudio ? show : hide)),
    );

    return concat(default$, muteEvent$);
  }

  /**
   * Returns an observable that emits the display data of the video mute control.
   *
   * @param {string} ID ID of the meeting for which to update display
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data
   * @private
   */
  muteVideoControl(ID) {
    const muted = {
      ID: MUTE_VIDEO_CONTROL,
      icon: 'camera-muted',
      tooltip: 'Start video',
      state: MeetingControlState.ACTIVE,
      text: null,
    };
    const unmuted = {
      ID: MUTE_VIDEO_CONTROL,
      icon: 'camera-muted',
      tooltip: 'Stop video',
      state: MeetingControlState.INACTIVE,
      text: null,
    };

    const default$ = Observable.create((observer) => {
      const meeting = this.datasource[ID];

      if (meeting) {
        observer.next(meeting.localVideo ? unmuted : muted);
      } else {
        observer.error(new Error(`Could not find meeting with ID "${ID}"`));
      }

      observer.complete();
    });

    const muteEvent$ = fromEvent(document, MUTE_VIDEO_CONTROL).pipe(
      filter((event) => event.detail.ID === ID),
      map((event) => (event.detail.localVideo ? unmuted : muted)),
    );

    return concat(default$, muteEvent$);
  }

  /**
   * Returns an observable that emits the display data of the join meeting control.
   *
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  joinControl() {
    return Observable.create((observer) => {
      observer.next({
        ID: JOIN_CONTROL,
        text: 'Join meeting',
        tooltip: 'Join meeting',
        state: MeetingControlState.ACTIVE,
      });

      observer.complete();
    });
  }

  /**
   * Returns an observable that emits the display data of the leave meeting control.
   *
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  leaveControl() {
    return Observable.create((observer) => {
      observer.next({
        ID: LEAVE_CONTROL,
        icon: 'cancel',
        tooltip: 'Leave',
        state: MeetingControlState.ACTIVE,
      });

      observer.complete();
    });
  }

  /**
   * Returns an observable that emits the display data of a disabled meeting control.
   *
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  disabledJoinControl() {
    return Observable.create((observer) => {
      observer.next({
        ID: JOIN_CONTROL,
        text: 'Join meeting',
        tooltip: 'Join meeting',
        state: MeetingControlState.DISABLED,
      });

      observer.complete();
    });
  }

  /**
   * Handles the starting and stopping of the local screen share.
   *
   * @param {string} ID ID of the meeting for which to update display
   * @private
   */
  async handleLocalShare(ID) {
    const meeting = this.datasource[ID];

    if (meeting.localShare) {
      meeting.localShare.getTracks()[0].stop();
      meeting.localShare = null;
    } else {
      meeting.localShare = await this.getDisplayStream();

      if (meeting.localShare) {
        // Handle browser's built-in stop Button
        meeting.localShare.getVideoTracks()[0].onended = () => {
          meeting.localShare = null;
          meeting.remoteShare = null;
          document.dispatchEvent(new CustomEvent(SHARE_CONTROL, {detail: meeting}));
        };
      }
    }

    document.dispatchEvent(new CustomEvent(SHARE_CONTROL, {detail: meeting}));
  }

  /**
   * Returns an observable that emits the display data of the share screen control.
   *
   * @param {string} ID ID of the meeting for which to update display
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data
   * @private
   */
  shareControl(ID) {
    const inactive = {
      ID: SHARE_CONTROL,
      icon: 'share',
      tooltip: 'Start Sharing',
      state: MeetingControlState.INACTIVE,
    };
    const active = {
      ID: SHARE_CONTROL,
      icon: 'share',
      tooltip: 'Stop Sharing',
      state: MeetingControlState.ACTIVE,
    };

    const default$ = Observable.create((observer) => {
      const meeting = this.datasource[ID];

      if (meeting) {
        observer.next(meeting.localShare ? active : inactive);
      } else {
        observer.error(new Error(`Could not find meeting with ID "${ID}"`));
      }

      observer.complete();
    });

    const shareEvent$ = fromEvent(document, SHARE_CONTROL).pipe(
      filter((event) => event.detail.ID === ID),
      map((event) => (event.detail.localShare ? active : inactive)),
    );

    return concat(default$, shareEvent$);
  }

  /**
   * Returns an observable that emits the display data of a disabled meeting control.
   *
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  disabledMuteAudioControl() {
    return Observable.create((observer) => {
      observer.next({
        ID: JOIN_CONTROL,
        icon: 'microphone',
        tooltip: 'Mute disabled',
        state: MeetingControlState.DISABLED,
      });

      observer.complete();
    });
  }
}
