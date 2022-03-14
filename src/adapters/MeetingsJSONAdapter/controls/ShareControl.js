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
      type: 'TOGGLE',
      state: MeetingControlState.INACTIVE,
      icon: 'share-screen-presence-stroke',
      text: 'Start sharing',
      tooltip: 'Start sharing content',
    };
    const active = {
      ID: this.ID,
      type: 'TOGGLE',
      state: MeetingControlState.ACTIVE,
      icon: 'share-screen-filled',
      text: 'Stop sharing',
      tooltip: 'Stop sharing content',
    };
    const notSupported = {
      ID: this.ID,
      type: 'TOGGLE',
      state: MeetingControlState.DISABLED,
      icon: 'share-screen-presence-stroke',
      text: 'Start sharing',
      tooltip: 'Share screen not supported',
    };

    const browserSupport = navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;

    return !browserSupport ? of(notSupported) : this.adapter.getMeeting(meetingID).pipe(
      map((meeting) => !!meeting.localShare.stream),
      distinctUntilChanged(),
      map((localShareExists) => (localShareExists ? active : inactive)),
    );
  }
}
