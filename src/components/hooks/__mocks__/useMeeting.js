import {useContext} from 'react';

export default function useMeeting(meetingID) {
  const datasource = useContext();

  return meetingID ? datasource.meetingsAdapter[meetingID] : {};
}
