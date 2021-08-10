import {Observable} from 'rxjs';
import MeetingControl from './MeetingControl';

/**
 * Display options of a meeting control.
 *
 * @external MeetingControlDisplay
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MeetingsAdapter.js#L58}
 */

export default class JoinControl extends MeetingControl {
  /**
   * Joins the meeting by adding remote media streams.
   * Used by "join-meeting" meeting control.
   *
   * @param {string} meetingID  Id of the meeting for which to join
   */
  async action(meetingID) {
    await this.adapter.joinMeeting(meetingID);
  }

  /**
   * Returns an observable that emits the display data of the join meeting control.
   *
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data
   */
  // eslint-disable-next-line class-methods-use-this
  display() {
    return Observable.create((observer) => {
      observer.next({
        ID: this.ID,
        type: 'JOIN',
        text: 'Join meeting',
        tooltip: 'Join meeting',
      });

      observer.complete();
    });
  }
}
