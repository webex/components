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

export default class MuteAudioControl extends MeetingControl {
  /**
   * Toggles muting the local audio media stream track.
   * Used by "mute-audio" meeting control.
   *
   * @param {string} meetingID  Id of the meeting for which to mute local audio
   */
  async action(meetingID) {
    await this.adapter.toggleMuteAudio(meetingID);
  }

  /**
   * Returns an observable that emits the display data of the audio mute control.
   *
   * @param {string} meetingID  Id of the meeting for which to update display
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data
   */
  display(meetingID) {
    const unmuted = {
      ID: this.ID,
      type: 'BUTTON',
      icon: 'microphone',
      tooltip: 'Mute audio',
      state: MeetingControlState.INACTIVE,
      text: 'Mute',
    };
    const muted = {
      ID: this.ID,
      type: 'BUTTON',
      icon: 'microphone-muted',
      tooltip: 'Unmute audio',
      state: MeetingControlState.ACTIVE,
      text: 'Unmute',
    };

    return this.adapter.getMeeting(meetingID).pipe(
      map((meeting) => !!meeting.localAudio?.stream),
      distinctUntilChanged(),
      map((localAudioExists) => (localAudioExists ? unmuted : muted)),
    );
  }
}
