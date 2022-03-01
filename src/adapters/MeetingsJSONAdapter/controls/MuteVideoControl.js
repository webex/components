import {Observable, of} from 'rxjs';
import {map, distinctUntilChanged} from 'rxjs/operators';
import {MeetingControlState} from '@webex/component-adapter-interfaces';
import MeetingControl from './MeetingControl';

/**
 * Display options of a meeting control.
 *
 * @external MeetingControlDisplay
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MeetingsAdapter.js#L58}
 */

export default class MuteVideoControl extends MeetingControl {
  /**
   * Toggles muting the local audio media stream track.
   * Used by "mute-video" meeting control.
   *
   * @param {string} meetingID  Id of the meeting for which to mute local video
   */
  async action(meetingID) {
    await this.adapter.toggleMuteVideo(meetingID);
  }

  /**
   * Returns an observable that emits the display data of the video mute control.
   *
   * @param {string} meetingID  Id of the meeting for which to update display
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data
   */
  display(meetingID) {
    const muted = {
      ID: this.ID,
      type: 'BUTTON',
      icon: 'camera-muted',
      tooltip: 'Start video',
      state: MeetingControlState.ACTIVE,
      text: 'Start video',
    };
    const unmuted = {
      ID: this.ID,
      type: 'BUTTON',
      icon: 'camera',
      tooltip: 'Stop video',
      state: MeetingControlState.INACTIVE,
      text: 'Stop video',
    };

    const notSupported = {
      ID: this.ID,
      type: 'BUTTON',
      icon: 'camera-muted',
      tooltip: 'Video not supported on iOS 15.1',
      state: MeetingControlState.DISABLED,
      text: 'No camera',
    };

    const ON_IOS_15_1 = typeof navigator !== 'undefined'
      && navigator.userAgent.includes('iPhone OS 15_1');

    return ON_IOS_15_1 ? of(notSupported) : this.adapter.getMeeting(meetingID).pipe(
      map((meeting) => !!meeting.localVideo.stream),
      distinctUntilChanged(),
      map((localVideoExists) => (localVideoExists ? unmuted : muted)),
    );
  }
}
