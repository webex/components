import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';

const componentTypes = {};
const containerTypes = {};

export const acPropTypes = {
  children: 'children',
  containerStyle: 'container-style',
  defaultImageSize: 'default-image-size',
  fontType: 'font-type',
  horizontalAlignment: 'horizontal-alignment',
  id: 'id',
  imageSize: 'image-size',
  imageStyle: 'image-style',
  isVisible: 'is-visible',
  rtl: 'rtl',
  separator: 'separator',
  size: 'size',
  spacing: 'spacing',
  text: 'text',
  type: 'type',
  weight: 'weight',
  wrap: 'wrap',
};

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
 * @returns {object} JSX of the component
 */
export default function Component({data}) {
  const C = componentTypes[data.type] || UnknownComponent;
  const classes = [];
  const getClass = (propType, value) => `wxc-ac-${propType}--${value}`;

  for (const [prop, value] of Object.entries(data)) {
    const propType = (C.acPropTypes && C.acPropTypes[prop]) || undefined;

    switch (propType) {
      case undefined:
        console.log('Unknown property', prop);
        break;
      case acPropTypes.action:
      case acPropTypes.children:
      case acPropTypes.defaultImageSize:
      case acPropTypes.id:
      case acPropTypes.text:
      case acPropTypes.type:
        break;
      default:
        classes.push(getClass(propType, value));
        break;
    }
  }

  const containerType = containerTypes[data.type];

  if (containerType) {
    classes.push(getClass('container', containerType));
  }

  return (
    <C
      data={data}
      className={classes.join(' ')}
    />
  );
}

Component.propTypes = {
  data: PropTypes.shape().isRequired,
};
