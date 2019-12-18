import {concat, from, fromEvent, Observable} from 'rxjs';
import {filter, flatMap, map} from 'rxjs/operators';
import {MeetingsAdapter, MeetingControlState} from '@webex/component-adapter-interfaces';

// Defined meeting controls in Meetings JSON Adapter
export const MUTE_AUDIO_CONTROL = 'mute-audio';
export const JOIN_CONTROL = 'join-meeting';
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

    this.meetingControls[JOIN_CONTROL] = {
      ID: JOIN_CONTROL,
      action: () => {},
      display: this.joinControl.bind(this),
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
   * @param {string} destination  Virtual location where the meeting should take place
   * @returns {Observable.<Meeting>}
   * @memberof MeetingsAdapter
   */
  createMeeting() {
    return Observable.create((observer) => {
      observer.next(this.datasource.localMedia);
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
    const getMeeting$ = Observable.create((observer) => {
      if (this.datasource[ID]) {
        observer.next(this.datasource[ID]);
      } else {
        observer.error(new Error(`Could not find meeting with ID "${ID}"`));
      }

      observer.complete();
    });

    // Attach local media stream if meeting `localVideo` property is not `null`.
    // We can not attach the MediaStream object in a JSON module, the work needs
    // to be done here.
    const getMeetingWithLocalMedia$ = getMeeting$.pipe(
      flatMap((meeting) =>
        from(this.getLocalVideo()).pipe(map((localVideo) => (meeting.localVideo ? {...meeting, localVideo} : meeting)))
      )
    );

    // Send updates on the meeting when a mute event is triggered
    const muteEvent$ = fromEvent(document, MUTE_AUDIO_CONTROL).pipe(
      filter((event) => event.detail.ID === ID),
      map((event) => event.detail)
    );

    return concat(getMeetingWithLocalMedia$, muteEvent$);
  }

  /**
   * Retrieves the local device media (video/audio) and adds them to the meeting
   * with the some default media settings.
   * Adding local media is performed as a side-effect and this method does not
   * return a value. Instead, adding local media to a meeting should trigger
   * getMeeting to emit a new updated Meeting object.
   *
   * @memberof MeetingsJSONAdapter
   */
  async addLocalMedia() {
    await this.getLocalVideo();
  }

  /**
   * Returns a MediaStream object obtained from local user media.
   * @returns {MediaStream}
   */
  async getLocalVideo() {
    const constraints = {
      video: true,
      audio: false,
    };
    let stream;

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (reason) {
      // eslint-disable-next-line no-console
      console.error('Meetings JSON adapter can not display the user local stream', reason);
    }

    return stream;
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
      icon: 'microphone',
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
        observer.next(meeting.localAudio.muted ? muted : unmuted);
      } else {
        observer.error(new Error(`Could not find meeting with ID "${ID}"`));
      }

      observer.complete();
    });

    const muteEvent$ = fromEvent(document, MUTE_AUDIO_CONTROL).pipe(
      filter((event) => event.detail.ID === ID),
      map((event) => (event.detail.localAudio.muted ? muted : unmuted))
    );

    return concat(default$, muteEvent$);
  }

  /**
   * Toggles muting the local audio media stream track.
   * Used by "mute-audio" meeting control.
   *
   * @param {string} ID  ID of the meeting for which to mute local audio.
   * @memberof MeetingsJSONAdapter
   * @private
   */
  toggleMuteAudio(ID) {
    if (this.datasource[ID]) {
      const meeting = {...this.datasource[ID]}; // Copy meeting to modify mute
      const muteEvent = new CustomEvent(MUTE_AUDIO_CONTROL, {detail: meeting});

      if (meeting.localAudio) {
        meeting.localAudio.muted = !meeting.localAudio.muted;
        document.dispatchEvent(muteEvent);
      }
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
   * Returns an observable that emits the display data of a disabled meeting control.
   *
   * @param {string} ID ID of the meeting for which to update display
   * @returns {Observable.<MeetingControlDisplay>}
   * @memberof MeetingJSONAdapter
   * @private
   */
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
   * Returns an observable that emits the display data of a disabled meeting control.
   *
   * @param {string} ID ID of the meeting for which to update display
   * @returns {Observable.<MeetingControlDisplay>}
   * @memberof MeetingJSONAdapter
   * @private
   */
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
