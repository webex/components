import {
  concat, from, fromEvent, merge, Observable, of, Subject,
} from 'rxjs';
import {
  filter, flatMap, map, takeUntil, tap,
} from 'rxjs/operators';
import {MeetingsAdapter, MeetingControlState} from '@webex/component-adapter-interfaces';

// Defined meeting controls in Meetings JSON Adapter
export const MUTE_AUDIO_CONTROL = 'mute-audio';
export const MUTE_VIDEO_CONTROL = 'mute-video';
export const SHARE_CONTROL = 'share-screen';
export const JOIN_CONTROL = 'join-meeting';
export const LEAVE_CONTROL = 'leave-meeting';
export const DISABLED_MUTE_AUDIO_CONTROL = 'disabled-mute-audio';
export const DISABLED_JOIN_CONTROL = 'disabled-join-meeting';

/**
 * @typedef MeetingsJSON
 * @param {object} datasource An object that contains a set of meetings keyed by ID.
 * @example
 * {
 *  "meeting-1": {
 *     "ID": "meeting-1",
 *     "title": "Meeting Title",
 *     "startTime": "2019-08-20T21:00:00.000Z",
 *     "endTime": "2019-08-20T22:00:00.000Z",
 *     "localVideo": {},
 *     "remoteVideo": {},
 *     "localAudio": {},
 *     "remoteAudio": {},
 *     "localShare": {},
 *     "remoteShare": {}
 *  }
 * }
 */

/**
 * Implements the MeetingsAdapter interface with a JSON object as its datasource.
 *
 * @see {@link MeetingsJSON} for example datasource.
 * @class
 * @implements {MeetingsAdapter}
 */
