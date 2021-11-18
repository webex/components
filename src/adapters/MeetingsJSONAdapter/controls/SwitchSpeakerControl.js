import {concat, Observable, defer} from 'rxjs';
import {
  map,
  concatMap,
  distinctUntilChanged,
} from 'rxjs/operators';
import MeetingControl from './MeetingControl';
import {isSpeakerSupported} from '../../../components/helpers';

/**
 * Display options of a meeting control.
 *
 * @external MeetingControlDisplay
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MeetingsAdapter.js#L58}
 */

export default class SwitchSpeakerControl extends MeetingControl {
  /**
   * Switches the speaker control.
   *
   * @param {string} meetingID  Id of the meeting for which to switch speaker
   * @param {string} speakerID  Id of the speaker device to switch to
   */
  async action(meetingID, speakerID) {
    await this.adapter.switchSpeaker(meetingID, speakerID);
  }

  /**
   * Returns an observable that emits the display data of the switch speaker control.
   *
   * @param {string} meetingID  Id of the meeting to switch speaker
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data
   * @private
   */
  display(meetingID) {
    const availableSpeakers$ = defer(() => this.adapter.getAvailableDevices('audiooutput')).pipe(
      map((availableSpeakers) => availableSpeakers.map((speaker) => ({
        value: speaker.deviceId,
        label: speaker.label,
        speaker,
      }))),
      map((options) => ([{value: '', label: 'Browser Default'}, ...options])),
    );

    const initialControl$ = new Observable((observer) => {
      const meeting = this.adapter.fetchMeeting(meetingID);

      if (meeting) {
        observer.next({
          ID: this.ID,
          type: 'MULTISELECT',
          // The browser api setSinkId() does not work properly on Firefox and Safari browsers so we need to treat them separately by displaying a message inside a tooltip in both cases.
          // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId
          tooltip: isSpeakerSupported ? 'Speaker Devices' : 'The current browser does not support changing speakers',
          noOptionsMessage: 'No available speakers',
          options: null,
          selected: null,
          hint: 'Use arrow keys to navigate between speaker options and hit "Enter" to select.',
        });
        observer.complete();
      } else {
        observer.error(new Error(`Could not find meeting with ID "${meetingID}" to add switch speaker control`));
      }
    });

    const controlWithOptions$ = initialControl$.pipe(
      concatMap((control) => availableSpeakers$.pipe(
        map((availableSpeakers) => ({
          ...control,
          options: availableSpeakers,
        })),
      )),
    );

    const controlFromMeeting$ = controlWithOptions$.pipe(
      concatMap((control) => this.adapter.getMeeting(meetingID).pipe(
        map((meeting) => meeting.speakerID),
        distinctUntilChanged(),
        map((speakerID) => ({
          ...control,
          selected: speakerID,
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
