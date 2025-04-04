import {concat, Observable, defer} from 'rxjs';
import {
  first,
  map,
  concatMap,
  distinctUntilChanged,
} from 'rxjs/operators';
import MeetingControl from './MeetingControl';

/**
 * Display options of a meeting control.
 *
 * @external MeetingControlDisplay
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MeetingsAdapter.js#L58}
 */

export default class SwitchMicrophoneControl extends MeetingControl {
  /**
   * Switches the microphone control.
   *
   * @param {string} meetingID  Id of the meeting for which to switch microphone
   * @param {string} microphoneID  Id of the microphone device to switch to
   */
  async action(meetingID, microphoneID) {
    await this.adapter.switchMicrophone(meetingID, microphoneID);
  }

  /**
   * Returns an observable that emits the display data of the switch microphone control.
   *
   * @param {string} meetingID  Id of the meeting to switch microphone
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data
   * @private
   */
  display(meetingID) {
    const availableMicrophones$ = this.adapter.getMeeting(meetingID).pipe(
      first(),
      concatMap(() => defer(() => this.adapter.getAvailableDevices(meetingID, 'audioinput'))),
    );

    const initialControl$ = new Observable((observer) => {
      const meeting = this.adapter.fetchMeeting(meetingID);

      if (meeting) {
        observer.next({
          ID: this.ID,
          type: 'MULTISELECT',
          tooltip: 'Microphone Devices',
          noOptionsMessage: 'No available microphones',
          options: null,
          selected: null,

        });
        observer.complete();
      } else {
        observer.error(new Error(`Could not find meeting with ID "${meetingID}" to add switch microphone control`));
      }
    });

    const controlWithOptions$ = initialControl$.pipe(
      concatMap((control) => availableMicrophones$.pipe(
        map((availableMicrophones) => ({
          ...control,
          options: (availableMicrophones || []) && availableMicrophones.map((microphone) => ({
            value: microphone.deviceId,
            label: microphone.label || `Microphone-${microphone.deviceId}`,
            microphone,
          })),
        })),
      )),
    );

    const controlFromMeeting$ = controlWithOptions$.pipe(
      concatMap((control) => this.adapter.getMeeting(meetingID).pipe(
        map((meeting) => meeting.microphoneID),
        distinctUntilChanged(),
        map((microphoneID) => ({
          ...control,
          selected: microphoneID,
        })),
      )),
    );

    return concat(initialControl$, controlWithOptions$, controlFromMeeting$).pipe(
      distinctUntilChanged((prev, curr) => (
        prev.selected === curr.selected
        && prev.options === curr.options
      )),
    );
  }
}
