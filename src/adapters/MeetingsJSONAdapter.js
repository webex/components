import {from, Observable} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {MeetingsAdapter} from '@webex/component-adapter-interfaces';
/**
 * @typedef MeetingsJSON
 * @param {object} datasource An object that contains a set of meetings keyed by ID.
 * @example
 * {
 *  "meeting-1": {
 *     "ID": "meeting-1",
 *     "title": "Meeting Title",
 *     "startTime": "2019-08-20T21:00:00.000Z",
 *     "endTime": "2019-08-20T22:00:00.000Z",
 *     "localVideo": {},
 *     "remoteVideo": {},
 *     "localAudio": {},
 *     "remoteAudio": {},
 *     "localShare": {},
 *     "remoteShare": {}
 *  }
 * }
 */

/**
 * Implements the MeetingsAdapter interface with a JSON object as its datasource. See @MeetingsJSON
 */
export default class MeetingsJSONAdapter extends MeetingsAdapter {
  /**
   * Returns a MediaStream object obtained from local user media.
   * @returns {MediaStream}
   */
  async getLocalVideo() {
    const constraints = {
      video: true,
      audio: false,
    };
    let stream;

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (reason) {
      // eslint-disable-next-line no-console
      console.error('Meetings JSON adapter can not display the user local stream', reason);
    }

    return stream;
  }

  /**
   * Returns an observable that emits a Meeting object.
   * Whenever there is an update to the meeting, the observable
   * will emit a new updated Meeting object, if datasource permits.
   *
   * @param {string} ID  ID of the meeting to get.
   * @returns {Observable.<Meeting>}
   * @memberof MeetingsJSONAdapter
   */
  getMeeting(ID) {
    const getMeeting$ = Observable.create((observer) => {
      if (this.datasource[ID]) {
        observer.next(this.datasource[ID]);
      } else {
        observer.error(new Error(`Could not find meeting with ID "${ID}"`));
      }

      observer.complete();
    });

    return getMeeting$.pipe(
      flatMap((meeting) =>
        // Attach the localMedia stream if meeting localVideo
        // property is not `null`. Since we can not attach the
        // MediaStream object in out JSON module, the work needs
        // to be done here.
        from(this.getLocalVideo()).pipe(map((localVideo) => (meeting.localVideo ? {...meeting, localVideo} : meeting)))
      )
    );
  }
}
