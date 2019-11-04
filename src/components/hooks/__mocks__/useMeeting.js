import {useContext} from 'react';

export default function useMeeting(meetingID) {
  const datasource = useContext();

  if (!(meetingID in datasource.meetingsAdapter)) {
    throw new Error(`Could not find meeting with ID "${meetingID}"`);
  }

  return datasource.meetingsAdapter[meetingID];
}
