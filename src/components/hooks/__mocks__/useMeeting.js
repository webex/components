import {useContext} from 'react';

export default function useMeeting(meetingID, meetingDestination) {
  const datasource = useContext();
  let result = {};

  if (meetingDestination) {
    result = datasource.meetingsAdapter.localMedia;
  } else if (meetingID in datasource.meetingsAdapter) {
    result = datasource.meetingsAdapter[meetingID];
  }

  return result;
}
