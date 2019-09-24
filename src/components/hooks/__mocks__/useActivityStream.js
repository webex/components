import {useContext} from 'react';

export default function useActivityStream(ID) {
  const datasource = useContext();
  let data = [];

  if (`${ID}-activities` in datasource.roomsAdapter) {
    data = datasource.roomsAdapter[`${ID}-activities`];
  }

  return [data, () => {}];
}
