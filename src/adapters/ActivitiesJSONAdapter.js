import {ActivitiesAdapter} from '@webex/component-adapter-interfaces';
import {Observable} from 'rxjs';

const EMPTY_ACTION = {
  actionID: null,
  personID: null,
  roomID: null,
  type: 'submit',
  activityID: null,
  inputs: null,
  created: null,
};

// TODO: Figure out how to import JS Doc definitions and remove duplication.
/**
 * An activity a person performs in Webex.
 *
 * @external Activity
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/ActivitiesAdapter.js#L6}
 */

/**
 * @typedef ActivitiesJSON
 * @param {object} datasource An object that contains activities keyed by ID
 * @example
 * {
 *   "activity-1": {
 *     "ID": "activity-1",
 *     "roomID": "roomID",
 *     "text": "Hey Barbara, how is it going?",
 *     "personID": "user-2",
 *     "created": "created",
 *     "displayAuthor": false
 *   },
 *   "activity-2": {
 *     "ID": "activity-2",
 *     "roomID": "roomID",
 *     "text": "Oh no! That's terrible 😔",
 *     "personID": "user-2",
 *     "created": "created",
 *     "displayAuthor": true
 *   }
 * }
 */

/**
 * `ActivitiesJSONAdapter` is an implementation of the `ActivitiesAdapter` interface.
 * This implementation utilizes a JSON object as its source of activity data.
 *
 * @see {@link ActivitiesJSON}
 * @implements {ActivitiesAdapter}
 */
export default class ActivitiesJSONAdapter extends ActivitiesAdapter {
  /**
   * Returns an observable that emits activity data of the given ID.
   * For this implementation, once the data is emitted, the observable completes.
   *
   * @param {string} ID ID of activity to get
   * @returns {Observable.<Activity>} Observable that emits data of the given ID
   */
  getActivity(ID) {
    return Observable.create((observer) => {
      const activity = this.datasource[ID];

      if (activity) {
        const card = activity.attachments && activity.attachments[0] && activity.attachments[0].contentType === 'application/vnd.microsoft.card.adaptive' ? activity.attachments[0].content : undefined;

        observer.next({
          ...this.datasource[ID],
          card,
        });
      } else {
        observer.error(new Error(`Could not find activity with ID "${ID}"`));
      }

      observer.complete();
    });
  }

  /**
   * Posts an attachment action, returns an observable that emits the created action
   *
   * @param {string} activityID  ID of the activity corresponding to this submit action
   * @param {object} inputs  The message content
   * @returns {Observable.<object>} Observable stream that emits data of the newly created action
   */
  postAction(activityID, inputs) {
    return Observable.create((observer) => {
      const activity = this.datasource[activityID];

      if (activity) {
        const actionID = `action-${activityID}-${activity?.actions.length + 1}`;
        const personID = 'user1';
        const newAction = {
          ...EMPTY_ACTION,
          actionID,
          personID,
          roomID: activity.roomID,
          activityID,
          inputs,
          created: new Date().toISOString(),
        };
        const activityActions = this.datasource[activityID].actions;

        activityActions.push(newAction);

        observer.next(newAction);
        observer.complete();
      } else {
        observer.error(new Error(`Unable to create an attachment action for activity with id "${activityID}"`));
      }
    });
  }
}
