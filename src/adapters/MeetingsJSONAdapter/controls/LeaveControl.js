import {Observable} from 'rxjs';
import MeetingControl from './MeetingControl';

/**
 * Display options of a meeting control.
 *
 * @external MeetingControlDisplay
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MeetingsAdapter.js#L58}
 */

export default class LeaveControl extends MeetingControl {
  /**
   * Leaves the meeting and removes the remote media streams.
   * Used by "leave-meeting" meeting control.
   *
   * @param {string} meetingID  Id of the meeting for which to leave
   */
  async action(meetingID) {
    await this.adapter.leaveMeeting(meetingID);
  }

  /**
   * Returns an observable that emits the display data of the leave meeting control.
   *
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data
   */
  // eslint-disable-next-line class-methods-use-this
  display() {
    return Observable.create((observer) => {
      observer.next({
        ID: this.ID,
        type: 'CANCEL',
        icon: 'cancel_28',
        tooltip: 'Leave',
      });

      observer.complete();
    });
  }
}
