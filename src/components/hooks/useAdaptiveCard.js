import {useEffect, useContext, useState} from 'react';

import {AdapterContext} from './contexts';

/**
 * An activity a person performs in Webex.
 *
 * @external Activity
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/ActivitiesAdapter.js#L6}
 */

/**
 * Custom hook that returns an adaptive card, given an activity id
 *
 * @param {string} activityID  ID of the activity containing the card
 * @returns {Array.<object, Function>}  The activity card definition and submit data function that returns an observable
 */
export default function useAdaptiveCard(activityID) {
  const [card, setCard] = useState({});
  const {activitiesAdapter} = useContext(AdapterContext);

  useEffect(() => {
    let cleanup;

    if (!activitiesAdapter || !activityID) {
      setCard({});
      cleanup = undefined;
    } else {
      const subscription = activitiesAdapter.getActivity(activityID)
        .subscribe((activity) => setCard(activity.card));

      cleanup = () => subscription.unsubscribe();
    }

    return cleanup;
  }, [activitiesAdapter, activityID]);

  return [card, (inputs) => activitiesAdapter.postAction(activityID, inputs)];
}