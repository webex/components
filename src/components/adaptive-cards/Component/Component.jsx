import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';

const componentTypes = {};
const containerTypes = {};

export const acPropTypes = {
  bleed: 'bleed',
  children: 'children',
  color: 'color',
  containerStyle: 'container-style',
  defaultImageSize: 'default-image-size',
  fontType: 'font-type',
  height: 'height',
  horizontalAlignment: 'horizontal-alignment',
  id: 'id',
  imageSize: 'image-size',
  imageStyle: 'image-style',
  isSubtle: 'is-subtle',
  isVisible: 'is-visible',
  minHeight: 'min-height',
  rtl: 'rtl',
  separator: 'separator',
  size: 'size',
  spacing: 'spacing',
  text: 'text',
  type: 'type',
  verticalContentAlignment: 'vertical-content-alignment',
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
  const style = {};

  const dataWithDefaults = {...C.acDefaultProps, ...data};

  for (const [prop, value] of Object.entries(dataWithDefaults)) {
    const propType = (C.acPropTypes && C.acPropTypes[prop]) || undefined;

    switch (propType) {
      case undefined:
        console.log('[Component]', 'Unknown property', prop);
        break;
      case acPropTypes.action:
      case acPropTypes.children:
      case acPropTypes.defaultImageSize:
      case acPropTypes.id:
      case acPropTypes.text:
      case acPropTypes.type:
        break;
      case acPropTypes.containerStyle:
        classes.push(getClass(propType, value));
        if (value && value !== 'default') {
          classes.push(getClass('container', 'has-padding'));
        }
        break;
      case acPropTypes.height:
        if (value === 'auto' || value === 'stretch') {
          classes.push(getClass(propType, value));
        } else {
          style.height = data.height;
        }
        break;
      case acPropTypes.minHeight:
        style.minHeight = data.minHeight;
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
      style={style}
    />
  );
}

Component.propTypes = {
  data: PropTypes.shape().isRequired,
};
