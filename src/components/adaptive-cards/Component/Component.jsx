import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';

const componentTypes = {};
const containerTypes = {};

/**
 * Registers a component
 *
 * @param {string} type  Type of the component eg. Input.Text
 * @param {Function} component  The component that needs to be registered
 * @param {'horizontal'|'vertical'} [containerType]  Specifies the container type
 */
export function registerComponent(type, component, containerType) {
  componentTypes[type] = component;
  containerTypes[type] = containerType;
}

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
 * @param {string} [props.type]  Active Cards type definition
 * @param {object} props.parentData  Parent Card definition
 * @returns {object} JSX of the component
 */
export default function Component({data, type, parentData}) {
  const [cssClasses, sc] = webexComponentClasses('adaptive-cards-component');
  const classes = [];
  const getClass = (key, value) => sc(`${key}--${value}`);
  const {
    separator,
    spacing,
    isVisible,
    ...compData
  } = data;

  for (const [key, value] of Object.entries(data)) {
    switch (key) {
      case 'separator':
      case 'spacing':
      case 'isVisible':
        classes.push(getClass(key, value));
        break;
      default:
        break;
    }
  }

  const containerType = containerTypes[data.type];

  if (containerType) {
    classes.push(getClass('container', containerType));
  }

  const C = componentTypes[data.type || type] || UnknownComponent;

  return (
    <C
      data={compData}
      className={`${cssClasses} ${classes.join(' ')}`}
      parentData={parentData}
    />
  );
}

Component.propTypes = {
  data: PropTypes.shape().isRequired,
  type: PropTypes.string,
  parentData: PropTypes.shape(),
};

Component.defaultProps = {
  type: undefined,
  parentData: {},
};
