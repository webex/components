import {MeetingsAdapter} from '@webex/component-adapter-interfaces';
import {Observable} from 'rxjs';

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

/*
 * Implements the MeetingsAdapter interface with a JSON object as its datasource. See @MeetingsJSON
 */
export default class MeetingsJSONAdapter extends MeetingsAdapter {
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
    return Observable.create((observer) => {
      if (this.datasource[ID]) {
        observer.next(this.datasource[ID]);
      } else {
        observer.error(new Error(`Could not find meeting with ID "${ID}"`));
      }

      observer.complete();
    });
  }
}
