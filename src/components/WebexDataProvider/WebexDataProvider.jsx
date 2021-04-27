/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import {AdapterContext} from '../hooks';

/**
 * Provides an adapter context to the wrapped component.
 *
 * @param {object} props  Data passed to the provider
 * @param {object} props.adapter  Adapter for context
 * @param {React.Component} props.children  Component children to wrap
 * @returns {React.Component} Component with access to the adapter context
 */
export default function WebexDataProvider({adapter, children}) {
  return <AdapterContext.Provider value={adapter}>{children}</AdapterContext.Provider>;
}

WebexDataProvider.propTypes = {
  adapter: PropTypes.shape({
    activitiesAdapter: PropTypes.object.isRequired,
    meetingsAdapter: PropTypes.object.isRequired,
    membershipsAdapter: PropTypes.object.isRequired,
    peopleAdapter: PropTypes.object.isRequired,
    roomsAdapter: PropTypes.object.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};
