import {concat, Observable, defer} from 'rxjs';
import {map, concatMap, distinctUntilChanged} from 'rxjs/operators';
import MeetingControl from './MeetingControl';

/**
 * Display options of a meeting control.
 *
 * @external MeetingControlDisplay
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MeetingsAdapter.js#L58}
 */

export default class SwitchCameraControl extends MeetingControl {
  /**
   * Switches the camera control.
   *
   * @param {string} meetingID  Id of the meeting for which to switch camera
   * @param {string} cameraID  Id of the camera device to switch to
   */
  async action(meetingID, cameraID) {
    await this.adapter.switchCamera(meetingID, cameraID);
  }

  /**
   * Returns an observable that emits the display data of the switch camera control.
   *
   * @param {string} meetingID  Id of the meeting to switch camera
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data
   */
  display(meetingID) {
    const availableCameras$ = defer(() => this.adapter.getAvailableDevices('videoinput'));

    const initialControl$ = new Observable((observer) => {
      const meeting = this.adapter.fetchMeeting(meetingID);

      if (meeting) {
        observer.next({
          ID: this.ID,
          tooltip: 'Video Devices',
          options: null,
          selected: null,
        });
        observer.complete();
      } else {
        observer.error(new Error(`Could not find meeting with ID "${meetingID}" to add a switch camera control`));
      }
    });

    const controlWithOptions$ = initialControl$.pipe(
      concatMap((control) => availableCameras$.pipe(
        map((availableCameras) => ({
          ...control,
          options: (availableCameras || []) && availableCameras.map((camera) => ({
            value: camera.deviceId,
            label: camera.label,
            camera,
          })),
        })),
      )),
    );

    const controlFromMeeting$ = controlWithOptions$.pipe(
      concatMap((control) => this.adapter.getMeeting(meetingID).pipe(
        map((meeting) => meeting.cameraID),
        distinctUntilChanged('cameraID'),
        map((cameraID) => ({
          ...control,
          selected: cameraID,
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
