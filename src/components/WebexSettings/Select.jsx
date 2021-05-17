import React from 'react';
import PropTypes from 'prop-types';
import webexComponentClasses from '../helpers';

/**
 * @typedef {object} Option
 * @property {string} value  The value of the option
 * @property {string} label  The label of the option
 */

/**
 * Select component
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {object[]} props.options  Array of options
 * @param {string} props.type  Name of the control as defined in adapter
 * @param {object} props.style  Custom style to apply
 * @returns {object}  JSX of the element
 */
export default function Select({
  className,
  options,
  style,
  ...props
}) {
  const cssClasses = webexComponentClasses('select', className);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <select className={cssClasses} {...props} style={style}>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}

Select.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
  style: PropTypes.shape(),
};

Select.defaultProps = {
  className: '',
  options: [],
  style: undefined,
};
