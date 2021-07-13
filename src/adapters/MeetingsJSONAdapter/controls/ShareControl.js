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

export default class ShareControl extends MeetingControl {
  /**
   * Handles the starting and stopping of the local screen share.
   *
   * @param {string} meetingID  Id of the meeting for which to update display
   */
  async action(meetingID) {
    await this.adapter.handleLocalShare(meetingID);
  }

  /**
   * Returns an observable that emits the display data of the share screen control.
   *
   * @param {string} meetingID  Id of the meeting for which to update display
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data
   */
  display(meetingID) {
    const inactive = {
      ID: this.ID,
      icon: 'share-screen-presence-stroke_26',
      tooltip: 'Start Sharing',
      state: MeetingControlState.INACTIVE,
    };
    const active = {
      ID: this.ID,
      icon: 'share-screen-presence-stroke_26',
      tooltip: 'Stop Sharing',
      state: MeetingControlState.ACTIVE,
    };

    return this.adapter.getMeeting(meetingID).pipe(
      map((meeting) => !!meeting.localShare.stream),
      distinctUntilChanged(),
      map((localShareExists) => (localShareExists ? active : inactive)),
    );
  }
}
