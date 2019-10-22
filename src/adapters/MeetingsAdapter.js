/* eslint-disable no-unused-vars */
import {throwError} from 'rxjs';

import WebexAdapter from './WebexAdapter';

/**
 * This is a base class that defines the interface that maps meetings data.
 * Developers that want to extend `MeetingsAdapter` must implement all of its methods,
 * adhering to the exact parameters and structure of the returned objects.
 */

/**
 * A meeting object that allows users to have a WebRTC meeting.
 *
 * @typedef {Object} Meeting
 * @property {string}  ID The meeting identifier.
 * @property {string}  meetingTitle The title of the meeting.
 * @property {Date}    meetingTimeStart The time and date of the start of the meeting.
 * @property {Date}    meetingTimeEnd The time and date of the end of the meeting.
 * @property {Boolean} localAudioMuted If the local user has muted their audio.
 * @property {Boolean} localVideoMuted If the local user has muted their video.
 * @property {Boolean} meetingJoined If the local user has joined the meeting.
 */

export default class MeetingsAdapter extends WebexAdapter {
  /**
   * Returns an observable that emits meeting data of the given ID.
   *
   * @param {string} ID  ID of the meeting to get.
   * @returns {Observable.<Meeting>}
   * @memberof MeetingsAdapter
   */
  getMeeting(ID) {
    return throwError(new Error('getMeeting(ID) must be defined in MeetingsAdapter'));
  }

  /**
   * Returns a promise that resolved with the meeting ID that matches
   * the requested parameters.
   *
   * @param {string} destinationID
   * @param {string} destinationType
   * @returns {Observable.<string>} Returns an observable of the meeting ID.
   * @memberof MeetingsAdapter
   */
  getMeetingID(destinationID, destinationType) {
    return throwError(new Error('getMeetingID(destinationID, destinationType) must be defined in MeetingsAdapter'));
  }

  /**
   * Sets the local audio muted state of a particular meetingID.
   * Returns a promise that is resolved when the set completes.
   * Also emits an update to the getMeeting observable with the state update to `localAudioMuted`.
   *
   * @param {Boolean} audioMuted
   * @param {string} meetingID
   * @returns {Observable}
   * @memberof MeetingsAdapter
   */
  setLocalAudioMuted(audioMuted, meetingID) {
    return throwError(new Error('setLocalAudioMuted(audioMuted, meetingID) must be defined in MeetingsAdapter'));
  }

  /**
   * Sets the local video muted state of a particular meetingID.
   * Returns a promise that is resolved when the set completes.
   * Also emits an update to the getMeeting observable with the state update to `localVideoMuted`.
   *
   * @param {Boolean} videoMuted
   * @param {string} meetingID
   * @returns {Observable}
   * @memberof MeetingsAdapter
   */
  setLocalVideoMuted(videoMuted, meetingID) {
    return throwError(new Error('setLocalAudioMuted(videoMuted, meetingID) must be defined in MeetingsAdapter'));
  }

  /**
   * Joins a meeting with the local user.
   * Returns a promise that is resolved when the set completes.
   * Also emits an update to the getMeeting observable with the state update to `meetingJoined`.
   *
   * @param {string} meetingID
   * @returns {Observable}
   * @memberof MeetingsAdapter
   */
  joinMeeting(meetingID) {
    return throwError(new Error('joinMeeting(meetingID) must be defined in MeetingsAdapter'));
  }
}
