import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../../helpers';

import InputDate from '../InputDate/InputDate';
import InputNumber from '../InputNumber/InputNumber';
import InputText from '../InputText/InputText';
import InputTime from '../InputTime/InputTime';
import InputToggle from '../InputToggle/InputToggle';
import TextBlock from '../TextBlock/TextBlock';

const componentTypes = {
  'Input.Date': InputDate,
  'Input.Number': InputNumber,
  'Input.Text': InputText,
  'Input.Time': InputTime,
  'Input.Toggle': InputToggle,
  TextBlock,
};

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
