import {Observable} from 'rxjs';
import MeetingControl from './MeetingControl';

/**
 * Display options of a meeting control.
 *
 * @external MeetingControlDisplay
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MeetingsAdapter.js#L58}
 */

export default class ProceedWithoutMicrophoneControl extends MeetingControl {
  /**
   * Joins the meeting without microphone
   *
   * @param {string} meetingID  Id of the meeting for which to join
   */
  async action(meetingID) {
    await this.adapter.ignoreAudioAccessPrompt(meetingID);
  }

  /**
   * Returns an observable that emits the display data of the meeting without microphone control.
   *
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data
   */
  // eslint-disable-next-line class-methods-use-this
  display() {
    return Observable.create((observer) => {
      observer.next({
        ID: this.ID,
        type: 'BUTTON',
        text: 'Proceed without audio',
        tooltip: 'This setting cannot be changed once the meeting starts.',
        hint: 'This setting cannot be changed once the meeting starts.',
      });

      observer.complete();
    });
  }
}
