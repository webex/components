import {useContext} from 'react';

export default function useMemberships(membershipID) {
  const datasource = useContext();
  let members = {...datasource.membershipsAdapter[membershipID]};

  if (!(membershipID in datasource.membershipsAdapter)) {
    members = [];
  }

  return members;
}
