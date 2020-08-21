import {useContext} from 'react';

export default function useMemberships(membershipID) {
  const datasource = useContext();
  let participants = {...datasource.membershipsAdapter[membershipID]};

  if (!(membershipID in datasource.membershipsAdapter)) {
    participants = [];
  }

  return participants;
}
