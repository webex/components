import {useContext} from 'react';

export default function useMe() {
  const datasource = useContext();

  return {...datasource.peopleAdapter.default};
}
