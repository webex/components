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

export default class SettingsControl extends MeetingControl {
  /**
   * Toggles the settings display flag of a meeting.
   *
   * @param {string} meetingID  Id of the meeting for which to toggle the settings flag
   */
  async action(meetingID) {
    await this.adapter.toggleSettings(meetingID);
  }

  /**
   * Returns an observable that emits the display data of a settings control.
   *
   * @param {string} meetingID  Id of the meeting to toggle settings
   * @returns {Observable.<MeetingControlDisplay>} Observable stream that emits display data of the settings control
   */
  display(meetingID) {
    const active = {
      ID: this.ID,
      type: 'BUTTON',
      state: MeetingControlState.ACTIVE,
      icon: 'settings',
      text: 'Settings',
      tooltip: 'Meeting settings',
    };
    const inactive = {
      ID: this.ID,
      type: 'BUTTON',
      state: MeetingControlState.INACTIVE,
      icon: 'settings',
      text: 'Settings',
      tooltip: 'Meeting settings',
    };

    return this.adapter.getMeeting(meetingID).pipe(
      map((meeting) => !!meeting.showSettings),
      distinctUntilChanged(),
      map((showSettingsExists) => (showSettingsExists ? active : inactive)),
    );
  }
}
