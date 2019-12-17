import React from 'react';
import PropTypes from 'prop-types';

export const AdapterContext = React.createContext();

export default function WebexDataProvider({adapter, children}) {
  return <AdapterContext.Provider value={adapter}>{children}</AdapterContext.Provider>;
}

WebexDataProvider.propTypes = {
  adapter: PropTypes.shape({
    activitiesAdapter: PropTypes.object.isRequired,
    meetingsAdapter: PropTypes.object.isRequired,
    peopleAdapter: PropTypes.object.isRequired,
    roomsAdapter: PropTypes.object.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};
