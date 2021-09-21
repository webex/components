import React from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';

/**
 * Provides a first-class way to render children into a DOM node that exist
 * outside the DOM hierarchy of the parent component
 *
 * @param {object} props  Data passed to the component
 * @param {React.ReactNode[]} props.children  List of children
 * @returns {object}  JSX of the element
 */
const Portal = ({children}) => {
  const mount = document.querySelector('body');

  return createPortal(children, mount);
};

Portal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Portal;
