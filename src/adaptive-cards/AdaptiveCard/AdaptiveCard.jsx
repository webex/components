import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../components/helpers';

import Component from '../Component/Component';

/**
 * AdaptiveCard component
 *
 * @param {object} props  React properties
 * @param {object} props.data  Active Cards definition
 * @returns {object} JSX of the component
 */
export default function AdaptiveCard({data}) {
  const [cssClasses] = webexComponentClasses('adaptive-card');

  return (
    <div className={cssClasses}>
      {data.body.map((item) => <Component data={item} />)}
    </div>
  );
}

AdaptiveCard.propTypes = {
  data: PropTypes.shape().isRequired,
};
