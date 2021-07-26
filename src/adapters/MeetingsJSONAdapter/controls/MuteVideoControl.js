import {Observable} from 'rxjs';
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
      icon: 'camera-muted_28',
      tooltip: 'Start video',
      state: MeetingControlState.ACTIVE,
      text: 'Start video',
    };
    const unmuted = {
      ID: this.ID,
      icon: 'camera-muted_28',
      tooltip: 'Stop video',
      state: MeetingControlState.INACTIVE,
      text: 'Stop video',
    };

    return this.adapter.getMeeting(meetingID).pipe(
      map((meeting) => !!meeting.localVideo.stream),
      distinctUntilChanged(),
      map((localVideoExists) => (localVideoExists ? unmuted : muted)),
    );
  }
}