export default class MeetingsJSONAdapter extends MeetingsAdapter {
  /**
   * Creates a new MeetingJSONAdapter.
   *
   * @param {object} datasource An object that contains a set of meetings keyed by ID.
   * @hideconstructor
   */
  constructor(datasource) {
    super(datasource);

    this.meetingControls = {};

    this.meetingControls[MUTE_AUDIO_CONTROL] = {
      ID: MUTE_AUDIO_CONTROL,
      action: this.toggleMuteAudio.bind(this),
      display: this.muteAudioControl.bind(this),
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
   * Returns an observable that emits a Meeting object with the data from the newly
   * created meeting.
   * Observable completes after emitting data.
   *
   * @param {string} destination  Virtual location where the meeting should take place.
   * @returns {Observable.<Meeting>}
   * @memberof MeetingsAdapter
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
   * Returns an observable that emits a Meeting object.
   * Whenever there is an update to the meeting, the observable
   * will emit a new updated Meeting object, if datasource permits.
   *
   * @param {string} ID  ID of the meeting to get.
   * @returns {Observable.<Meeting>}
   * @memberof MeetingsJSONAdapter
   */
  getMeeting(ID) {
    const end$ = new Subject();
    const getMeeting$ = Observable.create((observer) => {
      if (this.datasource[ID]) {
        observer.next(this.datasource[ID]);
      } else {
        observer.error(new Error(`Could not find meeting with ID "${ID}"`));
      }

      observer.complete();
    });

    // Attach media stream if any of the meeting's media stream properties are not  `null`.
    // We can not attach the MediaStream object in a JSON module, the work needs
    // to be done here.
    const getMeetingWithMedia$ = getMeeting$.pipe(
      /* eslint-disable no-confusing-arrow */
      flatMap((meeting) => meeting.localVideo
        ? from(this.getStream({video: true, audio: false})).pipe(
          map((localVideo) => ({...meeting, localVideo})),
        )
        : of(meeting)),
      flatMap((meeting) => meeting.localAudio
        ? from(this.getStream({video: false, audio: true})).pipe(
          map((localAudio) => ({...meeting, localAudio})),
        )
        : of(meeting)),
      flatMap((meeting) => meeting.remoteVideo
        ? from(this.getStream({video: true, audio: false})).pipe(
          map((remoteVideo) => ({...meeting, remoteVideo})),
        )
        : of(meeting)),
      flatMap((meeting) => meeting.remoteAudio
        ? from(this.getStream({video: false, audio: true})).pipe(
          map((remoteAudio) => ({...meeting, remoteAudio})),
        )
        : of(meeting)),
    );

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
      tap(() => end$.next(`Meeting "${ID}" has completed.`)),
    );

    const events$ = merge(audioEvents$, videoEvents$, joinEvents$, leaveEvents$, shareEvents$).pipe(
      filter((event) => event.detail.ID === ID),
      // Make a copy of the meeting to treat it as if were immutable
      map((event) => ({...event.detail})),
    );

    return concat(getMeetingWithMedia$, events$).pipe(
      tap((meeting) => {
        // Update the static meeting object after each change accordingly
        this.datasource[ID] = meeting;
      }),
      takeUntil(end$),
    );
  }

  /**
   * Returns a MediaStream object obtained from user local media.
   * @param {MediaStreamConstraints} constraints  an object specifying the types of the media to request
   * @returns {MediaStream}
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
   * Returns a promise to a MediaStream object that captures the contents of a user local display.
   *
   * @returns {Promise.<MediaStream>}
   * @memberof MeetingJSONAdapter
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
   * Toggles muting the local audio media stream track.
   * Used by "mute-audio" meeting control.
   *
   * @param {string} ID  ID of the meeting for which to mute local audio.
   * @memberof MeetingsJSONAdapter
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
   * Toggles muting the local audio media stream track.
   * Used by "mute-video" meeting control.
   *
   * @param {string} ID  ID of the meeting for which to mute local audio.
   * @memberof MeetingsJSONAdapter
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
   * Join the meeting by adding streams to the remote media
   * Used by "join-meeting" meeting control.
   *
   * @param {string} ID  ID of the meeting for which to mute local audio.
   * @memberof MeetingsJSONAdapter
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
   * Join the meeting by removing the remote media
   * Used by "leave-meeting" meeting control.
   *
   * @param {string} ID  ID of the meeting for which to mute local audio.
   * @memberof MeetingsJSONAdapter
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
   * Returns an observable that emits the display data of a meeting control.
   *
   * @param {string} ID ID of the meeting for which to update display
   * @returns {Observable.<MeetingControlDisplay>}
   * @memberof MeetingJSONAdapter
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

  /**
   * Returns an observable that emits the display data of a meeting control.
   *
   * @param {string} ID ID of the meeting for which to update display
   * @returns {Observable.<MeetingControlDisplay>}
   * @memberof MeetingJSONAdapter
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
   * Returns an observable that emits the display data of a meeting control.
   *
   * @param {string} ID ID of the meeting for which to update display
   * @returns {Observable.<MeetingControlDisplay>}
   * @memberof MeetingJSONAdapter
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
   * Returns an observable that emits the display data of a meeting control.
   *
   * @param {string} ID ID of the meeting for which to update display
   * @returns {Observable.<MeetingControlDisplay>}
   * @memberof MeetingJSONAdapter
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
   * @param {string} ID ID of the meeting for which to update display
   * @returns {Observable.<MeetingControlDisplay>}
   * @memberof MeetingJSONAdapter
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
   * Handles the starting and stopping of the local screen capture media stream.
   *
   * @param {string} ID ID of the meeting for which to update display
   * @memberof MeetingJSONAdapter
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
   * Returns an observable that emits the display data of a meeting control.
   *
   * @param {string} ID ID of the meeting for which to update display
   * @returns {Observable.<MeetingControlDisplay>}
   * @memberof MeetingJSONAdapter
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
   * @param {string} ID ID of the meeting for which to update display
   * @returns {Observable.<MeetingControlDisplay>}
   * @memberof MeetingJSONAdapter
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
