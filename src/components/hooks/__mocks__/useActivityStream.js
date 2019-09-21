import {useContext} from 'react';

export default function useActivityStream(ID) {
  const datasource = useContext();

  return `${ID}-activities` in datasource.roomsAdapter ? datasource.roomsAdapter[`${ID}-activities`] : [];
}
