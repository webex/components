import React from 'react';
import PropTypes from 'prop-types';

const componentTypes = {};

/**
 * UnknownComponent
 *
 * @param {object} props  Data passed to the component
 * @param {object} props.data  Data passed to the component
 * @returns {object} JSX of the component
 */
function UnknownComponent({data}) {
  return (
    <div>
      <h5>{`${data.type} Component`}</h5>
      <pre>{JSON.stringify(data, null, 4)}</pre>
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
 * @param {object} props  Data passed to the component
 * @param {object} props.data  Data passed to the component
 * @returns {object} JSX of the component
 */
export default function Component({data}) {
  const C = componentTypes[data.type] || UnknownComponent;

  return <C data={data} />;
}

Component.propTypes = {
  data: PropTypes.shape(),
};

Component.defaultProps = {
  data: undefined,
};
