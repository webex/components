import {useContext} from 'react';

export default function useMeeting(meetingID, meetingDestination) {
  const datasource = useContext();
  let result = {};

  if (meetingID in datasource.meetingsAdapter) {
    result = datasource.meetingsAdapter[meetingID];
  } else if (meetingDestination) {
    result = datasource.meetingsAdapter[meetingDestination];
  }

  return result;
}
