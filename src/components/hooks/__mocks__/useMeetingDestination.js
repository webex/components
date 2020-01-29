import {useContext} from 'react';

export default function useMeetingDestination(meetingDestination) {
  const datasource = useContext();

  return meetingDestination ? datasource.meetingsAdapter[meetingDestination] : {};
}
