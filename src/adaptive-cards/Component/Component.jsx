import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../components/helpers';

const componentTypes = {};

/**
 * UnknownComponent
 *
 * @param {object} props  React properties
 * @param {object} props.data  Active Cards definition
 * @returns {object} JSX of the component
 */
function UnknownComponent({data}) {
  const [cssClasses] = webexComponentClasses('adaptive-cards-unknown-component');

  return (
    <div>
      <h5>{`${data.type} Component`}</h5>
      <pre className={cssClasses}>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}
UnknownComponent.propTypes = {
  data: PropTypes.shape(),
};

UnknownComponent.defaultProps = {
  data: undefined,
};

/**
 * Component generic component
 *
 * @param {object} props  React properties
 * @param {object} props.data  Active Cards definition
 * @returns {object} JSX of the component
 */
export default function Component({data}) {
  const C = componentTypes[data.type] || UnknownComponent;

  return <C data={data} />;
}

Component.propTypes = {
  data: PropTypes.shape().isRequired,
};
