import {useEffect, useContext, useState} from 'react';

import {AdapterContext} from './contexts';

/**
 * A set of people in Webex.
 *
 * @external Organization
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/OrganizationsAdapter.js#L20}
 */

/**
 * Returns an observable that emits organization data of the given ID.
 *
 * @param {string} ID ID of organization to get
 * @returns {Organization} Data of the person
 */
export default function useOrganization(ID) {
  const [organization, setOrganization] = useState({});
  const {organizationsAdapter} = useContext(AdapterContext);

  useEffect(() => {
    let cleanup;

    if (!ID) {
      cleanup = undefined;
    } else {
      const onError = (error) => {
        // eslint-disable-next-line no-console
        console.error(error.message);
      };
      const onOrganization = (newOrganization) => {
        setOrganization({...newOrganization});
      };
      const subscription = organizationsAdapter.getOrg(ID)
        .subscribe(onOrganization, onError);

      cleanup = () => {
        subscription.unsubscribe();
      };
    }

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ID]);

  return organization;
}
