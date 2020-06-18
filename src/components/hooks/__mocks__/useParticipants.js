import {useContext} from 'react';

export default function useParticipants(membershipID) {
  const datasource = useContext();
  let participants = {...datasource.membershipsAdapter[membershipID]};

  if (!(membershipID in datasource.membershipsAdapter)) {
    participants = [];
  }

  return participants;
}
