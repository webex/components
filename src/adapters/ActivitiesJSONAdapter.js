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
      if (this.datasource[ID]) {
        observer.next(this.datasource[ID]);
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
    return new Observable((observer) => {
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

  /**
   * Posts an activity and returns an observable to the new activity data
   *
   * @param {object} activity  The activity to post
   * @returns {Observable.<Activity>} Observable that emits the posted activity (including id)
   */
  postActivity(activity) {
    const activity$ = new Observable((observer) => {
      const activities = this.datasource;

      if (activity.roomID) {
        const ID = `activity${Object.keys(activities).length + 1}`;
        const newActivity = {
          attachments: [],
          actions: [],
          ...activity,
          ID,
          personID: 'user1',
          created: new Date().toISOString(),
        };

        activities[ID] = newActivity;

        observer.next(newActivity);
        observer.complete();
      } else {
        observer.error(new Error(`Unable to post an activity in room with id ${activity.roomID}`));
      }
    });

    return activity$;
  }

  /**
   * A function that checks whether or not an Activity object contains a card attachment.
   *
   * @param {Activity} activity  Activity object
   * @returns {boolean} True if received Activity object contains a card attachment
   */
  // eslint-disable-next-line class-methods-use-this
  hasAdaptiveCard(activity) {
    return !!(activity.attachments && activity.attachments[0] && activity.attachments[0].contentType === 'application/vnd.microsoft.card.adaptive');
  }

  /**
   * A function that returns adaptive card data of an Activity object.
   *
   * @param {Activity} activity  Activity object
   * @returns {object|undefined} Adaptive card data object
   */
  // eslint-disable-next-line class-methods-use-this
  getAdaptiveCard(activity) {
    const hasCard = this.hasAdaptiveCard(activity);

    return hasCard ? activity.attachments[0].content : undefined;
  }

  /**
   * A function that attaches an adaptive card to an Activity object.
   *
   * @param {Activity} activity  The activity to post
   * @param {object} card  The card attachment
   */
  // eslint-disable-next-line class-methods-use-this
  attachAdaptiveCard(activity, card) {
    const mutableActivity = activity;

    mutableActivity.attachments = [{
      contenType: 'application/vnd.microsoft.card.adaptive',
      content: card,
    }];
  }
}
